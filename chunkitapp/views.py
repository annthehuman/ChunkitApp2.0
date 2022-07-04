from django.shortcuts import render, redirect
from django.http import HttpResponse, response
from .models import background, feedback, test, sessions, experiment_links
from .models import sentence as s
from .models import draft_data
from .forms import backgroundForm, feedbackForm, sentenceForm, draftDataForm
import random
from django.contrib.sessions.models import Session
import os
import datetime
import json
from django.conf import settings
import patoolib
import ast
from django.views.decorators.csrf import csrf_exempt
import pandas as pd
# from .serializers import *
import shutil
import pandas as pd
from rest_framework.views import APIView
import requests

from Levenshtein import distance


class UserActivationView(APIView):
    def get(self, request, uid, token):
        print('get')
        protocol = 'https://' if request.is_secure() else 'http://'
        web_url = protocol + request.get_host()
        post_url = web_url + "/auth/users/activation/"
        post_data = {'uid': uid, 'token': token}
        result = requests.post(post_url, data=post_data)
        content = result.text
        return redirect('authorized')


def unpackArchive(experement_name):
    """
    Unpack audios archive for practice or experiment
    """
    name_set = list(draft_data.objects.all().values_list(
                            'nameExperementForParticipants', flat=True))
    names_dict = dict(zip(name_set, list(range(len(name_set)))))
    # print(names_dict)
    model_columns = [f.name for f in draft_data._meta.get_fields()]
    row_number = names_dict[experement_name]
    draft_data_values = {}

    for col_name in model_columns:
        col_data = list(draft_data.objects.all().values_list(col_name,
                                                             flat=True))
        # print(col_data[row_number])
        draft_data_values[col_name] = col_data[row_number]

    transcripts_file_practice = []
    transcripts_file_experement = []

    if draft_data_values.get('uploadPracticeTranscripts'):
        path_to_transcripts_file_practice = settings.MEDIA_ROOT + '/' + \
                    draft_data_values.get('uploadPracticeTranscripts')
        df = pd.read_excel(path_to_transcripts_file_practice,
                           converters={'Audio name': str, 'Transcript': str,
                                       'Question': str, 'Answer1': str,
                                       'Answer2': str}).fillna(0)
        for row in range(df.shape[0]):
            table_row = []
            for col in range(df.shape[1]):
                table_row.append(df.iat[row, col])
            transcripts_file_practice.append(table_row)

    if draft_data_values.get('uploadExperementTranscripts'):
        path_to_transcripts_file_experement = settings.MEDIA_ROOT + '/' + \
                    draft_data_values.get('uploadExperementTranscripts')
        df = pd.read_excel(path_to_transcripts_file_experement, 
                           converters={'Audio name': str, 'Transcript': str,
                                       'Question': str, 'Answer1': str,
                                       'Answer2': str}).fillna(0)
        for row in range(df.shape[0]):
            table_row = []
            for col in range(df.shape[1]):
                table_row.append(df.iat[row, col])
            transcripts_file_experement.append(table_row)

    onlyfilesPractice = []
    onlyfilesExperement = []
    if draft_data_values['uploadPracticeAudio']:
        path_to_zip_file = os.path.join(settings.MEDIA_ROOT,
                                        draft_data_values.get(
                                            'uploadPracticeAudio'))
        directory_to_extract_to = os.path.join(settings.MEDIA_ROOT,
                                               'Practice',
                                               experement_name)

        if list(os.walk(directory_to_extract_to)):
            shutil.rmtree(directory_to_extract_to)

        if not os.path.exists(directory_to_extract_to):
            os.makedirs(directory_to_extract_to)

        patoolib.extract_archive(path_to_zip_file,
                                 outdir=directory_to_extract_to)
        test = os.walk(directory_to_extract_to)
        _, dirs, _ = next(test)
        if dirs:
            print('folder', dirs)
            for dir in dirs:
                if dir != '__MACOSX':
                    p = os.walk(directory_to_extract_to+dir)
                    _, _, fi = next(test)
                    for file in fi:
                        shutil.copy(os.path.join(directory_to_extract_to,
                                                 dir, file),
                                    os.path.join(directory_to_extract_to,
                                                 file))

        onlyfilesPractice = [os.path.join(experement_name, f) for f
                             in os.listdir(directory_to_extract_to) if
                             os.path.isfile(
                                 os.path.join(directory_to_extract_to, f))]

    if draft_data_values.get('uploadExperementAudio'):
        path_to_zip_file = os.path.join(settings.MEDIA_ROOT,
                                        draft_data_values.get(
                                            'uploadExperementAudio'))
        directory_to_extract_to = os.path.join(settings.MEDIA_ROOT,
                                               'Experement', experement_name)
        if list(os.walk(directory_to_extract_to)):
            shutil.rmtree(directory_to_extract_to)

        if not os.path.exists(directory_to_extract_to):
            os.makedirs(directory_to_extract_to)

        patoolib.extract_archive(path_to_zip_file, outdir = directory_to_extract_to)
        test = os.walk(directory_to_extract_to)
        _, dirs, _ = next(test)
        if dirs:    
            print('folder', dirs)
            for dir in dirs:
                if dir != '__MACOSX':
                    p = os.walk(directory_to_extract_to+dir)
                    pa, di, fi = next(test)
                    for file in fi:
                        print(file)
                        shutil.copy(os.path.join(directory_to_extract_to,dir,file), os.path.join(directory_to_extract_to,file))

        onlyfilesExperement = [os.path.join(experement_name, f) for f in os.listdir(directory_to_extract_to) if os.path.isfile(os.path.join(directory_to_extract_to, f))]
    
    draft_data.objects.filter(nameExperementForParticipants=experement_name).delete()
    print('draft_data_values.get("uploadExperementTranscripts",0)', draft_data_values.get("uploadExperementTranscripts",0))
    draft_data.objects.create(
        accessToken = draft_data_values.get("accessToken",0),
        nameExperement = draft_data_values.get("nameExperement",0),
        shuffleExtracts =  draft_data_values.get("shuffleExtracts",0),
        shuffleExtractsPractice =  draft_data_values.get("shuffleExtractsPractice",0),
        nameExperementForParticipants  = draft_data_values.get("nameExperementForParticipants",0),
        ImitationTask  = draft_data_values.get("ImitationTask",0),
        UseQuestions  = draft_data_values.get("UseQuestions",0),
        UseProlific  = draft_data_values.get("UseProlific",0),
        linkToProlific  = draft_data_values.get("linkToProlific",0),
        helloEditor  = draft_data_values.get("helloEditor",0),
        consentEditor  = draft_data_values.get("consentEditor",0),
        outlineEditor  = draft_data_values.get("outlineEditor",0),
        backgroundExample  = draft_data_values.get("backgroundExample",0),
        backgroundAddQ  = draft_data_values.get("backgroundAddQ",0),
        feedbackExample  = draft_data_values.get("feedbackExample",0),
        feedbackAddQ  = draft_data_values.get("feedbackAddQ",0),
        goodbyeEditor  = draft_data_values.get("goodbyeEditor",0),
        uploadPracticeAudio  = draft_data_values.get("uploadPracticeAudio",0),
        uploadPracticeTranscripts  = draft_data_values.get("uploadPracticeTranscripts",0),
        uploadExperementAudio  = draft_data_values.get("uploadExperementAudio",0),
        uploadExperementTranscripts  = draft_data_values.get("uploadExperementTranscripts",0),
        experimentInstructions  = draft_data_values.get("experimentInstructions",0),
        practiceInstructions  = draft_data_values.get("practiceInstructions",0),
        pagesNeeded = draft_data_values.get("pagesNeeded",0),
        uploadPracticeTranscriptsData = transcripts_file_practice,
        uploadExperimentTranscriptsData = transcripts_file_experement,
        audiosPractice  = onlyfilesPractice,
        audiosExperement  = onlyfilesExperement
        )

