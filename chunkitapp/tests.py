from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient
from .models import (
    draft_data, 
    experiment_links, 
    background, 
    feedback, 
    test, 
    sentence
)
import json
import tempfile
import os
from django.core.files.uploadedfile import SimpleUploadedFile


class UserCreationTests(APITestCase):
    """Test user creation and authentication"""
    
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'TestPassword123!',
        }
    
    def test_create_user(self):
        """Test that a user can be created"""
        user = User.objects.create_user(
            username=self.user_data['username'],
            email=self.user_data['email'],
            password=self.user_data['password']
        )
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'testuser@example.com')
        self.assertTrue(user.check_password('TestPassword123!'))
    
    def test_user_authentication(self):
        """Test that a user can authenticate and get a token"""
        user = User.objects.create_user(
            username=self.user_data['username'],
            email=self.user_data['email'],
            password=self.user_data['password']
        )
        token, created = Token.objects.get_or_create(user=user)
        self.assertIsNotNone(token)
        self.assertTrue(created)
    
    def test_duplicate_username_fails(self):
        """Test that creating a user with duplicate username fails"""
        User.objects.create_user(
            username=self.user_data['username'],
            email=self.user_data['email'],
            password=self.user_data['password']
        )
        with self.assertRaises(Exception):
            User.objects.create_user(
                username=self.user_data['username'],
                email='another@example.com',
                password='AnotherPassword123!'
            )


class ExperimentCreationTests(TestCase):
    """Test experiment creation and management"""
    
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.token = Token.objects.create(user=self.user)
    
    def test_create_experiment_link(self):
        """Test creating an experiment link"""
        experiment_link = experiment_links.objects.create(
            experiment_link='experiment/test_experiment',
            accessToken='test_token_123',
            experiment_stopped='False'
        )
        self.assertEqual(experiment_link.experiment_link, 'experiment/test_experiment')
        self.assertEqual(experiment_link.accessToken, 'test_token_123')
        self.assertEqual(experiment_link.experiment_stopped, 'False')
    
    def test_create_draft_experiment(self):
        """Test creating a draft experiment"""
        draft = draft_data.objects.create(
            accessToken='test_token_123',
            nameExperement='Test Experiment',
            nameExperementForParticipants='test_experiment',
            shuffleExtracts='True',
            shuffleExtractsPractice='True',
            ImitationTask=False,
            UseQuestions=True,
            UseProlific=False,
            linkToProlific='',
            helloEditor='Hello!',
            consentEditor='Please consent',
            outlineEditor='Outline here',
            backgroundExample='{}',
            backgroundAddQ='{}',
            feedbackExample='{}',
            feedbackAddQ='{}',
            goodbyeEditor='Goodbye!',
            experimentInstructions='Do this',
            practiceInstructions='Practice this',
            audiosPractice='[]',
            audiosExperement='[]',
            uploadPracticeTranscriptsData='[]',
            uploadExperimentTranscriptsData='[]',
            sessionTime=90
        )
        self.assertEqual(draft.nameExperement, 'Test Experiment')
        self.assertEqual(draft.nameExperementForParticipants, 'test_experiment')
        self.assertTrue(draft.UseQuestions)
        self.assertFalse(draft.UseProlific)
    
    def test_draft_experiment_default_pages(self):
        """Test that draft experiment has default pages"""
        draft = draft_data.objects.create(
            accessToken='test_token_123',
            nameExperement='Test',
            nameExperementForParticipants='test',
            ImitationTask=False,
            UseQuestions=False,
            UseProlific=False
        )
        # Check that default pagesNeeded is set
        self.assertIsNotNone(draft.pagesNeeded)
    
    def test_stop_experiment(self):
        """Test stopping an experiment"""
        link = experiment_links.objects.create(
            experiment_link='experiment/test_exp',
            accessToken='token123',
            experiment_stopped='False'
        )
        # Update to stop the experiment
        experiment_links.objects.filter(
            experiment_link='experiment/test_exp'
        ).update(experiment_stopped='True')
        
        updated_link = experiment_links.objects.get(
            experiment_link='experiment/test_exp'
        )
        self.assertEqual(updated_link.experiment_stopped, 'True')


