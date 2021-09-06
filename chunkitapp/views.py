from django.shortcuts import render, redirect
from django.urls import reverse
from .forms import checkboxfield
from django.http import HttpResponse
from .models import background, feedback, test, sessions
from .models import experement_data as ex_data_model
from .models import sentence as s
from .forms import backgroundForm, feedbackForm, sentenceForm, experementDataForm
import uuid
import random
from django.contrib.sessions.models import Session
from operator import itemgetter
import csv
import os
from django.utils import timezone
import datetime


from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, generics

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .serializers import *



class ExperementDataApi(generics.ListCreateAPIView):
	queryset = experement_data.objects.all()
	serializer_class = ExperementDataSerializer

@api_view(['GET', 'POST'])
def experement_data(request):
	form = experementDataForm(request.POST)
	if request.method == 'POST':
		print(form)
		if form.is_valid():
			form.save()
			text_from_user_list = list(ex_data_model.objects.all().values_list('name', flat = True))
			print(list(ex_data_model.objects.all().values_list()))
		return redirect('noprolificid')

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
			# 	for i in sessions.objects.filter(ip=str(ip)):
			# 		#print(i.ip)
			# 	#print('IP found')

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

def questionnaire(request):
	form = backgroundForm(request.POST)
	if request.method == 'POST':
		if form.is_valid():
			newanswer = form.save(commit=False)
			newanswer.session_key = request.session.session_key
			newanswer.save()
			return redirect('training1')
	return render(request, 'experiment/questionnaire.html', {'form': form})