def save_draft(request):
    print('request.FILES',request.FILES)
    form = draftDataForm(request.POST, request.FILES)
    if request.method == 'POST':
        
        # print('req',request.FILES)
        # print('access_token', request.POST.get('accessToken'))
        pagesNeeded = ''
        if (request.POST.get('pagesNeeded')):
            pagesNeeded = request.POST.get('pagesNeeded').split(',')
            # print('pagesNeeded', pagesNeeded)
        background = dict(filter(lambda x: 'useBackground' in x[0],dict(request.POST).items()))
        background_addQ = dict(filter(lambda x: 'BackgroundNew' in x[0] and not 'useBackground' in x[0],dict(request.POST).items()))
        feedback = dict(filter(lambda x: 'useFeedback' in x[0],dict(request.POST).items()))
        feedback_addQ = dict(filter(lambda x: 'FeedbackNew' in x[0] and not 'useFeedback' in x[0],dict(request.POST).items()))
        experement_name = request.POST.get('nameExperementForParticipants').replace(' ', '_')

        name_set = list(draft_data.objects.all().values_list('nameExperementForParticipants', flat = True))
        names_dict = dict(zip(name_set, list(range(len(name_set)))))
        model_columns = ['uploadPracticeAudio', 'uploadPracticeTranscripts', 'uploadExperementAudio', 'uploadExperementTranscripts']
        row_number = names_dict.get(experement_name, '')
        links = list(filter(lambda x: request.POST.get('link', '') in x ,experiment_links.objects.all().values_list('experiment_link', flat = True)))
        # print('links in bd', links, request.POST.get('link', ''))
        if not links:
            if request.POST.get('link'):
                experiment_links.objects.create(
                    experiment_link = request.POST.get('link', ''),
                    accessToken = request.POST.get('accessToken', ''),
                    experiment_stopped = False
                )

        # print('back',feedback, feedback_addQ)
        if form.is_valid():
            # print('valid', form)
            form = form.save(commit=False)
            form.nameExperementForParticipants = experement_name
            form.backgroundExample = background
            form.feedbackExample = feedback
            form.backgroundAddQ = background_addQ
            form.feedbackAddQ = feedback_addQ
            # form.accessToken = request.POST.get('accessToken')
            # form.audiosPractice = onlyfilesPractice
            # form.audiosExperement = onlyfilesExperement
            # print('practice files not found audio',request.FILES.get('uploadPracticeAudio'), row_number, not request.FILES.get('uploadPracticeAudio') and row_number)
            # print('practice files not found transcripts',request.FILES.get('uploadPracticeTranscripts'), row_number, not request.FILES.get('uploadPracticeAudio') and row_number)
            # print('ex files not found audio',request.FILES.get('uploadExperimentAudio'))
            # print('ex files not found transcripts',request.FILES.get('uploadExperimentTranscripts'))
            if pagesNeeded:
                form.pagesNeeded = pagesNeeded
            if not request.FILES.get('uploadPracticeAudio') and row_number and row_number >= 0:
                # print('practice files not found', request.FILES.get('uploadPracticeAudio'))
                form.uploadPracticeAudio = list(draft_data.objects.all().values_list('uploadPracticeAudio', flat = True))[row_number]
            if not request.FILES.get('uploadPracticeTranscripts') and row_number and row_number >= 0:
                form.uploadPracticeTranscripts = list(draft_data.objects.all().values_list('uploadPracticeTranscripts', flat = True))[row_number]
            if not request.FILES.get('uploadExperimentAudio') and row_number and row_number >= 0:
                form.uploadExperementAudio = list(draft_data.objects.all().values_list('uploadExperementAudio', flat = True))[row_number]
            else:
                form.uploadExperementAudio = request.FILES.get('uploadExperimentAudio')
            if not request.FILES.get('uploadExperimentTranscripts') and row_number and row_number >= 0:
                form.uploadExperementTranscripts = list(draft_data.objects.all().values_list('uploadExperementTranscripts', flat = True))[row_number]
            else:
                form.uploadExperementTranscripts = request.FILES.get('uploadExperimentTranscripts')
            form.save()
            print('form', form.uploadExperementTranscripts)
            # text_from_user_list = list(draft_data.objects.all().values_list())
            # token = draft_data.objects.all().values_list('accessToken', flat = True)
            # ids = draft_data.objects.all().values_list('id', flat = True)
            # draft_data.objects.create(
            #         backgroundExample = background,
            #         feedbackExample = feedback,
            #         )
            # print(list(ex_data_model.objects.all().values_list()))
            # print('tokens',token, ids)
            # print('text_from_user_list', text_from_user_list)
        unpackArchive(experement_name)
        return HttpResponse('')


