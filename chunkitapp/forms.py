from django import forms
from .models import background, feedback, sentence, experement_data, draft_data


class draftDataForm(forms.ModelForm):
	accessToken = forms.CharField(required=False)
	newField = forms.CharField(required=False)
	sessionTime = forms.IntegerField(required=False)
	nameExperement = forms.CharField(required=False)
	nameExperementForParticipants = forms.CharField(required=False)
	shuffleExtracts = forms.CharField(required=False)
	shuffleExtractsPractice = forms.CharField(required=False)
	ImitationTask = forms.BooleanField(required=False)
	UseQuestions = forms.BooleanField(required=False)
	UseProlific = forms.BooleanField(required=False)
	linkToProlific = forms.CharField(required=False)
	helloEditor = forms.CharField(required=False)
	consentEditor = forms.CharField(required=False)
	outlineEditor = forms.CharField(required=False)
	backgroundExample = forms.CharField(required=False)
	backgroundAddQ = forms.CharField(required=False)
	feedbackExample = forms.CharField(required=False)
	feedbackAddQ = forms.CharField(required=False)
	goodbyeEditor = forms.CharField(required=False)
	uploadPracticeAudio = forms.FileField(required=False)
	uploadPracticeTranscripts = forms.FileField(required=False)
	uploadExperementAudio = forms.FileField(required=False)
	uploadExperementTranscripts = forms.FileField(required=False)
	experimentInstructions = forms.CharField(required=False)
	practiceInstructions = forms.CharField(required=False)
	audiosPractice = forms.CharField(required=False)
	audiosExperement = forms.CharField(required=False)
	uploadPracticeTranscriptsData = forms.CharField(required=False)
	uploadExperimentTranscriptsData = forms.CharField(required=False)

	class Meta:
		model = draft_data
		fields = ('accessToken', 'newField', 'nameExperement', 'shuffleExtracts', 'shuffleExtractsPractice', 'ImitationTask',\
			 'UseQuestions', 'UseProlific', 'linkToProlific', 'helloEditor',\
			 'consentEditor', 'outlineEditor', 'backgroundExample', 'backgroundAddQ',\
			  'feedbackExample', 'feedbackAddQ', 'goodbyeEditor', 'uploadPracticeAudio', 'uploadPracticeTranscripts',\
				  'uploadExperementTranscripts', 'uploadExperementAudio', 'nameExperementForParticipants',\
					  'practiceInstructions', 'experimentInstructions', 'audiosPractice', 'audiosExperement',\
						  'uploadPracticeTranscriptsData', 'uploadExperimentTranscriptsData', 'sessionTime')


class experementDataForm(forms.ModelForm):
	sentences = forms.CharField(required=False)
	questions = forms.CharField(required=False)
	prolific = forms.CharField(required=False)
	class Meta:
		model = experement_data
		fields = ('number', 'name', 'sentences', 'questions', 'prolific',)

class checkboxfield(forms.Form):
	check_box = forms.BooleanField(required=False)


class backgroundForm(forms.ModelForm):
	session_key = forms.CharField(max_length=40)
	Age = forms.IntegerField(required=False)
	Gender = forms.CharField(required=False)
	LevelEducation = forms.CharField(required=False)
	AcadmicField = forms.CharField(required=False)
	NativeLanguage = forms.CharField(required=False)
	OtherLanguage = forms.CharField(required=False)
	Dyslexsia = forms.CharField(required=False)
	HearingDiff = forms.CharField(required=False)
	Whisper = forms.CharField(required=False)
	Comments = forms.CharField(required=False)
	addedQ = forms.CharField(required=False)
	prolific_id = forms.CharField(required=False)

	class Meta:
		model = background
		fields = ('Age', 'Gender', 'LevelEducation', 'AcadmicField', 'NativeLanguage', 'OtherLanguage', \
			'Dyslexsia', 'HearingDiff', 'Whisper', 'Comments','addedQ', 'prolific_id')


class feedbackForm(forms.ModelForm):
	instructions = forms.CharField(required=False)
	doing = forms.CharField(required=False)
	simple = forms.CharField(required=False)
	demanding = forms.CharField(required=False)
	pessure = forms.CharField(required=False)
	fun = forms.CharField(required=False)
	reflects = forms.CharField(required=False)
	performance = forms.CharField(required=False)
	understood = forms.CharField(required=False)	
	measured = forms.CharField(required=False)
	strategy = forms.CharField(required=False)
	impression = forms.CharField(required=False)
	comments = forms.CharField(required=False)
	addedQ = forms.CharField(required=False)
	prolific_id = forms.CharField(required=False)

	class Meta:
		model = feedback
		fields = ('instructions', 'doing', 'simple', 'demanding', 'pessure',\
			'fun', 'reflects', 'performance', 'understood', 'measured', 'strategy',\
			'impression', 'comments', 'addedQ', 'prolific_id')

class sentenceForm(forms.ModelForm):
	text = forms.CharField(widget=forms.Textarea(attrs={'readonly':'readonly'}))
	prolific_id = forms.CharField(required=False)
	class Meta:
		model = sentence
		fields = ('text', 'prolific_id')