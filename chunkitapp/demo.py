from django.conf import settings
from .models import draft_data, experiment_links
import os
import shutil
import pandas as pd

def create_demo_experiment():
    """
    Create a demo experiment using pre-loaded audio files and transcripts
    from the data/demo folder.
    
    This function:
    1. Creates demo copies of audio and transcript files in the media folder
    2. Creates a draft_data entry for the demo experiment
    3. Creates an experiment_links entry for the demo experiment
    4. Returns the experiment name and access token
    """
    
    demo_experiment_name = 'Demo_Experiment'
    demo_folder = os.path.join(settings.BASE_DIR, 'data', 'demo')
    media_folder = settings.MEDIA_ROOT
    
    # Paths to demo files
    demo_audio_zip = os.path.join(demo_folder, 'demo_extracts.zip')
    demo_transcripts = os.path.join(demo_folder, 'transcripts_demo', 'transcripts_demo.xlsx')
    
    # Verify demo files exist
    if not os.path.exists(demo_audio_zip):
        raise FileNotFoundError(f"Demo audio file not found: {demo_audio_zip}")
    if not os.path.exists(demo_transcripts):
        raise FileNotFoundError(f"Demo transcripts file not found: {demo_transcripts}")
    
    # Copy demo files to media folder with unique names
    demo_audio_dest = os.path.join(media_folder, 'demo_audio.zip')
    demo_transcripts_dest = os.path.join(media_folder, 'demo_transcripts.xlsx')
    
    # Copy files
    shutil.copy2(demo_audio_zip, demo_audio_dest)
    shutil.copy2(demo_transcripts, demo_transcripts_dest)
    
    # Remove any existing demo experiment
    try:
        existing = draft_data.objects.filter(nameExperementForParticipants=demo_experiment_name)
        existing.delete()
        existing_links = experiment_links.objects.filter(experiment_link__contains=demo_experiment_name)
        existing_links.delete()
    except:
        pass
    
    # Read transcript data from Excel file
    df = pd.read_excel(demo_transcripts, 
                       converters={'Audio name': str, 'Transcript': str,
                                   'Question': str, 'Answer1': str,
                                   'Answer2': str}).fillna(0)
    
    transcripts_data = []
    for row in range(df.shape[0]):
        table_row = []
        for col in range(df.shape[1]):
            table_row.append(df.iat[row, col])
        transcripts_data.append(table_row)
    
    # Get list of audio files
    audio_files = ['Demo_Experiment/sonnet_01_01.mp3', 
                   'Demo_Experiment/sonnet_01_02.mp3', 
                   'Demo_Experiment/sonnet_01_03.mp3']
    
    # Create demo experiment draft
    demo_draft = draft_data.objects.create(
        accessToken='demo_token_001',
        nameExperement='Demo Experiment',
        sessionTime=90,
        nameExperementForParticipants=demo_experiment_name,
        ImitationTask=False,
        UseQuestions=True,
        UseProlific=False,
        shuffleExtracts='false',
        shuffleExtractsPractice='false',
        helloEditor='<p>Welcome to ChunkitApp Demo!</p>',
        consentEditor='<p>By continuing, you agree to participate in this demo.</p>',
        outlineEditor='<p>In this demo, you will listen to speech extracts and mark segment boundaries.</p>',
        backgroundExample='{}',
        backgroundAddQ='{}',
        feedbackExample='{}',
        feedbackAddQ='{}',
        goodbyeEditor='<p>Thank you for trying ChunkitApp!</p>',
        uploadExperimentAudio='demo_audio.zip',
        uploadExperimentTranscripts='demo_transcripts.xlsx',
        experimentInstructions='<p>Listen to each audio and mark the segments.</p>',
        practiceInstructions='<p>Practice with this audio first.</p>',
        pagesNeeded=['Hello', 'Consent', 'Outline', 'Experiment', 'Feedback', 'Goodbye'],
        audiosExperement=audio_files,
        uploadExperimentTranscriptsData=transcripts_data,
        audiosPractice='[]',
        uploadPracticeTranscriptsData='[]'
    )
    
    # Create experiment link entry
    demo_link = f'experiment/{demo_experiment_name}'
    experiment_links.objects.create(
        experiment_link=demo_link,
        accessToken='demo_token_001',
        experiment_stopped=False,
        experiment_start_time='demo'
    )
    
    return {
        'experiment_name': demo_experiment_name,
        'access_token': 'demo_token_001',
        'success': True
    }


def setup_demo_files():
    """
    Initialize demo files - called during app startup or on first request.
    Ensures the demo ZIP file exists.
    """
    demo_folder = os.path.join(settings.BASE_DIR, 'data', 'demo')
    demo_extracts_folder = os.path.join(demo_folder, 'extracts_demo')
    demo_audio_zip = os.path.join(demo_folder, 'demo_extracts.zip')
    
    # If demo_extracts.zip doesn't exist but extracts_demo folder does, create it
    if not os.path.exists(demo_audio_zip) and os.path.exists(demo_extracts_folder):
        import zipfile
        with zipfile.ZipFile(demo_audio_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(demo_extracts_folder):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, demo_extracts_folder)
                    zipf.write(file_path, arcname)