def drafts_list(request):
    print('draft list')
    if request.method == 'GET':

        print('GET',request.GET['access_token'])
        tokens = list(draft_data.objects.all().values_list('accessToken', flat = True))
        tokens_zip = list(zip(tokens, list(range(len(tokens)))))
        tokens_current = list(filter(lambda x: x[0] == request.GET['access_token'], tokens_zip))
        print(tokens_current)
        print('tokens', tokens)        
        link_tokens = list(experiment_links.objects.all().values_list('accessToken', flat = True))
        link_tokens_zip = list(zip(link_tokens, list(range(len(link_tokens)))))
        link_tokens_current = list(filter(lambda x: x[0] == request.GET['access_token'], link_tokens_zip))
        experiment_link = list(experiment_links.objects.all().values_list('experiment_link', flat = True))
        current_experiment_link = []
        for line in link_tokens_current:
            current_experiment_link.append(experiment_link[line[1]])
        # print(current_experiment_link)
        # name_set = dict()
        # name_set = list(draft_data.objects.all().values_list('nameExperement', flat = True))
        # names_dict = dict(zip(name_set, list(range(len(name_set)))))
        # print(names_dict)
        model_columns = [f.name for f in draft_data._meta.get_fields()]
        # row_number = names_dict[request.GET['name']]
        draft_data_list = []
        for line in tokens_current:
            draft_data_values = {}
            for col_name in model_columns:
                col_data = list(draft_data.objects.all().values_list(col_name, flat = True))
                # print(col_data[index])
                if col_name == 'backgroundExample':
                    draft_data_values[col_name] = ast.literal_eval(col_data[line[1]])
                else:
                    draft_data_values[col_name] = col_data[line[1]]

            draft_data_list.append(draft_data_values)
        draft_data_list.append({'links': current_experiment_link})
            # print(list(ex_data_model.objects.all().values_list()))
        print(draft_data_list)
        # name_set = ','.join(name_set)
            # print(list(ex_data_model.objects.all().values_list()))
        return HttpResponse(json.dumps(draft_data_list))

def load_draft(request):
    if request.method == 'GET':
        # print('GET',request.GET['name'])
        
        name_set = list(draft_data.objects.all().values_list('nameExperementForParticipants', flat = True))
        names_dict = dict(zip(name_set, list(range(len(name_set)))))
        # print(names_dict)
        model_columns = [f.name for f in draft_data._meta.get_fields()]
        row_number = names_dict[request.GET['name']]
        draft_data_values = {}
        for col_name in model_columns:
            col_data = list(draft_data.objects.all().values_list(col_name, flat = True))
            draft_data_values[col_name] = col_data[row_number]
        # print('uploadPracticeTranscriptsData',draft_data_values)
        draft_data_values['backgroundAddQ'] = ast.literal_eval(draft_data_values['backgroundAddQ'].replace('nan', '0'))
        draft_data_values['feedbackAddQ'] = ast.literal_eval(draft_data_values['feedbackAddQ'].replace('nan', '0'))
        draft_data_values['backgroundExample'] = ast.literal_eval(draft_data_values['backgroundExample'].replace('nan', '0'))
        draft_data_values['feedbackExample'] = ast.literal_eval(draft_data_values['feedbackExample'].replace('nan', '0'))
        draft_data_values['uploadPracticeTranscriptsData'] = ast.literal_eval(draft_data_values['uploadPracticeTranscriptsData'].replace('nan', '0'))
        draft_data_values['uploadExperimentTranscriptsData'] = ast.literal_eval(draft_data_values['uploadExperimentTranscriptsData'].replace('nan', '0'))
        draft_data_values['audiosPractice'] = ast.literal_eval(draft_data_values['audiosPractice'].replace('nan', '0'))
        draft_data_values['audiosExperement'] = ast.literal_eval(draft_data_values['audiosExperement'].replace('nan', '0'))
        draft_data_values['pagesNeeded'] = ast.literal_eval(draft_data_values['pagesNeeded'].replace('nan', '0'))
        # print('uploadPracticeTranscriptsData',draft_data_values)
        return HttpResponse(json.dumps(draft_data_values))

def delete_experiment(request):
    if request.method == 'GET':
        print('GET',request.GET['name'])
        name_set = experiment_links.objects.filter(experiment_link=request.GET['name']).delete()
        response = dict()
        if not (experiment_links.objects.filter(experiment_link=request.GET['name'])):
            response['answer'] = 'Sucsess!'
        else:
            response['answer'] = 'Error'
        print(name_set)
        return HttpResponse(json.dumps(response))

def stop_experiment(request):
    if request.method == 'GET':
        print('GET',request.GET['name'])
        links_set = list(experiment_links.objects.all().values_list('experiment_link', flat = True))
        links_dict = dict(zip(links_set, list(range(len(links_set)))))
        # print(names_dict)
        model_columns = [f.name for f in experiment_links._meta.get_fields()]
        row_number = links_dict[request.GET['name']]
        links_data_values = {}
        
        for col_name in model_columns:
            col_data = list(experiment_links.objects.all().values_list(col_name, flat = True))
            # print(col_data[row_number])
            links_data_values[col_name] = col_data[row_number]
        name_set = experiment_links.objects.filter(experiment_link=request.GET['name']).delete()
        experiment_links.objects.create(
            experiment_link = links_data_values['experiment_link'],
            accessToken = links_data_values['accessToken'],
            experiment_stopped = True
        )
        print(name_set)
        return HttpResponse(json.dumps(response))

def delete_draft(request):
    if request.method == 'GET':
        print('GET',request.GET['name'])
        name_set = draft_data.objects.filter(nameExperementForParticipants=request.GET['name']).delete()
        response = dict()
        if not (draft_data.objects.filter(nameExperementForParticipants=request.GET['name'])):
            response['answer'] = 'Sucsess!'
        else:
            response['answer'] = 'Error'
        print(name_set)
        return HttpResponse(json.dumps(response))