class QuestionnaireTests(TestCase):
    """Test questionnaire data submission"""
    
    def setUp(self):
        self.client = Client()
    
    def test_save_background_questionnaire(self):
        """Test saving background questionnaire data"""
        bg = background.objects.create(
            session_key='test_session_123',
            Age='25-35',
            Gender='Female',
            LevelEducation='Masters',
            AcadmicField='Computer Science',
            NativeLanguage='English',
            OtherLanguage='Spanish',
            Dyslexsia='No',
            HearingDiff='No',
            Whisper='No',
            Comments='No comments',
            addedQ='{}',
            experiment_name='test_experiment',
            prolific_id='PROLIFIC123',
            date='2025-01-01 12:00:00'
        )
        self.assertEqual(bg.Age, '25-35')
        self.assertEqual(bg.Gender, 'Female')
        self.assertEqual(bg.experiment_name, 'test_experiment')
        self.assertEqual(bg.prolific_id, 'PROLIFIC123')
    
    def test_save_feedback_questionnaire(self):
        """Test saving feedback questionnaire data"""
        fb = feedback.objects.create(
            session_key='test_session_123',
            instructions='5',
            doing='4',
            simple='3',
            demanding='2',
            pessure='1',
            fun='5',
            reflects='4',
            performance='Good',
            understood='Yes',
            measured='Chunking',
            strategy='Yes',
            impression='Yes',
            comments='Great task',
            addedQ='{}',
            experiment_name='test_experiment',
            prolific_id='PROLIFIC123',
            date='2025-01-01 12:00:00'
        )
        self.assertEqual(fb.instructions, '5')
        self.assertEqual(fb.fun, '5')
        self.assertEqual(fb.experiment_name, 'test_experiment')


class ExperimentDataTests(TestCase):
    """Test experiment data submission"""
    
    def setUp(self):
        self.client = Client()
    
    def test_save_test_data(self):
        """Test saving test data from main task"""
        test_data = test.objects.create(
            session_key='test_session_123',
            checkbox="['1', '3', '5']",
            index=0,
            question='A',
            experiment_name='test_experiment',
            prolific_id='PROLIFIC123',
            date='2025-01-01 12:00:00'
        )
        self.assertEqual(test_data.session_key, 'test_session_123')
        self.assertEqual(test_data.question, 'A')
        self.assertEqual(test_data.index, 0)
    
    def test_save_sentence_data(self):
        """Test saving sentence data from EIT experiment"""
        sentence_data = sentence.objects.create(
            text='This is a test sentence',
            index=1,
            session_key='test_session_123',
            experiment_name='test_experiment',
            prolific_id='PROLIFIC123',
            date='2025-01-01 12:00:00'
        )
        self.assertEqual(sentence_data.text, 'This is a test sentence')
        self.assertEqual(sentence_data.index, 1)
        self.assertEqual(sentence_data.session_key, 'test_session_123')


