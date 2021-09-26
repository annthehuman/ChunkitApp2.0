from django import forms
from .models import background, feedback, sentence, experement_data

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
	yes = 'Yes'
	no = 'No'
	yes_no = (
		(yes, 'Yes'),
		(no, 'No'),
		)
	comments = forms.CharField(widget=forms.Textarea(), required=False)
	other_language = forms.CharField(widget=forms.Textarea(), required=False)
	dyslexia = forms.CharField(widget=forms.RadioSelect(choices=yes_no))
	hearing_diff = forms.CharField(widget=forms.RadioSelect(choices=yes_no))
	whisper = forms.CharField(widget=forms.RadioSelect(choices=yes_no))

	class Meta:
		model = background
		fields = ('age', 'sex', 'education', 'major', 'native_language', 'other_language', \
			'dyslexia', 'hearing_diff', 'whisper', 'comments',)


class feedbackForm(forms.ModelForm):
	instructions = forms.CharField(widget=forms.RadioSelect(choices=feedback.opinion_choices))
	doing = forms.CharField(widget=forms.RadioSelect(choices=feedback.opinion_choices))
	simple = forms.CharField(widget=forms.RadioSelect(choices=feedback.opinion_choices))
	demanding = forms.CharField(widget=forms.RadioSelect(choices=feedback.opinion_choices))
	pessure = forms.CharField(widget=forms.RadioSelect(choices=feedback.opinion_choices))
	fun = forms.CharField(widget=forms.RadioSelect(choices=feedback.opinion_choices))
	reflects = forms.CharField(widget=forms.RadioSelect(choices=feedback.opinion_choices))
	performance = forms.CharField(widget=forms.RadioSelect(choices=feedback.performance_choices))
	understood = forms.CharField(widget=forms.RadioSelect(choices=feedback.understanding_choices))	
	measured = forms.CharField(widget=forms.Textarea(), required=False)
	strategy = forms.CharField(widget=forms.Textarea(), required=False)
	impression = forms.CharField(widget=forms.Textarea(), required=False)
	comments = forms.CharField(widget=forms.Textarea(), required=False)
	class Meta:
		model = feedback
		fields = ('instructions', 'doing', 'simple', 'demanding', 'pessure',\
			'fun', 'reflects', 'performance', 'understood', 'measured', 'strategy',\
			'impression', 'comments',)

class sentenceForm(forms.ModelForm):
	text = forms.CharField(widget=forms.Textarea(attrs={'readonly':'readonly'}))
	class Meta:
		model = sentence
		fields = ('text',)