def load_draft_to_test(request, draft_experement_name):
	draft_experement_name = draft_experement_name.split('=')[1].replace('+', '_')
	if request.method == 'GET':
		name_set = list(draft_data.objects.all().values_list('nameExperementForParticipants', flat = True))
		names_dict = dict(zip(name_set, list(range(len(name_set)))))
		print(names_dict)
		model_columns = ['uploadExperementTranscripts','uploadExperementAudio','uploadPracticeAudio', 'uploadPracticeTranscripts']
		row_number = names_dict[draft_experement_name]
		draft_data_values = {}
		for col_name in model_columns:
			col_data = list(draft_data.objects.all().values_list(col_name, flat = True))
			# print(col_data[row_number])
			draft_data_values[col_name] = col_data[row_number]
			# print(list(ex_data_model.objects.all().values_list()))
		# print(json.dumps(draft_data_values))
		# print(settings.MEDIA_URL+draft_data_values['uploadPracticeAudio'])
		# print(settings.MEDIA_ROOT)
		### TODO linux
		# path_to_zip_file = settings.MEDIA_ROOT + '/' + draft_data_values['uploadPracticeAudio']
		# directory_to_extract_to = settings.MEDIA_ROOT + '/' + draft_experement_name
		onlyfilesPractice = ''
		onlyfilesExperement = ''
		# print("draft_data_values['uploadPracticeAudio']",draft_data_values['uploadPracticeAudio'])
		if draft_data_values['uploadPracticeAudio']:
			path_to_zip_file = settings.MEDIA_ROOT + '/' + draft_data_values['uploadPracticeAudio']
			directory_to_extract_to = settings.MEDIA_ROOT + '/Practice/' + draft_experement_name
			if list(os.walk(directory_to_extract_to)):
				shutil.rmtree(directory_to_extract_to)
			# print('path_to_zip_file',path_to_zip_file, directory_to_extract_to)
			
			patoolib.extract_archive(path_to_zip_file, outdir = directory_to_extract_to)
		# print(x)
			test = os.walk(directory_to_extract_to)
			path, dirs, files = next(test)
			if dirs:    
				print('folder', dirs)
				for dir in dirs:
					if dir != '__MACOSX':
						p = os.walk(os.path.join(directory_to_extract_to,dir))
						pa, di, fi = next(p)
						for file in fi:
							print(file)
							shutil.copy(os.path.join(directory_to_extract_to,dir,file), os.path.join(directory_to_extract_to,file))
			onlyfilesPractice = [os.path.join(draft_experement_name, f) for f in os.listdir(directory_to_extract_to) if os.path.isfile(os.path.join(directory_to_extract_to, f))]

		if draft_data_values['uploadExperementAudio']:
			path_to_zip_file = settings.MEDIA_ROOT + '/' + draft_data_values['uploadExperementAudio']
			directory_to_extract_to = settings.MEDIA_ROOT + '/Experement/' + draft_experement_name
			if list(os.walk(directory_to_extract_to)):
				shutil.rmtree(directory_to_extract_to)
			# print('path_to_zip_file',path_to_zip_file, directory_to_extract_to)
			
			patoolib.extract_archive(path_to_zip_file, outdir = directory_to_extract_to)
		# print(x)
			test = os.walk(directory_to_extract_to)
			path, dirs, files = next(test)
			if dirs:    
				print('folder', dirs)
				for dir in dirs:
					if dir != '__MACOSX':
						p = os.walk(os.path.join(directory_to_extract_to,dir))
						pa, di, fi = next(p)
						for file in fi:
							print(file)
							shutil.copy(os.path.join(directory_to_extract_to,dir,file), os.path.join(directory_to_extract_to,file))

			onlyfilesExperement = [os.path.join(draft_experement_name, f) for f in os.listdir(directory_to_extract_to) if os.path.isfile(os.path.join(directory_to_extract_to, f))]
		return HttpResponse(json.dumps({'audiosPractice': onlyfilesPractice, 'audiosExperement':onlyfilesExperement}))

def load_experement(request, experement_name):
    experement_name = experement_name.split('=')[1].replace(' ', '_').replace('+', '_')
    print('experement_name', experement_name)
    if request.method == 'GET':
        name_set = list(draft_data.objects.all().values_list('nameExperementForParticipants', flat = True))
        name_set_new = list(draft_data.objects.filter(nameExperementForParticipants=experement_name).values_list())
        names_dict = dict(zip(name_set, list(range(len(name_set)))))
        # print(names_dict)
        model_columns = [f.name for f in draft_data._meta.get_fields()]
        row_number = names_dict[experement_name]
        draft_data_values = {}
        for col_name in model_columns:
            col_data = list(draft_data.objects.all().values_list(col_name, flat = True))
            draft_data_values[col_name] = col_data[row_number]
        
        # links_set = list(experiment_links.objects.all().values_list('experiment_link', flat = True))
        link = list(experiment_links.objects.filter(experiment_link__iregex=rf'experiment/{experement_name}.*').values_list())[-1]
        # print('link set', name_set, draft_data_values)
        # print()
        # print(name_set_new)

        draft_data_values['backgroundAddQ'] = ast.literal_eval(draft_data_values['backgroundAddQ'])
        draft_data_values['feedbackAddQ'] = ast.literal_eval(draft_data_values['feedbackAddQ'])
        draft_data_values['backgroundExample'] = ast.literal_eval(draft_data_values['backgroundExample'])
        draft_data_values['feedbackExample'] = ast.literal_eval(draft_data_values['feedbackExample'])
        draft_data_values['uploadPracticeTranscriptsData'] = ast.literal_eval(draft_data_values['uploadPracticeTranscriptsData'])
        draft_data_values['uploadExperimentTranscriptsData'] = ast.literal_eval(draft_data_values['uploadExperimentTranscriptsData'])
        draft_data_values['audiosPractice'] = ast.literal_eval(draft_data_values['audiosPractice'])
        draft_data_values['audiosExperement'] = ast.literal_eval(draft_data_values['audiosExperement'])
        draft_data_values['pagesNeeded'] = ast.literal_eval(draft_data_values['pagesNeeded'].replace('nan', '0'))
        draft_data_values['experimentStopped'] = ast.literal_eval(link[-1])
        print('draft_data_values',draft_data_values)
        ### TODO linux
        # path_to_zip_file = settings.MEDIA_ROOT + '/' + draft_data_values['uploadPracticeAudio']
        # directory_to_extract_to = settings.MEDIA_ROOT + '/' + draft_experement_name

        return HttpResponse(json.dumps(draft_data_values))

#?PROLIFIC_PID={{%PROLIFIC_PID%}}&STUDY_ID={{%STUDY_ID%}}&SESSION_ID={{%SESSION_ID%}}
def introduction(request):
    # #print(request)
    if request.method == 'GET':
        if request.GET.get('PROLIFIC_PID'):
            global prolific
            prolific = request.GET['PROLIFIC_PID']
            #print(prolific, study)
            if request.session.session_key:
                ##print(request.session.session_key)
                session_key = request.session.session_key
                session = Session.objects.get(session_key=session_key)
                ##print(session)
                Session.objects.filter(session_key=session).delete()
            x = prolific
            request.session.set_expiry(5400)
            request.session[x]=x
            request.session.save()
            # print('sessions', request.session.keys(), request.session.session_key)
            
            # #print('sessions', request.session[x], request.session.session_key)
            return render(request, 'experiment/introduction.html', {})
        else:
            return redirect('noprolificid')

def noprolificid(request):
    return render(request, 'experiment/noprolificid.html', {})