class ExperimentViewTests(TestCase):
    """Test experiment-related views"""
    
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.token = Token.objects.create(user=self.user)
        
        # Create a test experiment
        self.draft = draft_data.objects.create(
            accessToken=self.token.key,
            nameExperement='Test',
            nameExperementForParticipants='test_exp',
            shuffleExtracts='False',
            shuffleExtractsPractice='False',
            ImitationTask=False,
            UseQuestions=True,
            UseProlific=True,
            helloEditor='Hello',
            consentEditor='Consent',
            outlineEditor='Outline',
            backgroundExample="{'useBackgroundAge': ['Age']}",
            backgroundAddQ='{}',
            feedbackExample="{'useFeedbackinstructions': ['instructions']}",
            feedbackAddQ='{}',
            goodbyeEditor='Goodbye',
            experimentInstructions='Instructions',
            practiceInstructions='Practice',
            audiosPractice='[]',
            audiosExperement='[]',
            uploadPracticeTranscriptsData='[]',
            uploadExperimentTranscriptsData="[['audio1', 'This is a test transcript']]",
            sessionTime=90
        )
        
        self.experiment_link = experiment_links.objects.create(
            experiment_link='experiment/test_exp',
            accessToken=self.token.key,
            experiment_stopped='False',
            experiment_start_time='nothing'
        )
    
    def test_drafts_list_returns_data(self):
        """Test that drafts list endpoint returns experiment data"""
        response = self.client.get('/drafts_list/', {
            'access_token': self.token.key
        })
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIsInstance(data, list)
    
    def test_stop_experiment_view(self):
        """Test stopping an experiment via view"""
        response = self.client.get('/stop_experiment/', {
            'name': 'test_exp'
        })
        self.assertEqual(response.status_code, 200)
        
        # Verify experiment was stopped
        link = experiment_links.objects.get(experiment_link='experiment/test_exp')
        self.assertEqual(link.experiment_stopped, 'True')
    
    def test_start_experiment_view(self):
        """Test starting an experiment via view"""
        response = self.client.get('/start_experiment/', {
            'name': 'test_exp'
        })
        self.assertEqual(response.status_code, 200)
        
        # Verify experiment was started
        link = experiment_links.objects.get(experiment_link='experiment/test_exp')
        self.assertEqual(link.experiment_stopped, 'False')
        self.assertNotEqual(link.experiment_start_time, 'nothing')
    
    def test_questionnaire_post(self):
        """Test submitting background questionnaire via POST"""
        response = self.client.post('/questionnaire/', {
            'session_key': 'test_session_789',
            'Age': '25-35',
            'Gender': 'Male',
            'LevelEducation': 'Bachelor',
            'AcadmicField': 'Physics',
            'NativeLanguage': 'English',
            'OtherLanguage': 'French',
            'Dyslexsia': 'No',
            'HearingDiff': 'No',
            'Whisper': 'No',
            'Comments': 'Test comment',
            'experiment_name': 'test_exp',
            'prolific': 'PROLIFIC456'
        })
        self.assertEqual(response.status_code, 200)
        
        # Verify data was saved
        bg = background.objects.filter(session_key='test_session_789').first()
        self.assertIsNotNone(bg)
        self.assertEqual(bg.Age, '25-35')
    
    def test_feedback_post(self):
        """Test submitting feedback questionnaire via POST"""
        response = self.client.post('/feedback/', {
            'session_key': 'test_session_456',
            'instructions': '5',
            'doing': '5',
            'simple': '4',
            'demanding': '3',
            'pessure': '2',
            'fun': '5',
            'reflects': '4',
            'performance': 'Good',
            'understood': 'Yes',
            'measured': 'Attention',
            'strategy': 'No strategy',
            'impression': 'Yes',
            'comments': 'Good experiment',
            'experiment_name': 'test_exp',
            'prolific': 'PROLIFIC789'
        })
        self.assertEqual(response.status_code, 200)
        
        # Verify data was saved
        fb = feedback.objects.filter(session_key='test_session_456').first()
        self.assertIsNotNone(fb)
        self.assertEqual(fb.instructions, '5')
    
    def test_text_submission(self):
        """Test submitting text data via POST"""
        response = self.client.post('/text/', {
            'session_key': 'test_session_999',
            'index': '1',
            'text': 'This is my typed sentence',
            'experiment_name': 'test_exp',
            'prolific': 'PROLIFIC999'
        })
        self.assertEqual(response.status_code, 200)
        
        # Verify data was saved
        sent = sentence.objects.filter(session_key='test_session_999').first()
        self.assertIsNotNone(sent)
        self.assertEqual(sent.text, 'This is my typed sentence')
    
    def test_delete_draft(self):
        """Test deleting a draft experiment"""
        response = self.client.get('/delete_draft/', {
            'name': 'test_exp'
        })
        self.assertEqual(response.status_code, 200)
        
        # Verify draft was deleted
        draft_exists = draft_data.objects.filter(
            nameExperementForParticipants='test_exp'
        ).exists()
        self.assertFalse(draft_exists)

    def test_experiment_over_after_session_time(self):
        """Experiment should be over after sessionTime minutes since start."""
        # Simulate starting experiment now - 2 hours ago, with sessionTime=60
        self.draft.sessionTime = 60
        self.draft.save()
        import datetime as dt
        started = (dt.datetime.now() - dt.timedelta(hours=2)).strftime('%Y-%m-%d %H:%M:%S.%f')
        experiment_links.objects.filter(experiment_link='experiment/test_exp').update(
            experiment_start_time=started
        )
        resp = self.client.get('/experiment_status/', {'name': 'test_exp'})
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.content)
        self.assertTrue(data['over'])

    def test_validate_uploads_counts_and_names(self):
        """Validate that audio extracts count equals transcripts and names correspond."""
        # Set audios and transcript data to match
        self.draft.audiosExperement = "['test_exp/audio1.mp3', 'test_exp/audio2.wav']"
        self.draft.uploadExperimentTranscriptsData = "[['audio1', 'hello world'], ['audio2', 'lorem ipsum']]"
        self.draft.save()
        resp = self.client.get('/validate_uploads/', {'name': 'test_exp'})
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.content)
        self.assertTrue(data['ok'])
        self.assertEqual(data['audio_count'], 2)
        self.assertEqual(data['transcript_count'], 2)

        # Now make counts differ to trigger warning
        self.draft.audiosExperement = "['test_exp/audio1.mp3']"
        self.draft.save()
        resp = self.client.get('/validate_uploads/', {'name': 'test_exp'})
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.content)
        self.assertFalse(data['ok'])
        self.assertIn('Counts differ', data['warning'])

    def test_validate_uploads_name_mismatch_warning(self):
        """Warn when a transcript name has no corresponding audio basename."""
        # One audio present, transcript refers to a different name
        self.draft.audiosExperement = "['test_exp/audio1.mp3']"
        self.draft.uploadExperimentTranscriptsData = "[['audioX', 'hello world']]"
        self.draft.save()
        resp = self.client.get('/validate_uploads/', {'name': 'test_exp'})
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.content)
        self.assertFalse(data['ok'])
        self.assertIn('Transcripts without matching audio', data['warning'])


