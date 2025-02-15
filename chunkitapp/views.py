from distutils.log import error
from django.shortcuts import redirect
from django.http import HttpResponse
from .models import background, feedback, test, experiment_links
from .models import sentence as s
from .models import draft_data
from .forms import draftDataForm
import os
import datetime
import json
from django.conf import settings
import patoolib
import ast
from django.views.decorators.csrf import csrf_exempt
import pandas as pd
import shutil
import pandas as pd
from rest_framework.views import APIView
import requests
from Levenshtein import distance


class UserActivationView(APIView):
    def get(self, request, uid, token):
        # print('get')
        protocol = 'https://' if request.is_secure() else 'http://'
        web_url = protocol + request.get_host()
        post_url = web_url + "/auth/users/activation/"
        post_data = {'uid': uid, 'token': token}
        result = requests.post(post_url, data=post_data)
        content = result.text
        return redirect('authorized')


def unpackArchive(experement_name):
    """
    Unpack audios archive for practice or experiment and rewrite data in
    database about it
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

    if draft_data_values.get('uploadExperimentTranscripts'):
        path_to_transcripts_file_experement = settings.MEDIA_ROOT + '/' + \
                    draft_data_values.get('uploadExperimentTranscripts')
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
                    p = os.walk(os.path.join(directory_to_extract_to, dir))
                    _, _, fi = next(p)
                    for file in fi:
                        if file[0] != '.':
                            shutil.copy(os.path.join(directory_to_extract_to,
                                                     dir, file),
                                        os.path.join(directory_to_extract_to,
                                                     file))

        onlyfilesPractice = [os.path.join(experement_name, f) for f
                             in os.listdir(directory_to_extract_to) if
                             os.path.isfile(
                                 os.path.join(directory_to_extract_to, f))]

    if draft_data_values.get('uploadExperimentAudio'):
        path_to_zip_file = os.path.join(settings.MEDIA_ROOT,
                                        draft_data_values.get(
                                            'uploadExperimentAudio'))
        directory_to_extract_to = os.path.join(settings.MEDIA_ROOT,
                                               'Experement', experement_name)
        if list(os.walk(directory_to_extract_to)):
            shutil.rmtree(directory_to_extract_to)

        if not os.path.exists(directory_to_extract_to):
            os.makedirs(directory_to_extract_to)

        patoolib.extract_archive(path_to_zip_file,
                                 outdir=directory_to_extract_to)
        test = os.walk(directory_to_extract_to)
        _, dirs, _ = next(test)
        if dirs:
            for dir in dirs:
                if dir != '__MACOSX':
                    p = os.walk(os.path.join(directory_to_extract_to, dir))
                    _, _, fi = next(p)
                    for file in fi:
                        if file[0] != '.':
                            shutil.copy(os.path.join(directory_to_extract_to,
                                                     dir,
                                                     file),
                                        os.path.join(directory_to_extract_to,
                                                     file))

        onlyfilesExperement = [os.path.join(experement_name, f) for f in
                               os.listdir(directory_to_extract_to) if
                               os.path.isfile(os.path.join(directory_to_extract_to,f))]
    
    draft_data.objects.filter(nameExperementForParticipants=experement_name).delete()
    draft_data.objects.create(
        accessToken=draft_data_values.get("accessToken", 0),
        nameExperement=draft_data_values.get("nameExperement",0),
        sessionTime=draft_data_values.get("sessionTime",90),
        shuffleExtracts=draft_data_values.get("shuffleExtracts",0),
        shuffleExtractsPractice=draft_data_values.get("shuffleExtractsPractice",0),
        nameExperementForParticipants=draft_data_values.get("nameExperementForParticipants",0),
        ImitationTask=draft_data_values.get("ImitationTask",0),
        UseQuestions=draft_data_values.get("UseQuestions",0),
        UseProlific=draft_data_values.get("UseProlific",0),
        linkToProlific=draft_data_values.get("linkToProlific",0),
        helloEditor=draft_data_values.get("helloEditor",0),
        consentEditor=draft_data_values.get("consentEditor",0),
        outlineEditor=draft_data_values.get("outlineEditor",0),
        backgroundExample=draft_data_values.get("backgroundExample",0),
        backgroundAddQ=draft_data_values.get("backgroundAddQ",0),
        feedbackExample=draft_data_values.get("feedbackExample",0),
        feedbackAddQ=draft_data_values.get("feedbackAddQ",0),
        goodbyeEditor=draft_data_values.get("goodbyeEditor",0),
        uploadPracticeAudio=draft_data_values.get("uploadPracticeAudio",0),
        uploadPracticeTranscripts=draft_data_values.get("uploadPracticeTranscripts",0),
        uploadExperimentAudio=draft_data_values.get("uploadExperimentAudio",0),
        uploadExperimentTranscripts=draft_data_values.get("uploadExperimentTranscripts",0),
        experimentInstructions=draft_data_values.get("experimentInstructions",0),
        practiceInstructions=draft_data_values.get("practiceInstructions",0),
        pagesNeeded = draft_data_values.get("pagesNeeded",0),
        uploadPracticeTranscriptsData = transcripts_file_practice,
        uploadExperimentTranscriptsData = transcripts_file_experement,
        audiosPractice=onlyfilesPractice,
        audiosExperement=onlyfilesExperement
        )


def save_draft(request):
    """
    Save draft of experiment. Collect all questions and additional questions
    for background and feedback. Add link to links database if it exists. 
    Save data and unpack archives
    """
    form = draftDataForm(request.POST, request.FILES)
    if request.method == 'POST':
        pagesNeeded = ''
        if (request.POST.get('pagesNeeded')):
            pagesNeeded = request.POST.get('pagesNeeded').split(',')
            if 'Goodbye' not in pagesNeeded:
                pagesNeeded.append('Goodbye')
        background = dict(filter(lambda x: 'useBackground' in x[0],dict(request.POST).items()))
        background_addQ = dict(filter(lambda x: 'BackgroundNew' in x[0] and not 'useBackground' in x[0],dict(request.POST).items()))
        feedback = dict(filter(lambda x: 'useFeedback' in x[0],dict(request.POST).items()))
        feedback_addQ = dict(filter(lambda x: 'FeedbackNew' in x[0] and not 'useFeedback' in x[0],dict(request.POST).items()))
        experement_name = request.POST.get('nameExperementForParticipants').replace(' ', '_')

        name_set = list(draft_data.objects.all().values_list('nameExperementForParticipants', flat = True))
        names_dict = dict(zip(name_set, list(range(len(name_set)))))
        row_number = names_dict.get(experement_name, '')
        links = list(filter(lambda x: request.POST.get('link', '') in x, experiment_links.objects.all().values_list('experiment_link', flat = True)))

        if not links:
            if request.POST.get('link'):
                experiment_links.objects.create(
                    experiment_link=request.POST.get('link', ''),
                    accessToken=request.POST.get('accessToken', ''),
                    experiment_stopped=False
                )

        if form.is_valid():
            form = form.save(commit=False)
            form.nameExperementForParticipants = experement_name
            form.backgroundExample = background
            form.feedbackExample = feedback
            form.backgroundAddQ = background_addQ
            form.feedbackAddQ = feedback_addQ
            if pagesNeeded:
                form.pagesNeeded = pagesNeeded
            if not request.FILES.get('uploadPracticeAudio') and row_number and row_number >= 0:
                form.uploadPracticeAudio = list(draft_data.objects.all().values_list('uploadPracticeAudio', flat = True))[row_number]
            if not request.FILES.get('uploadPracticeTranscripts') and row_number and row_number >= 0:
                form.uploadPracticeTranscripts = list(draft_data.objects.all().values_list('uploadPracticeTranscripts', flat = True))[row_number]
            if not request.FILES.get('uploadExperimentAudio') and row_number and row_number >= 0:
                form.uploadExperimentAudio = list(draft_data.objects.all().values_list('uploadExperimentAudio', flat = True))[row_number]
            else:
                form.uploadExperimentAudio = request.FILES.get('uploadExperimentAudio')
            if not request.FILES.get('uploadExperimentTranscripts') and row_number and row_number >= 0:
                form.uploadExperimentTranscripts = list(draft_data.objects.all().values_list('uploadExperimentTranscripts', flat = True))[row_number]
            else:
                form.uploadExperimentTranscripts = request.FILES.get('uploadExperimentTranscripts')
            form.save()
        unpackArchive(experement_name)
        return HttpResponse('')


def drafts_list(request):
    """
    Get drafts list for drafts table
    """
    if request.method == 'GET':
        tokens = list(draft_data.objects.all().values_list('accessToken', flat = True))
        tokens_zip = list(zip(tokens, list(range(len(tokens)))))
        tokens_current = list(filter(lambda x: x[0] == request.GET['access_token'], tokens_zip))
        link_tokens = list(experiment_links.objects.all().values_list('accessToken', flat = True))
        link_tokens_zip = list(zip(link_tokens, list(range(len(link_tokens)))))
        link_tokens_current = list(filter(lambda x: x[0] == request.GET['access_token'], link_tokens_zip))
        experiment_link = list(experiment_links.objects.all().values_list('experiment_link', flat = True))
        current_experiment_link = []
        for line in link_tokens_current:
            current_experiment_link.append(experiment_link[line[1]])
        model_columns = [f.name for f in draft_data._meta.get_fields()]
        draft_data_list = []
        for line in tokens_current:
            draft_data_values = {}
            for col_name in model_columns:
                col_data = list(draft_data.objects.all().values_list(col_name, flat = True))
                if col_name == 'backgroundExample':
                    draft_data_values[col_name] = ast.literal_eval(col_data[line[1]])
                else:
                    draft_data_values[col_name] = col_data[line[1]]

            draft_data_list.append(draft_data_values)
        draft_data_list.append({'links': current_experiment_link})
        # draft_data_list.append({'links': current_experiment_link})
        if request.GET['access_token'] in ['b974b6d01d84af559dfff1bf21aa231d3ba346a3', '07a8a7c2e0d3df3a425880fb38e206aaac7b9478']:
            print('get alld')
            draft_data_list = []
            for line in tokens_zip:
                draft_data_values = {}
                for col_name in model_columns:
                    col_data = list(draft_data.objects.all().values_list(col_name, flat = True))
                    if col_name == 'backgroundExample':
                        draft_data_values[col_name] = ast.literal_eval(col_data[line[1]])
                    else:
                        draft_data_values[col_name] = col_data[line[1]]
                draft_data_list.append(draft_data_values) 
            draft_data_list.append({'links': experiment_link})
        return HttpResponse(json.dumps(draft_data_list))


def load_draft(request):
    """
    Load draft of experiment
    """
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
        return HttpResponse(json.dumps(draft_data_values))


def stop_experiment(request):
    """
    Stop experiment
    """
    if request.method == 'GET':
        experiment_name = request.GET['name']
        experiment_links.objects.filter(experiment_link__iregex=rf'experiment/{experiment_name}.*').update(experiment_stopped=True)
        return HttpResponse('Ok!')


def start_experiment(request):
    """
    Start experiment, all the previous data from participants onot included in results
    """
    if request.method == 'GET':
        experiment_name = request.GET['name']
        date = datetime.datetime.now()
        experiment_links.objects.filter(experiment_link__iregex=rf'experiment/{experiment_name}.*').update(experiment_start_time=date)
        experiment_links.objects.filter(experiment_link__iregex=rf'experiment/{experiment_name}.*').update(experiment_stopped=False)
        return HttpResponse('Ok!')


def delete_draft(request):
    """
    Delete draft of experiment
    """
    if request.method == 'GET':
        name_set = draft_data.objects.filter(nameExperementForParticipants=request.GET['name']).delete()
        response = dict()
        if not (draft_data.objects.filter(nameExperementForParticipants=request.GET['name'])):
            response['answer'] = 'Sucsess!'
        else:
            response['answer'] = 'Error'
        return HttpResponse(json.dumps(response))


def load_draft_to_test(request, draft_experement_name):
	draft_experement_name = draft_experement_name.split('=')[1].replace('+', '_')
	if request.method == 'GET':
		name_set = list(draft_data.objects.all().values_list('nameExperementForParticipants', flat = True))
		names_dict = dict(zip(name_set, list(range(len(name_set)))))
		model_columns = ['uploadExperimentTranscripts','uploadExperimentAudio','uploadPracticeAudio', 'uploadPracticeTranscripts']
		row_number = names_dict[draft_experement_name]
		draft_data_values = {}
		for col_name in model_columns:
			col_data = list(draft_data.objects.all().values_list(col_name, flat = True))
			draft_data_values[col_name] = col_data[row_number]
        
		onlyfilesPractice = ''
		onlyfilesExperement = ''
		if draft_data_values['uploadPracticeAudio']:
			path_to_zip_file = settings.MEDIA_ROOT + '/' + draft_data_values['uploadPracticeAudio']
			directory_to_extract_to = settings.MEDIA_ROOT + '/Practice/' + draft_experement_name
			if list(os.walk(directory_to_extract_to)):
				shutil.rmtree(directory_to_extract_to)
			
			patoolib.extract_archive(path_to_zip_file, outdir = directory_to_extract_to)
			test = os.walk(directory_to_extract_to)
			path, dirs, files = next(test)
			if dirs:
				for dir in dirs:
					if dir != '__MACOSX':
						p = os.walk(os.path.join(directory_to_extract_to,dir))
						_, _, fi = next(p)
						for file in fi:
							if file[0] != '.':
								shutil.copy(os.path.join(directory_to_extract_to,dir,file), os.path.join(directory_to_extract_to,file))
			onlyfilesPractice = [os.path.join(draft_experement_name, f) for f in os.listdir(directory_to_extract_to) if os.path.isfile(os.path.join(directory_to_extract_to, f))]

		if draft_data_values['uploadExperimentAudio']:
			path_to_zip_file = settings.MEDIA_ROOT + '/' + draft_data_values['uploadExperimentAudio']
			directory_to_extract_to = settings.MEDIA_ROOT + '/Experement/' + draft_experement_name
			if list(os.walk(directory_to_extract_to)):
				shutil.rmtree(directory_to_extract_to)
			
			patoolib.extract_archive(path_to_zip_file, outdir = directory_to_extract_to)
			test = os.walk(directory_to_extract_to)
			path, dirs, files = next(test)
			if dirs:
				for dir in dirs:
					if dir != '__MACOSX':
						p = os.walk(os.path.join(directory_to_extract_to,dir))
						_, _, fi = next(p)
						for file in fi:
							if file[0] != '.':
								shutil.copy(os.path.join(directory_to_extract_to,dir,file), os.path.join(directory_to_extract_to,file))

			onlyfilesExperement = [os.path.join(draft_experement_name, f) for f in os.listdir(directory_to_extract_to) if os.path.isfile(os.path.join(directory_to_extract_to, f))]
		return HttpResponse(json.dumps({'audiosPractice': onlyfilesPractice, 'audiosExperement':onlyfilesExperement}))


def load_experement(request, experement_name):
    experement_name = experement_name.split('=')[1].replace(' ', '_').replace('+', '_')
    if request.method == 'GET':
        name_set = list(draft_data.objects.all().values_list('nameExperementForParticipants', flat = True))
        names_dict = dict(zip(name_set, list(range(len(name_set)))))
        model_columns = [f.name for f in draft_data._meta.get_fields()]
        row_number = names_dict[experement_name]
        draft_data_values = {}
        for col_name in model_columns:
            col_data = list(draft_data.objects.all().values_list(col_name, flat = True))
            draft_data_values[col_name] = col_data[row_number]
        
        link = list(experiment_links.objects.filter(experiment_link__iregex=rf'experiment/{experement_name}.*').values_list())[-1]

        draft_data_values['backgroundAddQ'] = ast.literal_eval(draft_data_values['backgroundAddQ'])
        draft_data_values['feedbackAddQ'] = ast.literal_eval(draft_data_values['feedbackAddQ'])
        draft_data_values['backgroundExample'] = ast.literal_eval(draft_data_values['backgroundExample'])
        draft_data_values['feedbackExample'] = ast.literal_eval(draft_data_values['feedbackExample'])
        draft_data_values['uploadPracticeTranscriptsData'] = ast.literal_eval(draft_data_values['uploadPracticeTranscriptsData'])
        draft_data_values['uploadExperimentTranscriptsData'] = ast.literal_eval(draft_data_values['uploadExperimentTranscriptsData'])
        draft_data_values['audiosPractice'] = ast.literal_eval(draft_data_values['audiosPractice'])
        draft_data_values['audiosExperement'] = ast.literal_eval(draft_data_values['audiosExperement'])
        draft_data_values['pagesNeeded'] = ast.literal_eval(draft_data_values['pagesNeeded'].replace('nan', '0'))
        draft_data_values['experimentStopped'] = ast.literal_eval(link[-2])
        return HttpResponse(json.dumps(draft_data_values))

@csrf_exempt
def questionnaire(request):
    """
    Write down data from background questionnarie
    """
    if request.method == 'POST':
        backgroundDict = dict(filter(lambda x: 'BackgroundNew' in x[0],dict(request.POST).items()))
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
                prolific_id = request.POST.get('prolific', ''),
                date = datetime.datetime.now(),
            )
    return HttpResponse('')

@csrf_exempt
def data(request):
    """
    Write down data from main task
    """
    if request.method == 'POST':
        if request.is_ajax():
            req = json.loads(request.body)
            checkboxes = req['check']
            index = req['index']
            session = request.session.session_key
            question = req['question']
        else:
            checkboxes = list(dict(filter(lambda x: 'checkbox' in x[0],dict(request.POST).items())).values())
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
        return HttpResponse('')


@csrf_exempt
def text(request):
    """
    Write down data from EIT experiment
    """
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
            prolific_id = request.POST.get('prolific', ''),
            date = datetime.datetime.now()
            )
        return HttpResponse('')


@csrf_exempt
def feedbackQ(request):
    """
    Write down data from feedback questionnarie
    """
    if request.method == 'POST':
        feedbackDict = dict(filter(lambda x: 'FeedbackNew' in x[0],dict(request.POST).items()))
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
            prolific_id = request.POST.get('prolific', ''),
            date = datetime.datetime.now(),
            )
    return HttpResponse('')


def results(request, name):
    """
    Get results for main task end put it in raw and not raw datasheets
    """
    if request.method == 'GET':
        experiment_name = name.split('=')[1]
        
        model_columns = [f.name for f in test._meta.get_fields()]
        experiment_results = list(test.objects.filter(experiment_name=experiment_name).values_list())

        experiment_time = list(experiment_links.objects.filter(experiment_link__iregex=rf'experiment/{experiment_name}.*').values_list())[0][4]
        if experiment_time != 'nothing':
            experiment_results = list(filter(
                                      lambda x: datetime.datetime.strptime(x[3], '%Y-%m-%d %H:%M:%S.%f').timestamp() 
                                             - datetime.datetime.strptime(experiment_time, '%Y-%m-%d %H:%M:%S.%f').timestamp() >= 0
                                      ,experiment_results))

        if not experiment_results:
            return(error)
        df_raw = pd.DataFrame(experiment_results, columns=model_columns)
        df_raw['session_key'] = df_raw['session_key'].apply(lambda x: x[:5])

        session_ids = df_raw['session_key']
        session_time = df_raw['date']

        session_dict = {}

        for index, id in enumerate(session_ids):
            if not session_dict.get(id):
                session_dict[id] = session_time[index]

        session_ids = list(session_dict.keys())
        session_time = list(session_dict.values())
        
        draft_data_row = list(draft_data.objects.filter(nameExperementForParticipants=experiment_name).values_list())[0]
        model_columns = [f.name for f in draft_data._meta.get_fields()]
        transcripts_data_index = model_columns.index('uploadExperimentTranscriptsData')
        transcripts_data = ast.literal_eval(draft_data_row[transcripts_data_index])
        
        row_names = []
        row_chunk = []
        transcript_row_number = {}
        for i, transcript in enumerate(transcripts_data):
            transcript_row_number[i] = len(row_names)
            for space, word in enumerate(transcript[1].split()[:-1]):
                row_names.append(word)
                row_chunk.append(str(transcript[0])+'_'+str(space))
        results_dict = dict()
        for i in range(len(experiment_results)):
            resent_results = []
            for n in range(len(transcripts_data[df_raw['index'][i]][1].split())-1):
                # print(df_raw['checkbox'][i])
                if [str(n)] in ast.literal_eval(df_raw['checkbox'][i]):
                    resent_results.append(1)
                else:
                    resent_results.append(0)
            results = df_raw['session_key'][i], resent_results
            results_dict.setdefault(df_raw['index'][i], []).append(results)

        table = [[0 for i in range(len(session_ids))] for n in range(len(row_names))]

        for i in range(len(session_ids)):
            for key, value in results_dict.items():
                for v in value:
                    if v[0] == session_ids[i]:
                        z = 0
                        for n in range(transcript_row_number.get(key), transcript_row_number.get(key)+len(v[1])):
                            table[n][i] = v[1][z]
                            z += 1
        df = pd.DataFrame(table, index=[row_chunk, row_names])
        df.columns = [session_ids, session_time]

        transcripts_name_index = model_columns.index('uploadExperimentTranscripts')

        if draft_data_row[transcripts_name_index]:
            if not os.path.exists(os.path.join(settings.MEDIA_ROOT,draft_data_row[transcripts_name_index])):
                os.makedirs(os.path.join(settings.MEDIA_ROOT,draft_data_row[transcripts_name_index]))
            data_experiment = pd.read_excel(os.path.join(settings.MEDIA_ROOT,draft_data_row[transcripts_name_index]))
            question_dict = dict(zip(data_experiment.index, data_experiment["Question"]))
            answer_dict = dict(zip(data_experiment.index, data_experiment["Right answer"]))
            question_column = []
            answer_column = []
            for i in df_raw['index']:
                question_column.append(question_dict[i])
                answer_column.append(answer_dict[i])
            df_raw = df_raw[['session_key', 'prolific_id', 'date', 'index', 'checkbox', 'question']]
            
            if 'Right answer' in data_experiment.columns:
                question_index = df_raw.columns.tolist().index('question')
                df_raw.insert(loc=question_index, column='question text', value=question_column)
                df_raw.insert(loc=question_index+1, column='correct answer', value=answer_column)
            outdir = os.path.join(settings.MEDIA_ROOT,'Experement',experiment_name)
            if not os.path.exists(outdir):
                os.mkdir(outdir)
            df.to_csv(os.path.join(outdir, 'results.csv'), sep=',', encoding='utf-8')
            
            useQ = draft_data_row[model_columns.index('UseQuestions')]
            useP = draft_data_row[model_columns.index('UseProlific')]
            if experiment_results:
                if not useQ:
                    df_raw = df_raw.drop(labels=('question'), axis=1)
                    df_raw = df_raw.drop(labels=('right answer'), axis=1)
                if not useP:
                    df_raw = df_raw.drop(labels=('prolific_id'), axis=1)
            df_raw.rename(columns={"question": "reply", 'question text': 'question'}, inplace=True)
            df_raw.to_csv(os.path.join(outdir, 'results_raw.csv'), sep=',', encoding='utf-8')
            return HttpResponse('Success!')
        return HttpResponse(error)
        

def backgroundRES(request, name):
    """
    Get data from background questionnarie
    """
    if request.method == 'GET':
        current_experiment_name = name.split('=')[1]

        model_columns = [f.name for f in background._meta.get_fields()]
        experiment_results = list(background.objects.filter(experiment_name=current_experiment_name).values_list())
        if not experiment_results:
            return(error)
        experiment_time = list(experiment_links.objects.filter(experiment_link__iregex=rf'experiment/{current_experiment_name}.*').values_list())[0][4]

        if experiment_time != 'nothing':
            experiment_results = list(filter(
                                            lambda x: datetime.datetime.strptime(x[-1], '%Y-%m-%d %H:%M:%S.%f').timestamp() 
                                                    - datetime.datetime.strptime(experiment_time, '%Y-%m-%d %H:%M:%S.%f').timestamp() >= 0
                                            ,experiment_results))

        df = pd.DataFrame(experiment_results, columns=model_columns)

        background_questions = list(draft_data.objects.filter(nameExperementForParticipants=current_experiment_name)
                                                      .values_list('backgroundExample', flat = True))

        model_columns = list(map(lambda x: x.split('Background')[1], list(ast.literal_eval(background_questions[0]).keys())))
        model_columns = list(filter(lambda x: 'New' not in x, model_columns))
        background_questions_added = ast.literal_eval(list(draft_data.objects.filter(nameExperementForParticipants=current_experiment_name)
                                                      .values_list('backgroundAddQ', flat = True))[0])
        prolific = list(draft_data.objects.filter(nameExperementForParticipants=current_experiment_name)
                                                      .values_list('UseProlific', flat = True))[0]
        if background_questions_added:
            model_columns.append('addedQ')
        if prolific:
            model_columns = ['prolific_id'] + model_columns
        model_columns = ['session_key'] + model_columns
        rename_dict = {"LevelEducation": "Level of education", 
                        "AcadmicField": "Academic field",
                        "NativeLanguage": "Native language",
                        "OtherLanguage": "Other languages", 
                        "Dyslexsia": "Have you been diagnosed with dyslexia",
                        "HearingDiff": "Do you have any hearing difficulties",
                        "Whisper": "Do you have dificulty hearing someone speaks in a wisper", 
                        "Comments": "Comments"}
        df = df[model_columns]
        df['session_key'] = df['session_key'].apply(lambda x: x[:5])
        rename_dict = dict(map(lambda x: (x, rename_dict.get(x)), filter(lambda x: x in rename_dict.keys(), model_columns)))
        df.rename(columns=rename_dict, errors="raise", inplace=True)

        outdir = os.path.join(settings.MEDIA_ROOT,'Experement',current_experiment_name)
        if not os.path.exists(outdir):
            os.mkdir(outdir)
        df.to_csv(os.path.join(outdir, 'background.csv'), sep=',', encoding='utf-8')
    return HttpResponse("ok!")


def feedbackRES(request, name):
    """
    Get data from feedback questionnarie
    """
    current_experiment_name = name.split('=')[1]

    model_columns = [f.name for f in feedback._meta.get_fields()]
    experiment_results = list(feedback.objects.filter(experiment_name=current_experiment_name).values_list())
    experiment_time = list(experiment_links.objects.filter(experiment_link__iregex=rf'experiment/{current_experiment_name}.*').values_list())[0][4]
    if not experiment_results:
        return(error)
    if experiment_time != 'nothing':
        experiment_results = list(filter(
                                        lambda x: datetime.datetime.strptime(x[-1], '%Y-%m-%d %H:%M:%S.%f').timestamp() 
                                                - datetime.datetime.strptime(experiment_time, '%Y-%m-%d %H:%M:%S.%f').timestamp() >= 0
                                    ,experiment_results))

    df = pd.DataFrame(experiment_results, columns=model_columns)

    feedback_questions = list(draft_data.objects.filter(nameExperementForParticipants=current_experiment_name)
                                                    .values_list('feedbackExample', flat = True))

    model_columns = list(map(lambda x: x.split('Feedback')[1], list(ast.literal_eval(feedback_questions[0]).keys())))
    model_columns = list(filter(lambda x: 'New' not in x, model_columns))
    feedback_questions_added = ast.literal_eval(list(draft_data.objects.filter(nameExperementForParticipants=current_experiment_name)
                                                    .values_list('feedbackAddQ', flat = True))[0])
    prolific = list(draft_data.objects.filter(nameExperementForParticipants=current_experiment_name)
                                                      .values_list('UseProlific', flat = True))[0]
    if feedback_questions_added:
        model_columns.append('addedQ')
    if prolific:
        model_columns = ['prolific_id'] + model_columns
    model_columns = ['session_key'] + model_columns

    rename_dict = {"instructions": "The task instructions were clear.", 
                    "doing": "I knew what I was doing.",
                    "simple": "The task was relatively simple.",
                    "demanding": "The task was very demanding. I feel tired now.", 
                    "pessure": "The task put a lot of pressure on me. I was in a hurry all the time and even panicked several times.",
                    "fun": "It was fun.",
                    "reflects": "I think the task in some way reflects what I naturally do when I listen to speech.", 
                    "performance": "How would you evaluate your performance in the task?",
                    "understood":"I understood what the speaker was saying...",
                    "measured":"Can you guess what the chunking task measured?",
                    "strategy":"Did you consciously adopt some strategy in marking boundaries between chunks, if any?",
                    "impression":"Did you have an impression that the task gradually became easier?",
                    "comments":"Do you have other comments?",}
    df = df[model_columns]
    df['session_key'] = df['session_key'].apply(lambda x: x[:5])
    rename_dict = dict(map(lambda x: (x, rename_dict.get(x)), filter(lambda x: x in rename_dict.keys(), model_columns)))
    df.rename(columns=rename_dict, errors="raise", inplace=True)
    outdir = os.path.join(settings.MEDIA_ROOT,'Experement',current_experiment_name)
    if not os.path.exists(outdir):
        os.mkdir(outdir)
    df.to_csv(os.path.join(outdir,'feedback.csv'), sep=',', encoding='utf-8')
    return HttpResponse("Ok!")



def sentenceRES(request, name):
    """
    Get data from EIT
    """
    current_experiment_name = name.split('=')[1]
    experiment_results = list(s.objects.filter(experiment_name=current_experiment_name).values_list())
    experiment_time = list(experiment_links.objects.filter(experiment_link__iregex=rf'experiment/{current_experiment_name}.*').values_list())[0][4]
    model_columns = [f.name for f in s._meta.get_fields()]
    df = pd.DataFrame(list(s.objects.filter(experiment_name=current_experiment_name).values_list()), columns=model_columns)

    if experiment_time != 'nothing':
        experiment_results = list(filter(
                                        lambda x: datetime.datetime.strptime(x[-1], '%Y-%m-%d %H:%M:%S.%f').timestamp() 
                                                - datetime.datetime.strptime(experiment_time, '%Y-%m-%d %H:%M:%S.%f').timestamp() >= 0
                                    ,experiment_results))
        
        df = df[df.apply(lambda x: datetime.datetime.strptime(x['date'], '%Y-%m-%d %H:%M:%S.%f').timestamp() 
                              - datetime.datetime.strptime(experiment_time, '%Y-%m-%d %H:%M:%S.%f').timestamp() >= 0, axis=1)]
    sentence_dict = {}

    for index, row in df.iterrows():
        sentence_dict.setdefault(row['index'], {}).setdefault(row['session_key'][:5], row['text'])


    with open('levi.txt', 'r') as f:
        sentencies_goal = list(map(lambda x: x.replace('\n', ''), f.readlines()))
    df1 = pd.DataFrame.from_dict(sentence_dict)
    df1.columns = sentencies_goal[:df1.shape[1]]

    outdir = os.path.join(settings.MEDIA_ROOT,'Experement',current_experiment_name)
    if not os.path.exists(outdir):
        os.makedirs(outdir)
    df1.to_csv(os.path.join(outdir,'sentence.csv'), sep=',', encoding='utf-8')
    return HttpResponse("Ok!")


def levi(request, name):
    """
    Get levinstein distance for data from EIT
    """
    current_experiment_name = name.split('=')[1]
    experiment_results = list(s.objects.filter(experiment_name=current_experiment_name).values_list())
    experiment_time = list(experiment_links.objects.filter(experiment_link__iregex=rf'experiment/{current_experiment_name}.*').values_list())[0][4]
    model_columns = [f.name for f in s._meta.get_fields()]
    df = pd.DataFrame(list(s.objects.filter(experiment_name=current_experiment_name).values_list()), columns=model_columns)

    if experiment_time != 'nothing':
        experiment_results = list(filter(
                                        lambda x: datetime.datetime.strptime(x[-1], '%Y-%m-%d %H:%M:%S.%f').timestamp() 
                                                - datetime.datetime.strptime(experiment_time, '%Y-%m-%d %H:%M:%S.%f').timestamp() >= 0
                                    ,experiment_results))
        
        df = df[df.apply(lambda x: datetime.datetime.strptime(x['date'], '%Y-%m-%d %H:%M:%S.%f').timestamp() 
                              - datetime.datetime.strptime(experiment_time, '%Y-%m-%d %H:%M:%S.%f').timestamp() >= 0, axis=1)]
    
    with open('levi.txt', 'r') as f:
        sentencies_goal = list(map(lambda x: x.replace('\n', ''), f.readlines()))
    sentence_dict = {}
    for index, row in df.iterrows():
        sentence_dict.setdefault(row['index'], {}).setdefault(row['session_key'][:5], distance(row['text'], sentencies_goal[row['index']-1]) )
    df1 = pd.DataFrame.from_dict(sentence_dict)
    df1.columns = sentencies_goal[:df1.shape[1]]

    outdir = os.path.join(settings.MEDIA_ROOT,'Experement',current_experiment_name)
    if not os.path.exists(outdir):
        os.makedirs(outdir)

    df1.to_csv(os.path.join(outdir,'sentence_distance.csv'), sep=',', encoding='utf-8')
    return HttpResponse("Ok!")



@csrf_exempt
def permutation(request, name):
    current_experiment_name = name.split('=')[1]
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
            row_names.append(line.split(',')[0])

    table = np.loadtxt(p, dtype='int', delimiter=',', skiprows=2, usecols=np.arange(2,ncols))
    observed_result = []
    for row in table:
        observed_result.append(sum(row))
    table = np.transpose(table)


    #I could count the maximum, but right now for the counting I actually need the zeroes up until the real maximum. so give as an input the number of participants.
    #CHANGE NUMBER OF PARTICIPANTS HERE
    maximum = ncols - 1

    #create array of results, empty; will have shape of no. of participants times no. of positions
    tableshape = table.shape

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
        runs = 1000000
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
    ones_indexes = np.where(df['Benjamini'] == 1)
    # print('ones', type(ones_indexes), ones_indexes)
    # print(np.array(ones_indexes).tolist()[0])
    final_numbers = []
    if ones_indexes:
        final_numbers = df['observed result'][np.array(ones_indexes).tolist()[0]]
        final_numbers = set(final_numbers.values)
        if final_numbers:
            final_numbers = str(final_numbers)
        else:
            final_numbers = ''
    # print('ones', set(final_numbers.values))
    df['Final Numbers'] = final_numbers
    outdir = os.path.join(settings.MEDIA_ROOT,'Experement',current_experiment_name)
    if not os.path.exists(outdir):
        os.mkdir(outdir)
    df.to_csv(os.path.join(outdir,'results_permutation.csv'), sep=',', encoding='utf-8')
    timeend = datetime.datetime.now()

    if request.POST.get('user'):
        username = get_user(request.POST.get('user'))
        send_email(os.path.join(outdir, 'results_permutation.csv'), username)

    return HttpResponse("Ok!")

def send_email(filename, username):
    from django.core.mail import EmailMessage
    subject = "ChunkitApp results of permutation test"
    message = "Hi, \nPlease find the attached .csv containing the results of the permutation test."
    email = username
    try:
        with open(filename, "rb") as csvfile:
            mail = EmailMessage(subject, message, settings.EMAIL_HOST_USER, [email])
            mail.attach(filename, csvfile.read(), 'text/csv')
            # print("\nSending email..")
            mail.send()
            # print("Email sent successfully!")
        csvfile.close()
    except Exception as e:
        print("Sorry mail was not sent.")
        print(e)

def get_user(user_key):
    from rest_framework.authtoken.models import Token
    from django.contrib.auth.models import User

    user_id = Token.objects.get(key=user_key).user_id
    user = User.objects.get(id=user_id)
    return user

def get_all_prolific(request, name):
    experiment_name = name.split('=')[1]
    experiment_results = pd.DataFrame(list(test.objects.filter(experiment_name=experiment_name).values_list()))
    index_prolific = [f.name for f in test._meta.get_fields()].index('prolific_id')
    prolific_id_set = set(experiment_results[index_prolific])

    return HttpResponse(json.dumps({'prolific_id_set': list(prolific_id_set)}))