def get_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def consent(request):
    if request.method == 'POST':
        if request.POST['consent'] == "I agree":
            ip = get_ip(request)
            # if sessions.objects.filter(ip=str(ip)):
            #     for i in sessions.objects.filter(ip=str(ip)):
            #         #print(i.ip)
            #     #print('IP found')

            if sessions.objects.filter(ip=str(ip)) or sessions.objects.filter(session_id=list(request.session.keys())[1]):
                # print('session', request.session.session_key)
                # print('ip', sessions.objects.filter(ip=str(ip)))
                # print('prolific', sessions.objects.filter(session_id=list(request.session.keys())[1]))
                return redirect('passed')

            else:

                # global x
                # x = str(uuid.uuid4())
                # request.session.set_expiry(5400)
                # request.session[x]=x
                # # #print('sessions', request.session[x], request.session.session_key)
                # request.session.save()
                # # #print('sessions', request.session[x], request.session.session_key)
                session = request.session.session_key
                prolific = list(request.session.keys())[1]
                publish_date = datetime.datetime.now()
                # print(prolific)
                sessions.objects.create(
                    session_id = request.session[prolific],
                    session_key = session,
                    ip = ip,
                    published_date = publish_date,
                    )
                ##print(request.session[x])
                return redirect('outline')
        elif request.POST['consent'] == "I disagree":
            return redirect('./?PROLIFIC_PID={}'.format(list(request.session.keys())[1]))
    return render(request, 'experiment/consent.html', {})

def you_passed(request):
    return render(request, 'experiment/passed.html', {})

def outline(request):
    return render(request, 'experiment/outline.html', {})

@csrf_exempt
def questionnaire(request):
    form = backgroundForm(request.POST)
    if request.method == 'POST':
        backgroundDict = dict(filter(lambda x: 'BackgroundNew' in x[0],dict(request.POST).items()))
        print(backgroundDict)
        # print(form.is_valid(), form)
        # print(request.POST.get('LevelEducation'))
        background.objects.create(
                session_key = request.POST.get('session_key', ''),
                Age = request.POST.get('Age', ''),
                Gender = request.POST.get('Gender', ''),
                LevelEducation = request.POST.get('LevelEducation', ''),
                AcadmicField = request.POST.get('AcadmicField', ''),
                NativeLanguage = request.POST.get('NativeLanguage', ''),
                OtherLanguage = request.POST.get('OtherLanguage', ''),
                Dyslexsia = request.POST.get('Dyslexsia', ''),
                HearingDiff = request.POST.get('HearingDiff', ''),
                Whisper = request.POST.get('Whisper', ''),
                Comments = request.POST.get('Comments', ''),
                addedQ = backgroundDict,
                experiment_name = request.POST.get('experiment_name', ''),
                prolific_id = request.POST.get('prolific', '')
            )
        print(background.objects.all().values_list())
            # newanswer = form.save(commit=False)
            # newanswer.addedQ = backgroundDict
            # newanswer.session_key = 0
            # newanswer.save()
    return HttpResponse('')

@csrf_exempt
def data(request):
    if request.method == 'POST':
        if request.is_ajax():
            req = json.loads(request.body)
            checkboxes = req['check']
            #print(checkboxes)
            index = req['index']
            session = request.session.session_key
            question = req['question']
        else:
            checkboxes = dict(filter(lambda x: 'checkbox' in x[0],dict(request.POST).items()))
            print(dict(request.POST).values(), list(checkboxes.keys()))
            checkboxes = list(checkboxes.values())
            #print(checkboxes)
            index = request.POST['index']
            session = request.POST.get('session_key', '')
            question = request.POST.get('question', '')
        test.objects.create(
            session_key = session,
            checkbox = checkboxes,
            index = index,
            question = question,
            experiment_name = request.POST["experiment_name"],
            date = datetime.datetime.now(),
            prolific_id = request.POST.get('prolific', '')
            )
        #print('1', checkboxes, question, session, index)
        return HttpResponse('')


def training1(request):
    return render(request, 'experiment/training1.html', {})


def training2(request):
    return render(request, 'experiment/training2.html', {})

def training3(request):
    return render(request, 'experiment/training3.html', {})

def trainingcompleted(request):
    if request.method == 'POST':
        ##print(request.POST['next'])
        if request.POST['next'] == 'Proceed':
            order = [i for i in range(4,54)]
            random.shuffle(order)
            request.session['order'] = order
            return redirect('get_challenge')    
    return render(request, 'experiment/trainingcompleted.html', {})

def confirm(request):
    return render(request, 'experiment/challenge.html', {'order': request.session['order']})

def secret(request):
    if request.method == 'GET':
        secret_word = '12345'
    return HttpResponse(json.dumps({'secret': secret_word}))

def challenge(request):
    ##print(request.session)
    return render(request, 'experiment/challenge.html', {})

def thanks(request):
    return render(request, 'experiment/thanks.html', {})

def taskcompleted(request):
    return render(request, 'experiment/taskcompleted.html', {})

def sentence(request):
    form = sentenceForm(request.POST)
    return render(request, 'experiment/sentence.html', {'form': form})
@csrf_exempt
def text(request):
    if request.method == 'POST':
        if request.is_ajax():
            req = json.loads(request.body)
            #print(checkboxes)
            index = req['index']
            session = request.session.session_key
            text = req['text']
        else:
            session = request.POST['session_key']
            index = request.POST['index']
            text = request.POST['text']
            experiment_name = request.POST['experiment_name']
        s.objects.create(
            session_key = session,
            text = text,
            index = index,
            experiment_name = experiment_name,
            prolific_id = request.POST.get('prolific', '')
            )
        # print(request.POST)
        return HttpResponse('')
@csrf_exempt
def feedbackQ(request):
    form = feedbackForm(request.POST)
    if request.method == 'POST':
        feedbackDict = dict(filter(lambda x: 'FeedbackNew' in x[0],dict(request.POST).items()))
        print(feedbackDict)
        print(form.is_valid(), form)
        print(request.POST.get('education'))
        feedback.objects.create(
            session_key = request.POST.get('session_key', ''),
            instructions = request.POST.get('instructions', ''),
            doing = request.POST.get('doing', ''),
            simple = request.POST.get('simple', ''),
            demanding = request.POST.get('demanding', ''),
            pessure = request.POST.get('pessure', ''),
            fun = request.POST.get('fun', ''),
            reflects = request.POST.get('reflects', ''),
            performance = request.POST.get('performance', ''),
            understood = request.POST.get('understood', ''),    
            measured = request.POST.get('measured', ''),
            strategy = request.POST.get('strategy', ''),
            impression = request.POST.get('impression', ''),
            comments = request.POST.get('comments', ''),
            addedQ = feedbackDict,
            experiment_name = request.POST.get('experiment_name', ''),
            prolific_id = request.POST.get('prolific', '')
            )
            # newanswer = form.save(commit=False)
            # newanswer.addedQ = backgroundDict
            # newanswer.session_key = 0
            # newanswer.save()
    return HttpResponse('')

def end(request):
    return render(request, 'experiment/end.html', {})

from functools import reduce