import json
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
			checkboxes = request.POST.getlist('check')
			#print(checkboxes)
			index = request.POST['index']
			session = request.session.session_key
			question = request.POST['question']
		test.objects.create(
			session_key = session,
			checkbox = checkboxes,
			index = index,
			question = question
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

@api_view(['GET', 'POST'])
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

def text(request):
	if request.method == 'POST':
		if request.is_ajax():
			req = json.loads(request.body)
			#print(checkboxes)
			index = req['index']
			session = request.session.session_key
			text = req['text']
		else:
			session = request.session.session_key
			index = request.POST['index']
			text = request.POST['text']
		s.objects.create(
			session_key = session,
			text = text,
			index = index,
			)
		# print(request.POST)
		return HttpResponse('')

def feedbackQ(request):
	form = feedbackForm(request.POST)
	if request.method == 'POST':
		if form.is_valid():
			newanswer = form.save(commit=False)
			newanswer.session_key = request.session.session_key
			newanswer.save()
			return redirect('end')
	return render(request, 'experiment/feedback.html', {'form': form})

def end(request):
	return render(request, 'experiment/end.html', {})

from functools import reduce

def results(request):
	f_texts = open('texts.txt', 'r')
	texts = [[0 for i in range(0, 3)] for n in range (0, 53)]
	ii = 0
	for line in f_texts:
		n = line.split()
		texts[ii][0] = int(n[0])
		texts[ii][1] = n[1]
		texts[ii][2] = int(n[2])
		ii += 1

	f_texts.close()
	text_from_user_list = list(test.objects.all().values_list('index', flat = True))

	session_list = list(test.objects.all().values_list('session_key', flat = True))
	session_dict = dict.fromkeys(session_list, None)

	session_time = list(sessions.objects.all().values_list('published_date', flat = True))
	session_key_time = list(sessions.objects.all().values_list('session_key', flat = True))
	prolific_id = list(sessions.objects.all().values_list('session_id', flat = True))
	time = list(zip(session_time, session_key_time, prolific_id))

	checkboxes = list(test.objects.all().values_list('checkbox', flat = True))
	check = list(map(lambda x: x.replace("'", "").replace('[', '').replace(']', '').split(','), checkboxes))
	check_list = []
	for i in check:
		ints = []
		for n in i:
			if n != '':
				n = int(n)
			ints.append(n)
		check_list.append(ints)
	text_session_checkbox_zip = list(zip(text_from_user_list, session_list, check_list))




	#make dictionary with {number of text: [[session, checkboxes], [session, checkboxes]]}
	results_dict = dict()
	for i in range(len(text_from_user_list)):
		resent_results = []
		for n in range (texts[text_from_user_list[i]-1][2]):
			if n in check_list[i]:
				resent_results.append(1)
			else:
				resent_results.append(0)
		results = session_list[i], resent_results
		results_dict.setdefault(text_from_user_list[i], []).append(results)
		
	#count length of table in strings
	table_string_length = 0
	for i in range(len(results_dict.keys())):
		table_string_length += texts[list(results_dict.keys())[i]-1][2]
	texts_lists_table = []
	length = 0
	#count length of table in columns
	table_column_length = len(session_dict)
	table = [[0 for i in range(table_column_length+1)] for n in range(table_string_length+3)]

	table[0][0] = ()
	table[1][0] = ()
	table[2][0] = ()
	#fill in names of columns
	#fill in sessions start time
	for n in range(1, table_column_length+1):
		table[0][n] = list(session_dict.keys())[n-1]
		for i in range(len(time)):
			##print(table[0][n], time[i][1])
			if time[i][1] == table[0][n] and type(time[i][0]) != type(None):
				##print(type(time[i][0]), 1)
				table[1][n] = time[i][0].strftime("%m-%d-%Y\n%H:%M:%S") 
				table[2][n] = time[i][2]

	#fill in main table; text_number  == text_id-1
	i = 3
	for text_id in range(len(list(results_dict.keys()))):
		text_number = list(results_dict.keys())[text_id]-1
		##print(len(list(results_dict.values())[text_id]), results_dict[text_number+1][0][1])
		text_lists_table = []
		for j in range(texts[text_number][2]):
			table[i][0] = list(results_dict.keys())[text_id], str(texts[text_number][1].replace('.wav', '')), j+1
			for n in range(1, table_column_length+1):
				for res in range(len(results_dict[text_number+1])):
					##print(table[0][n], list(results_dict.values())[j][res][0])
					if table[0][n] == results_dict[text_number+1][res][0]:
						table[i][n] = results_dict[text_number+1][res][1][j]

			i += 1



	# sort table by name of text

	##print(len(table))

	table = sorted(table, key=lambda x: x[0])
	table[0][0] = 'session'
	table[1][0] = 'session sart time'
	table[2][0] = 'prolific id'
	for n in range(1, table_column_length+1):
		table[0][n] = table[0][n][:5]
	l = (table_string_length+1)
	w = (table_column_length+1)

	# save table to csv
	with open(os.path.join('experiment/static/', 'out.csv'), 'w', newline='') as of:
		wRt = csv.writer(of)
		wRt.writerows(table)
	if len(table) <= 3:
		data = 'No data'
	else:
		data = ''

	return render(request, 'experiment/results.html', {'o': table, 'length': l, 'width': w, 'data': data})


def questions(request):
	question_list = list(test.objects.all().values_list('question', flat = True))
	session_list = list(test.objects.all().values_list('session_key', flat = True))
	session_dict = dict.fromkeys(session_list, None)
	text_from_user_list = list(test.objects.all().values_list('index', flat = True))
	quests = [[0 for i in range(2)] for j in range(53)]
	ii = 0
	with open('quest.txt', 'r') as questions:
		for line in questions:
			#print(line)
			line = line.split() 
			quests[ii][0] = line[0]
			quests[ii][1] = ' '.join(line[1:])
			ii += 1


	question_table = [[0 for i in range(len(session_dict)+1)] for j in range(54)]

	for i in range(1, len(session_dict)+1):
		question_table[0][i] = list(session_dict.keys())[i-1]

	for i in range(1, 54):
		question_table[i][0] = quests[i-1]


	for i in range(len(session_list)):
		for j in range(len(session_dict)+1):
			if session_list[i] == question_table[0][j]:
				##print(session_list[i])
				for k in range(1,len(question_table)):
					##print(question_table[k][j])
					if int(question_table[k][0][0]) == int(text_from_user_list[i]):
						question_table[k][j] = question_list[i]
	for n in range(1, len(session_dict)+1):
		question_table[0][n] = question_table[0][n][:5]

	import re
	question_table[0][0] =''
	for n in range(1, len(question_table)):
		question_table[n][0] = re.sub(r"[\[\]'\"]", '', str(question_table[n][0]))
	with open(os.path.join('experiment/static/', 'questions.csv'), 'w', newline='') as of:
		wRt = csv.writer(of)
		wRt.writerows(question_table)
	return render(request, 'experiment/questions.html', {'question' : question_table})

def backgroundRES(request):
	try:
		table = background.objects.all().values()
		table_list = []
		#table.append()
		for tab in table:
			table_list.append(list(tab.values()))
		tab_keys = list(tab.keys())
		background_table = [[0 for i in range(len(tab_keys))] for j in range(len(table_list)+1)]
		for n in range(len(tab_keys)):
			background_table[0][n] = tab_keys[n]
			for k in range(1, len(table_list)+1):
				background_table[k][n] = table_list[k-1][n]
		for k in range(1, len(table_list)+1):
			background_table[k][1] = background_table[k][1][:5]
		with open(os.path.join('experiment/static/', 'background.csv'), 'w', newline='') as of:
			wRt = csv.writer(of)
			wRt.writerows(background_table)	
		no_data = ''
	except:
		background_table = ''
		no_data = 'No data'
	return render(request, 'experiment/background_results.html', {'table': background_table, 'data': no_data})

def feedbackRES(request):
	try:
		table = feedback.objects.all().values()
		table_list = []
		#table.append()
		for tab in table:
			table_list.append(list(tab.values()))
		tab_keys = list(tab.keys())
		feedback_table = [[0 for i in range(len(tab_keys))] for j in range(len(table_list)+1)]
		for n in range(len(tab_keys)):
			feedback_table[0][n] = tab_keys[n]
			for k in range(1, len(table_list)+1):
				feedback_table[k][n] = table_list[k-1][n]
		for k in range(1, len(table_list)+1):
			feedback_table[k][1] = feedback_table[k][1][:5]
		with open(os.path.join('experiment/static/', 'feedback.csv'), 'w', newline='') as of:
			wRt = csv.writer(of)
			wRt.writerows(feedback_table)	
		no_data = ''
	except:
		feedback_table = ''
		no_data = 'No data'
	return render(request, 'experiment/feedback_results.html', {'table': feedback_table, 'data': no_data})



def sentenceRES(request):
	try:
		session_key = list(map(lambda x: x[:5], s.objects.all().values_list('session_key', flat = True)))
		sentence = list(s.objects.all().values_list('text', flat = True))
		sentence_number = list(s.objects.all().values_list('index', flat = True))
		first_row = [('session key', 'sentence number', 'sentence')]
		sentence_table = first_row + list(zip(session_key, sentence_number, sentence))
		# for k in range(0, len(session_key)):
		# 	# #print(session_key[k][:5])
		no_data = ''
		with open(os.path.join('experiment/static/', 'sentence.csv'), 'w', newline='') as of:
			wRt = csv.writer(of)
			wRt.writerows(sentence_table)
		# #print(sentence_table)
	except:
		sentence_table = ''
		no_data = 'No data'
	return render(request, 'experiment/sentence_results.html', {'table': sentence_table, 'data': no_data})

