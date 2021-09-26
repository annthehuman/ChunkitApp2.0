from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.
from django.contrib.sessions.models import Session

class experement_data(models.Model):
	name = models.TextField(default='')
	number = models.IntegerField()
	sentences = models.CharField(max_length=3)
	questions = models.CharField(max_length=3)
	prolific = models.CharField(max_length=3)


class background(models.Model):
	man = 'Male'
	woman = 'Female'
	other = 'Other'
	gender_choices = (
		(man, 'Male'),
		(woman, 'Female'),
		(other, 'Other'),
		)
	primary = 'Primary school'
	low_sec = 'Lower secondary school'
	upper_sec = 'Upper secondary school, upper secondary school graduate, or vocational education graduate'
	polytech = 'Polytechnic degree'	
	bachelor = 'University degree: BA or equivalent'
	master = 'University degree: MA or equivalent'
	ph_d = 'University degree: Ph.D. or equivalent'
	none = ''
	education_choices = (
		(primary, 'Primary school'),
		(low_sec, 'Lower secondary school'),
		(upper_sec, 'Upper secondary school, upper secondary school graduate, or vocational education graduate'),
		(polytech, 'Polytechnic degree'	),
		(bachelor, 'University degree: BA or equivalent'),
		(master, 'University degree: MA or equivalent'),
		(ph_d, 'University degree: Ph.D. or equivalent'),
		)
	yes = 'Yes'
	no = 'No'
	yes_no = (
		(yes, 'Yes'),
		(no, 'No'),
		)
	session_key = models.CharField(max_length=40)
	age = models.IntegerField(validators=[MaxValueValidator(100), MinValueValidator(1)])
	sex = models.CharField(max_length=6, choices=gender_choices)
	education = models.CharField(max_length=1000, choices=education_choices)
	major = models.TextField(max_length=1000, default="none")
	native_language = models.TextField(default='nothing')
	other_language = models.TextField(default='nothing')
	dyslexia = models.CharField(max_length=3, choices=yes_no)
	hearing_diff = models.CharField(max_length=3, choices=yes_no)
	whisper = models.CharField(max_length=3, choices=yes_no)
	comments = models.TextField(default='nothing')

class feedback(models.Model):
	str_disagree ='Strongly disagree'
	disagree ='Disagree'
	neither ='Neutral'
	agree ='Agree'
	str_disagree ='Strongly agree'	
	opinion_choices = (
		(str_disagree, 'Strongly disagree'),
		(disagree, 'Disagree'),
		(neither, 'Neutral'),
		(agree, 'Agree'),
		(str_disagree, 'Strongly agree'),	
		)
	bad ='Poor'
	ok ='Satisfactory'
	good ='Good'
	vgood ='Very good'
	performance_choices = (
		(bad, 'Poor'),
		(ok, 'Satisfactory'),
		(good, 'Good'),
		(vgood, 'Very good'),
		)
	all_the_time = 'All the time'
	most_of_the_time = 'Most of the time'
	some_time = 'Some of the time'
	very_little_time = 'Very little time'
	not_at_all = 'Not at all'
	understanding_choices = (
		(all_the_time, 'all the time'),
		(most_of_the_time, 'most of the time'),
		(some_time, 'some of the time'),
		(very_little_time, 'very little time'),
		(not_at_all, 'not at all'),
		)
	session_key = models.CharField(max_length=40)
	instructions = models.CharField(max_length=25, choices=opinion_choices)
	doing = models.CharField(max_length=25, choices=opinion_choices)
	simple = models.CharField(max_length=25, choices=opinion_choices)
	demanding = models.CharField(max_length=25, choices=opinion_choices)
	pessure = models.CharField(max_length=25, choices=opinion_choices)
	fun = models.CharField(max_length=25, choices=opinion_choices)
	reflects = models.CharField(max_length=25, choices=opinion_choices)
	performance = models.CharField(max_length=25, choices=performance_choices)
	understood = models.CharField(max_length=25, choices=understanding_choices)
	measured = models.TextField(default='nothing')
	strategy = models.TextField(default='nothing')
	impression = models.TextField(default='nothing')
	comments = models.TextField(default='nothing') 

class sentence(models.Model):
	text = models.TextField(default='nothing')
	index = models.IntegerField()
	session_key = models.CharField(max_length=40)

class test(models.Model):
	session_key = models.CharField(max_length=40)
	checkbox = models.TextField(default='nothing')
	index = models.IntegerField()
	question = models.CharField(max_length=10)

class sessions(models.Model):
	session_id = models.CharField(max_length=40)
	session_key = models.TextField(default='nothing')
	ip = models.CharField(max_length=400)
	published_date = models.DateTimeField(blank=True, null=True)
	prolific_id = models.CharField(max_length=100)
	study_id = models.CharField(max_length=100)