def results(request, name):
    # print('results')
    if request.method == 'GET':
        print('name', name, name.split('='))
        experiment_name = name.split('=')[1]
        name_set = list(test.objects.all().values_list('experiment_name', flat = True))

        names_dict = list(filter(lambda x: x[0]  == experiment_name,list(zip(name_set, list(range(len(name_set)))))))
        
        model_columns = [f.name for f in test._meta.get_fields()]
        
        experiment_results = []
        for name, index in names_dict:
            experiment_one_result = {}
            for col_name in model_columns:
                if col_name == 'session_key':
                    col_data = list(map(lambda x: x[:5],test.objects.all().values_list(col_name, flat = True)))
                else:
                    col_data = list(test.objects.all().values_list(col_name, flat = True))
                experiment_one_result[col_name] = col_data[index]
            experiment_results.append(experiment_one_result)
        df_raw = pd.DataFrame(experiment_results)
        print('experiment_results', df_raw) 
        session_ids = []
        session_time = []

        for i in experiment_results:
            if i['index'] == 0:
                session_ids.append(i['session_key'])
                session_time.append(i['date'].split('.')[0])
        # print('session_ids, session_time', session_ids, session_time)

        
        experiments_names_numbers = list(draft_data.objects.all().values_list('nameExperementForParticipants', flat = True))
        experiments_names_numbers_dict = dict(zip(experiments_names_numbers, list(range(len(experiments_names_numbers)))))
        
        # model_columns = [f.name for f in draft_data._meta.get_fields()]
        row_number = experiments_names_numbers_dict[experiment_name]


        transcripts_data = ast.literal_eval(list(draft_data.objects.all().values_list('uploadExperimentTranscriptsData', flat = True))[row_number])
        # print('transcripts_data', transcripts_data[0])
        row_names = []
        transcript_row_number = {}
        for i, transcript in enumerate(transcripts_data):
            # print('transcript',transcript[1].split())
            transcript_row_number[i] = len(row_names)
            for space in range(len(transcript[1].split())-1):
                row_names.append(str(transcript[0])+'_'+str(space))
        results_dict = dict()
        for i in range(len(experiment_results)):
            resent_results = []
            for n in range(len(transcripts_data[experiment_results[i]['index']][1].split())-1):
                # print('experiment_results', n, [str(n)] in ast.literal_eval(experiment_results[i]['checkbox']),  type(ast.literal_eval(experiment_results[i]['checkbox'])), ast.literal_eval(experiment_results[i]['checkbox']))
                if [str(n)] in ast.literal_eval(experiment_results[i]['checkbox']):
                    resent_results.append(1)
                else:
                    resent_results.append(0)
            results = experiment_results[i]['session_key'], resent_results
            results_dict.setdefault(experiment_results[i]['index'], []).append(results)
        # print('results_dict', results_dict)
        table = [[0 for i in range(len(session_ids))] for n in range(len(row_names))]


        # print(transcript_row_number)
        for i in range(len(session_ids)):
            for key, value in results_dict.items():
                for v in value:
                    # print(v[0], session_ids[i])
                    if v[0] == session_ids[i]:
                        # print(transcript_row_number.get(key), value)
                        z = 0
                        for n in range(transcript_row_number.get(key), transcript_row_number.get(key)+len(v[1])):
                            # print('start and finish', transcript_row_number.get(key), transcript_row_number.get(key)+len(v[1]))
                            table[n][i] = v[1][z]
                            z += 1
        df = pd.DataFrame(table, index=row_names)
        df.columns = [list(map(lambda x: x[:5], session_ids)), session_time]
        outdir = settings.MEDIA_ROOT +'/Experement/'+experiment_name
        if not os.path.exists(outdir):
            os.mkdir(outdir)
        df.to_csv(os.path.join(outdir, 'results.csv'), sep=',', encoding='utf-8')
        

        useQ = list(draft_data.objects.all().values_list('UseQuestions', flat = True))[row_number]
        useP = list(draft_data.objects.all().values_list('UseProlific', flat = True))[row_number]
        print('use', useP, useQ)
        if experiment_results:
            if not useQ:
                df_raw = df_raw.drop(labels=('question'), axis=1)
                print('inplace', df_raw)
            if not useP:
                df_raw = df_raw.drop(labels=('prolific_id'), axis=1)
        df_raw.to_csv(os.path.join(outdir, 'results_raw.csv'), sep=',', encoding='utf-8')
        return HttpResponse('Success!')

def backgroundRES(request, name):
    # print('name', name, name.split('='))
    if request.method == 'GET':
        # print('name', name, name.split('='))
        current_experiment_name = name.split('=')[1]
        name_set = list(background.objects.all().values_list('experiment_name', flat = True))
        names_dict = list(filter(lambda x: x[0]  == current_experiment_name,list(zip(name_set, list(range(len(name_set)))))))
        # print(names_dict) 
        model_columns = [f.name for f in background._meta.get_fields()]

        experiments_names_numbers = list(draft_data.objects.all().values_list('nameExperementForParticipants', flat = True))
        experiments_names_numbers_dict = dict(zip(experiments_names_numbers, list(range(len(experiments_names_numbers)))))
        # print('experiment_data_dict', experiment_data_dict, current_experiment_name)
        row_number = experiments_names_numbers_dict[current_experiment_name]

        get_background_questions = list(draft_data.objects.all().values_list('backgroundExample', flat = True))[row_number]
        get_background_add_questions = list(draft_data.objects.all().values_list('backgroundAddQ', flat = True))[row_number]
        model_columns = list(map(lambda x: x.split('Background')[1], list(ast.literal_eval(get_background_questions).keys())))
        model_columns = list(filter(lambda x: 'New' not in x, model_columns))
        if get_background_add_questions:
            model_columns.append('addedQ')
        
        background_table = []
        for name, index in names_dict:
            background_one_result = {}
            for col_name in model_columns:
                if col_name == 'addedQ':
                    col_data = list(background.objects.all().values_list(col_name, flat = True))[index]
                    for question in ast.literal_eval(get_background_add_questions).keys():
                        if col_data:
                            if ast.literal_eval(col_data).get(question):
                                background_one_result[ast.literal_eval(get_background_add_questions)[question][0]] = ast.literal_eval(col_data).get(question)[0]
                else:
                    col_data = list(background.objects.all().values_list(col_name, flat = True))
                    background_one_result[col_name] = col_data[index]
            background_table.append(background_one_result)
        df = pd.DataFrame(background_table)
        outdir = settings.MEDIA_ROOT +'/Experement/'+current_experiment_name
        if not os.path.exists(outdir):
            os.mkdir(outdir)
        df.to_csv(os.path.join(outdir, 'background.csv'), sep=',', encoding='utf-8')
    return HttpResponse("ok!")

