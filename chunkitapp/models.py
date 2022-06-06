from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.
from django.contrib.sessions.models import Session

class experiment_links(models.Model):
	experiment_link = models.TextField()
	accessToken = models.TextField()
	experiment_stopped = models.TextField()

class draft_data(models.Model):
	accessToken = models.TextField()
	newField = models.TextField()
	nameExperement = models.TextField()
	shuffleExtracts = models.TextField()
	shuffleExtractsPractice = models.TextField()
	nameExperementForParticipants = models.TextField()
	ImitationTask = models.BooleanField()
	UseQuestions = models.BooleanField()
	UseProlific = models.BooleanField()
	linkToProlific = models.TextField()
	helloEditor = models.TextField()
	consentEditor = models.TextField()
	outlineEditor = models.TextField()
	backgroundExample = models.TextField()
	backgroundAddQ = models.TextField()
	feedbackExample = models.TextField()
	feedbackAddQ = models.TextField()
	goodbyeEditor = models.TextField()
	uploadPracticeAudio = models.FileField()
	uploadPracticeTranscripts = models.FileField()
	uploadExperementAudio = models.FileField()
	uploadExperementTranscripts = models.FileField()
	experimentInstructions = models.TextField()
	practiceInstructions = models.TextField()
	audiosPractice = models.TextField()
	audiosExperement = models.TextField()
	uploadPracticeTranscriptsData = models.TextField()
	uploadExperimentTranscriptsData = models.TextField()
	pagesNeeded = models.TextField(default=['Hello', 'Consent', 'Outline', 
										'Background', 'Practice', 'Experiment', 
										'Imitation', 'Feedback', 'Goodbye'])

class experement_data(models.Model):
	name = models.TextField(default='')
	number = models.IntegerField()
	sentences = models.CharField(max_length=3)
	questions = models.CharField(max_length=3)
	prolific = models.CharField(max_length=3)


class background(models.Model):
	session_key = models.TextField()
	Age = models.TextField()
	Gender = models.TextField()
	LevelEducation = models.TextField()
	AcadmicField = models.TextField()
	NativeLanguage = models.TextField()
	OtherLanguage = models.TextField()
	Dyslexsia = models.TextField()
	HearingDiff = models.TextField()
	Whisper = models.TextField()
	Comments = models.TextField()
	addedQ = models.TextField()
	experiment_name = models.TextField(default='nothing')
	prolific_id = models.CharField(max_length=100)

class feedback(models.Model):
	session_key = models.TextField()
	instructions = models.TextField()
	doing = models.TextField()
	simple = models.TextField()
	demanding = models.TextField()
	pessure = models.TextField()
	fun = models.TextField()
	reflects = models.TextField()
	performance = models.TextField()
	understood = models.TextField()
	measured = models.TextField()
	strategy = models.TextField()
	impression = models.TextField()
	comments = models.TextField()
	addedQ = models.TextField()
	experiment_name = models.TextField(default='nothing')
	prolific_id = models.CharField(max_length=100)

class sentence(models.Model):
	text = models.TextField(default='nothing')
	index = models.IntegerField()
	session_key = models.CharField(max_length=40)
	experiment_name = models.TextField(default='nothing')
	prolific_id = models.CharField(max_length=100)

class test(models.Model):
	session_key = models.CharField(max_length=40)
	checkbox = models.TextField(default='nothing')
	index = models.IntegerField()
	question = models.CharField(max_length=10)
	experiment_name = models.TextField(default='nothing')
	date = models.TextField(default='nothing')
	prolific_id = models.CharField(max_length=100)

class sessions(models.Model):
	session_id = models.CharField(max_length=40)
	session_key = models.TextField(default='nothing')
	ip = models.CharField(max_length=400)
	published_date = models.DateTimeField(blank=True, null=True)
	prolific_id = models.CharField(max_length=100)
	study_id = models.CharField(max_length=100)