class ModelIntegrityTests(TestCase):
    """Test model field constraints and data integrity"""
    
    def test_experiment_link_required_fields(self):
        """Test that experiment_link model has required fields"""
        link = experiment_links.objects.create(
            experiment_link='experiment/test',
            accessToken='token',
            experiment_stopped='False'
        )
        self.assertIsNotNone(link.pk)
        self.assertEqual(link.experiment_start_time, 'nothing')  # default value
    
    def test_draft_data_boolean_fields(self):
        """Test boolean fields in draft_data"""
        draft = draft_data.objects.create(
            accessToken='token',
            nameExperementForParticipants='test',
            ImitationTask=True,
            UseQuestions=False,
            UseProlific=True
        )
        self.assertTrue(draft.ImitationTask)
        self.assertFalse(draft.UseQuestions)
        self.assertTrue(draft.UseProlific)
    
    def test_session_time_default(self):
        """Test that sessionTime has correct default value"""
        draft = draft_data.objects.create(
            accessToken='token',
            nameExperementForParticipants='test',
            ImitationTask=False,
            UseQuestions=False,
            UseProlific=False
        )
        self.assertEqual(draft.sessionTime, 90)


class IntegrationTests(TestCase):
    """Integration tests for complete workflows"""
    
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='integrationuser',
            email='integration@example.com',
            password='integratepass123'
        )
        self.token = Token.objects.create(user=self.user)
    
    def test_complete_experiment_workflow(self):
        """Test complete workflow: create experiment, submit data, retrieve results"""
        # Step 1: Create experiment
        draft = draft_data.objects.create(
            accessToken=self.token.key,
            nameExperement='Integration Test',
            nameExperementForParticipants='integration_test',
            UseQuestions=True,
            UseProlific=True,
            uploadExperimentTranscriptsData="[['audio1', 'Test transcript one']]",
            sessionTime=90,
            ImitationTask=False
        )
        
        # Step 2: Create experiment link
        link = experiment_links.objects.create(
            experiment_link='experiment/integration_test',
            accessToken=self.token.key,
            experiment_stopped='False'
        )
        
        # Step 3: Submit participant data
        bg = background.objects.create(
            session_key='integration_session',
            Age='18-25',
            Gender='Other',
            experiment_name='integration_test',
            prolific_id='INTEG123'
        )
        
        test_data = test.objects.create(
            session_key='integration_session',
            checkbox="['1', '2']",
            index=0,
            question='A',
            experiment_name='integration_test',
            prolific_id='INTEG123'
        )
        
        fb = feedback.objects.create(
            session_key='integration_session',
            instructions='5',
            experiment_name='integration_test',
            prolific_id='INTEG123'
        )
        
        # Step 4: Verify all data is linked correctly
        self.assertEqual(
            background.objects.filter(experiment_name='integration_test').count(),
            1
        )
        self.assertEqual(
            test.objects.filter(experiment_name='integration_test').count(),
            1
        )
        self.assertEqual(
            feedback.objects.filter(experiment_name='integration_test').count(),
            1
        )
    
    def test_multiple_participants_same_experiment(self):
        """Test that multiple participants can submit data to same experiment"""
        draft = draft_data.objects.create(
            accessToken=self.token.key,
            nameExperementForParticipants='multi_participant_test',
            uploadExperimentTranscriptsData="[['audio1', 'Test']]",
            ImitationTask=False,
            UseQuestions=False,
            UseProlific=False
        )
        
        # Create data for 3 participants
        for i in range(3):
            session_key = f'session_{i}'
            prolific_id = f'PROLIFIC_{i}'
            
            background.objects.create(
                session_key=session_key,
                Age='25-35',
                experiment_name='multi_participant_test',
                prolific_id=prolific_id
            )
            
            test.objects.create(
                session_key=session_key,
                checkbox="['1']",
                index=0,
                question='A',
                experiment_name='multi_participant_test',
                prolific_id=prolific_id
            )
        
        # Verify all participants' data exists
        self.assertEqual(
            background.objects.filter(
                experiment_name='multi_participant_test'
            ).count(),
            3
        )
        self.assertEqual(
            test.objects.filter(
                experiment_name='multi_participant_test'
            ).count(),
            3
        )