def feedbackRES(request, name):
    current_experiment_name = name.split('=')[1]
    name_set = list(feedback.objects.all().values_list('experiment_name', flat = True))
    names_dict = list(filter(lambda x: x[0]  == current_experiment_name,list(zip(name_set, list(range(len(name_set)))))))
    feedback_table = []

    experiments_names_numbers = list(draft_data.objects.all().values_list('nameExperementForParticipants', flat = True))
    experiments_names_numbers_dict = dict(zip(experiments_names_numbers, list(range(len(experiments_names_numbers)))))
    
    # model_columns = [f.name for f in draft_data._meta.get_fields()]
    row_number = experiments_names_numbers_dict[current_experiment_name]
    get_feedback_questions = list(draft_data.objects.all().values_list('feedbackExample', flat = True))[row_number]
    get_feedback_add_questions = list(draft_data.objects.all().values_list('feedbackAddQ', flat = True))[row_number]
    # print('get_feedback_questions, get_feedback_add_questions', list(ast.literal_eval(get_feedback_questions).keys()) + list(ast.literal_eval(get_feedback_add_questions).keys()))

    model_columns = list(map(lambda x: x.split('Feedback')[1], list(ast.literal_eval(get_feedback_questions).keys())))
    model_columns = list(filter(lambda x: 'New' not in x, model_columns))
    if get_feedback_add_questions:
        model_columns.append('addedQ')
    
    for name, index in names_dict:
        feedback_one_result = {}
        for col_name in model_columns:
            if col_name == 'CommentsText':
                continue
            elif col_name == 'addedQ':
                col_data = list(feedback.objects.all().values_list(col_name, flat = True))[index]
                print('col data', col_data)
                for question in ast.literal_eval(get_feedback_add_questions).keys():
                    if col_data:
                        if ast.literal_eval(col_data).get(question):
                            feedback_one_result[ast.literal_eval(get_feedback_add_questions)[question][0]] = ast.literal_eval(col_data).get(question)[0]
            else:
                col_data = list(feedback.objects.all().values_list(col_name, flat = True))
                feedback_one_result[col_name] = col_data[index]
            # print('col_name', col_name, index)
        feedback_table.append(feedback_one_result)
    df = pd.DataFrame(feedback_table)
    outdir = settings.MEDIA_ROOT +'/Experement/'+current_experiment_name
    if not os.path.exists(outdir):
        os.mkdir(outdir)
    df.to_csv(os.path.join(outdir,'feedback.csv'), sep=',', encoding='utf-8')
    return HttpResponse("Ok!")



def sentenceRES(request, name):
    current_experiment_name = name.split('=')[1]
    print('sentence', name)
    name_set = list(s.objects.all().values_list('experiment_name', flat = True))
    names_dict = list(filter(lambda x: x[0]  == current_experiment_name,list(zip(name_set, list(range(len(name_set)))))))
    sentence_table = {}
    

    experiments_names_numbers = list(draft_data.objects.all().values_list('nameExperementForParticipants', flat = True))
    experiments_names_numbers_dict = dict(zip(experiments_names_numbers, list(range(len(experiments_names_numbers)))))
    
    # model_columns = [f.name for f in draft_data._meta.get_fields()]
    row_number = experiments_names_numbers_dict[current_experiment_name]
    is_prolific_in_draft = list(draft_data.objects.all().values_list('UseProlific', flat = True))[row_number]

    if is_prolific_in_draft:
        model_columns = ['session_key', 'index', 'text', 'prolific_id']
    else:
        model_columns = ['session_key', 'index', 'text']
    text_len = 0
    for name, index in names_dict:
        text_index = list(s.objects.all().values_list('text', flat = True))[index]
        sentence_table.setdefault(list(s.objects.all().values_list('session_key', flat = True))[index], []).append(text_index)
        if len(sentence_table[list(s.objects.all().values_list('session_key', flat = True))[index]]) > text_len:
            text_len = len(sentence_table[list(s.objects.all().values_list('session_key', flat = True))[index]])
    with open('levi.txt', 'r') as f:
        sentencies_goal = list(map(lambda x: x.replace('\n', ''), f.readlines()))
    df = pd.DataFrame.from_dict(sentence_table, orient='index', columns=sentencies_goal[:text_len])
    # df.columns = sentencies_goal
    # for name, index in names_dict:
    #     sentence_one_result = {}
    #     for col_name in model_columns:
    #         col_data = list(s.objects.all().values_list(col_name, flat = True))[index]
    #         if col_name == 'session_key':
    #             col_data = col_data[:5]
    #         sentence_one_result[col_name] = col_data
    #     sentence_table.append(sentence_one_result)

    # df = pd.DataFrame(sentence_table)
    outdir = settings.MEDIA_ROOT +'/Experement/'+current_experiment_name
    if not os.path.exists(outdir):
        os.mkdir(outdir)
    print('sentence', outdir, sentence_table)
    df.to_csv(os.path.join(outdir,'sentence.csv'), sep=',', encoding='utf-8')
    return HttpResponse("Ok!")


def levi(request, name):
    current_experiment_name = name.split('=')[1]
    print(name)
    name_set = list(s.objects.all().values_list('experiment_name', flat = True))
    names_dict = list(filter(lambda x: x[0]  == current_experiment_name,list(zip(name_set, list(range(len(name_set)))))))
    sentence_table = {}
    for name, index in names_dict:
        text_index = list(s.objects.all().values_list('text', flat = True))[index]
        sentence_table.setdefault(list(s.objects.all().values_list('session_key', flat = True))[index], []).append(text_index)
    # print('sentence', sentence_table, current_experiment_name)
    with open('levi.txt', 'r') as f:
        sentencies_goal = list(map(lambda x: x.replace('\n', ''), f.readlines()))
        # print('goal', sentencies_goal)
    sentence_distance = {}
    for key, value in sentence_table.items():
        for index, i in enumerate(value):
            # print('dist', i, index, sentencies_goal[index])
            sentence_distance.setdefault(key[:5], []).append(distance(i, sentencies_goal[index]))
    print('sentence_distance', sentence_distance)
    df = pd.DataFrame.from_dict(sentence_distance, orient='index')
    outdir = settings.MEDIA_ROOT +'/Experement/'+current_experiment_name
    if not os.path.exists(outdir):
        os.mkdir(outdir)
    df.to_csv(os.path.join(outdir,'sentence_distance.csv'), sep=',', encoding='utf-8')
    # json.dumps(parsed, indent=4)  
    return HttpResponse("Ok!")


@csrf_exempt
def permutation(request, name):
    current_experiment_name = name.split('=')[1]
    print(name)
    #monte carlo program. shuffles real results into random results (permutation test).
    #new version (divide and conquer!)
    #Nina Mikušová, 9.3.2020

    ###stuff that needs to be changed for the run:
    #input file path
    #output file path
    #how many runs we want to do (we use 10.000 or a million normally)
    #what is the number of participants that were inputting the boundaries (for a maximum)

    #this program with 10000 runs takes under 30 minutes to run on my comp
    #with a million of runs it's about 8,5 hours

    import numpy as np
    import gc

    import datetime ###that's just so that I know how long exactly the program took to run
    timestart = datetime.datetime.now()

    #import array from textfile
    #this is a table of all the results for the set; n of rows = n of participants; n of columns = n of possible boundary spaces.
    #so all results (zeroes and ones) for one boundary spaces form one column
    #CHANGE PATH HERE
    p = settings.MEDIA_ROOT + '/Experement/'+current_experiment_name+'/results.csv'
    with open(p, 'r') as f:
        column_names = f.readline().split(',')
        ncols = len(f.readline().split(','))
        row_names = []
        for i, line in enumerate(f.readlines()):
            # print('i', i, line)
            if i == 0:
                print(line.split(',')[0])
            row_names.append(line.split(',')[0])
        print('len', len(row_names))
        
        
    

    table = np.loadtxt(p, dtype='int', delimiter=',', skiprows=2, usecols=np.arange(1,ncols))
    print('table', table)
    observed_result = []
    for row in table:
        observed_result.append(sum(row))
    # column_names = table[0]
    # row_names = table[ : , 0]
    print('cr', table)
    table = np.transpose(table)


    #I could count the maximum, but right now for the counting I actually need the zeroes up until the real maximum. so give as an input the number of participants.
    #CHANGE NUMBER OF PARTICIPANTS HERE
    maximum = ncols - 1
    print(maximum)


    #create array of results, empty; will have shape of no. of participants times no. of positions
    tableshape = table.shape
    print('shape', tableshape)


    ###added for checking the positions (?)
    a=[]

    #shuffle rows in array
    def scramble(a, axis=-1):
        """
        Return an array with the values of `a` independently shuffled along the
        given axis
        """
        b = np.random.random(a.shape)
        idx = np.argsort(b, axis=axis)
        shuffled = a[np.arange(a.shape[0])[:, None], idx]
        return shuffled

    #number of runs we want to do. Make it divisible by 1000 or you'll end up with slightly different number.
    #CHANGE AMOUNT HERE if necessary
    if len(request.POST.get('amount'))>0:
        runs = int(request.POST.get('amount'))
    else:
        runs = 1000
    print('runs',runs,request.POST.get('amount'))
    cycle_length = 10
    cycles = runs // cycle_length

    #empty table for final result
    final_result = np.zeros(shape=[tableshape[1],maximum+1], dtype='int')

    #dividing the thing up; each 1000 runs the result is saved in "result" as a list of how many zeroes, ones, twos etc. there is; the outer loop then sums them into a million tries
    for j in range (cycles):
        result = np.empty(shape=[0,tableshape[1]], dtype='int')
        
        for i in range(cycle_length):
            #shuffles the table's rows randomly, to create one iteration of completely randomly assigned boundaries
            scrambled = scramble(table)

            #add columns into one vector; meaning it sums the iteration above to produce the amount of boundaries input in each place
            summed = scrambled.sum(axis=0)

            #summarize the vector and add it to a result array. We wouldnt need this step but in case we want to output this...
            #if we did then use this
            #np.savetxt('C:/Users/Pilgrimo_2/Downloads/_montecarlo/mc_russian_result.txt', result, fmt='%1.0f', delimiter='\t')
            result = np.vstack([result, summed])


        #create a new empty table in which the program will output the counts of each number (0 to maximum) for each position
        intermediate_result = np.empty(shape=[tableshape[1],maximum+1], dtype='int')

        #transpose the table, because it's easier to count occurrences accross a row than a column
        result_transposed = result.transpose()

        for j in range(len(result_transposed)):
            for k in range(maximum+1):
                intermediate_result[j,k] = np.count_nonzero(result_transposed[j]==k)

        #adding into final reult
        final_result = final_result + intermediate_result

        #lets me know how long an outer loop execution takes
        timepoint = datetime.datetime.now()
        print(timepoint-timestart)

        ###this is not the best practice, but it shouldn't hurt. calling garbage collector to clean up memory.
        gc.collect()

    p_value_r = []
    p_value_l = []
    double_lower_p = []
    for item, line in enumerate(final_result):
        if observed_result[item] != 0:
            p_value_r.append((runs - sum(line[:observed_result[item]]) + 1)/(runs+1))
            p_value_l.append((sum(line[:observed_result[item]]) + 1)/(runs+1))
        else:
            p_value_r.append(1)
            p_value_l.append((line[0]+1)/(runs+1))
        double_lower_p.append(min(p_value_r[-1], p_value_l[-1])*2)
    
    #save the result
    #CHANGE PATH HERE
    # np.savetxt('./media/Experement/'+current_experiment_name+'/results_permutation.csv', final_result, fmt='%1.0f', delimiter=',')
    df = pd.DataFrame(data=final_result, index=row_names, columns=list(range(ncols)))

    df['observed result'] = observed_result
    df['p-value for right tail'] = p_value_r
    df['p-value for left tail'] = p_value_l
    df['double lower p-value'] = double_lower_p
    # from scipy.interpolate import UnivariateSpline

    import multipy.fdr as mpy
    def lsu(pvals, q=0.05):
        """
        Input arguments:
        ================
        pvals - P-values corresponding to a family of hypotheses.
        q     - The desired false discovery rate.
        Output arguments:
        List of booleans indicating which p-values are significant (encoded
        as boolean True values) and which are not (False values).
        """
        m = len(pvals)
        sort_ind = np.argsort(pvals)
        k = [i for i, p in enumerate(np.array(pvals)[sort_ind]) if p < (i+1.)*q/m]
        significant = np.zeros(m)
        if k:
            significant[sort_ind[0:k[-1]+1]] = 1
        return significant
    Benjamini = lsu(double_lower_p, q=0.05)
    df['Benjamini'] = Benjamini
    print(df)
    ones_indexes = np.where(df['Benjamini'] == 1)
    print('ones', type(ones_indexes), ones_indexes)
    print(np.array(ones_indexes).tolist()[0])
    final_numbers = []
    if ones_indexes:
        final_numbers = df['observed result'][np.array(ones_indexes).tolist()[0]]
    print('ones', final_numbers)
    df['Final Numbers'] = final_numbers
    outdir = settings.MEDIA_ROOT +'/Experement/'+current_experiment_name
    if not os.path.exists(outdir):
        os.mkdir(outdir)
    df.to_csv(os.path.join(outdir,'results_permutation.csv'), sep=',', encoding='utf-8')
    timeend = datetime.datetime.now()
    print("finished after ", timeend-timestart)


    return HttpResponse("Ok!")