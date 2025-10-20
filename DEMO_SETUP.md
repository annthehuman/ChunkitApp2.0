# ChunkitApp Demo Feature - Setup Guide

## Overview

The Demo Feature allows visitors to try ChunkitApp without creating an account. It's perfect for:
- **Product demonstrations** to potential users or reviewers
- **User testing** and feedback collection
- **Onboarding tutorials** to help new users understand the interface
- **Revision presentations** to showcase app functionality

## What's Included in the Demo

### Demo Audio Files
Three pre-recorded speech extracts from Shakespeare's Sonnets (English):
- `sonnet_01_01.mp3` (~420 KB)
- `sonnet_01_02.mp3` (~366 KB)
- `sonnet_01_03.mp3` (~545 KB)

Location: `/data/demo/extracts_demo/`

### Demo Transcripts
- Excel file with transcripts for all three audio files
- Format: XLSX (Excel)
- Contains columns: Audio name, Transcript, Question, Answer1, Answer2

Location: `/data/demo/transcripts_demo/transcripts_demo.xlsx`

### Auto-Generated Files
- `demo_extracts.zip` - Zipped version of audio files (auto-generated on first use)

## How It Works

### User Flow

1. **Home Page**: Unauthenticated user sees a "Demo" button on the home page
2. **Demo Click**: User clicks the "Demo" button
3. **Backend Processing**:
   - Backend creates a temporary `Draft_Experiment` entry
   - Copies demo files to media folder
   - Unpacks audio ZIP file
   - Creates experiment_links entry
4. **Experiment Load**: User is redirected to `/experiment/Demo_Experiment`
5. **Experience**: User can interact with the full experiment (consent, questions, segmentation, feedback)

### Technical Implementation

#### Backend Components

**File: `chunkitapp/demo.py`**
- `create_demo_experiment()`: Main function that creates the demo experiment
  - Copies demo files from `data/demo/` to `MEDIA_ROOT`
  - Creates `draft_data` database entry
  - Creates `experiment_links` database entry
  - Returns experiment name and access token

- `setup_demo_files()`: Helper function that auto-generates `demo_extracts.zip` if needed
  - Called during initialization
  - Ensures ZIP file exists before first use

**File: `chunkitapp/views.py`**
- `create_demo()`: API endpoint for demo creation
  - Route: `GET /create_demo/`
  - Calls `create_demo_experiment()` from `demo.py`
  - Calls `unpackArchive()` to extract audio files
  - Returns success/error JSON response

**File: `chunkitapp/urls.py`**
- URL pattern: `path('create_demo/', views.create_demo, name='create_demo')`

#### Frontend Components

**File: `frontend/src/components/home/home.js`**
- `handleDemoClick()`: Method that triggers demo creation
  - Makes GET request to `/create_demo/`
  - On success: Navigates to experiment
  - On error: Shows error alert
  - Shows loading state during creation

- Demo Button: Displayed only to unauthenticated users
  - Located below "Sign up" button
  - Text: "Demo" (or "Loading Demo..." during creation)
  - Disabled during creation

## Database Entries Created

### draft_data Table Entry
```python
{
    accessToken: 'demo_token_001',
    nameExperement: 'Demo Experiment',
    sessionTime: 90,
    nameExperementForParticipants: 'Demo_Experiment',
    ImitationTask: False,
    UseQuestions: True,
    UseProlific: False,
    helloEditor: '<p>Welcome to ChunkitApp Demo!</p>',
    consentEditor: '<p>By continuing, you agree to participate in this demo.</p>',
    outlineEditor: '<p>In this demo, you will listen to speech extracts and mark segment boundaries.</p>',
    goodbyeEditor: '<p>Thank you for trying ChunkitApp!</p>',
    uploadExperimentAudio: 'demo_audio.zip',
    uploadExperimentTranscripts: 'demo_transcripts.xlsx',
    experimentInstructions: '<p>Listen to each audio and mark the segments.</p>',
    pagesNeeded: ['Hello', 'Consent', 'Outline', 'Experiment', 'Feedback', 'Goodbye']
}
```

### experiment_links Table Entry
```python
{
    experiment_link: 'experiment/Demo_Experiment',
    accessToken: 'demo_token_001',
    experiment_stopped: False,
    experiment_start_time: 'demo'
}
```

## Customizing the Demo

### Change Audio Files

1. **Remove old files**:
   ```bash
   rm -rf data/demo/extracts_demo/*
   ```

2. **Add new audio files**:
   ```bash
   cp your_audio_1.mp3 data/demo/extracts_demo/
   cp your_audio_2.mp3 data/demo/extracts_demo/
   # ... add more files as needed
   ```

3. **Delete ZIP cache** (will be regenerated):
   ```bash
   rm data/demo/demo_extracts.zip
   ```

4. **Restart application** (if running in Docker):
   ```bash
   docker-compose restart
   ```

### Change Transcripts

1. **Edit or replace** `data/demo/transcripts_demo/transcripts_demo.xlsx`
   
   Required columns:
   - **Audio name**: Filename without extension (e.g., "your_audio_1")
   - **Transcript**: Full text of the audio
   - **Question**: Optional comprehension question
   - **Answer1**: First possible answer
   - **Answer2**: Second possible answer

2. **Restart application**

### Change Demo Text

Edit `chunkitapp/demo.py` and modify these fields in `create_demo_experiment()`:

```python
helloEditor='<p>Your welcome message here</p>',
consentEditor='<p>Your consent text here</p>',
outlineEditor='<p>Your instructions here</p>',
goodbyeEditor='<p>Your goodbye message here</p>',
experimentInstructions='<p>Task instructions here</p>',
```

Then restart the application.

### Changing Pages Shown

Edit the `pagesNeeded` list in `chunkitapp/demo.py`:

```python
pagesNeeded=['Hello', 'Consent', 'Outline', 'Experiment', 'Feedback', 'Goodbye']
```

Available pages:
- `Hello`: Welcome/intro page
- `Consent`: Consent form
- `Outline`: Study outline
- `Background`: Background questionnaire
- `Practice`: Practice phase with audio
- `Experiment`: Main experiment
- `Imitation`: Imitation task (English proficiency test)
- `Feedback`: Feedback questionnaire
- `Goodbye`: Thank you page

## Testing the Demo

### Local Development

1. **Start the app**:
   ```bash
   # With Docker
   docker-compose -f docker-compose-develop.yml up
   
   # Or locally
   python manage.py runserver
   ```

2. **Go to home page**: `http://localhost:8000/`

3. **Click the Demo button** (visible when not logged in)

4. **Test the experiment**: Try segmenting the audio and filling out forms

### Production

Same as above, but use your production URL instead of localhost.

## Troubleshooting

### Demo button not showing
- Make sure you're not logged in (log out first)
- Check browser console for JavaScript errors

### Error: "Demo audio file not found"
- Verify `data/demo/demo_extracts.zip` exists
- If not, try restarting the application
- Check that audio files exist in `data/demo/extracts_demo/`

### Error: "Demo transcripts file not found"
- Verify `data/demo/transcripts_demo/transcripts_demo.xlsx` exists
- File must be in Excel format (.xlsx)

### Demo experiment not loading
- Check server logs for errors
- Verify database permissions
- Try clearing media files and restarting

### Audio files not playing
- Check that audio files are in supported format (.mp3, .wav, .ogg)
- Check browser console for audio playback errors
- Verify file paths are correct in extracted media folder

## File Locations Reference

```
ChunkitApp2.0/
├── data/demo/                              # Demo files directory
│   ├── extracts_demo/                      # Audio files
│   │   ├── sonnet_01_01.mp3
│   │   ├── sonnet_01_02.mp3
│   │   └── sonnet_01_03.mp3
│   ├── transcripts_demo/
│   │   └── transcripts_demo.xlsx
│   └── demo_extracts.zip                   # Auto-generated ZIP
│
├── chunkitapp/
│   ├── demo.py                             # Demo creation logic
│   ├── views.py                            # Contains create_demo() endpoint
│   └── urls.py                             # URL routing for /create_demo/
│
└── frontend/src/
    └── components/home/
        └── home.js                         # Frontend demo button & logic
```

## API Reference

### Create Demo Endpoint

**Request:**
```bash
GET /create_demo/
```

**Response (Success):**
```json
{
  "success": true,
  "experiment_name": "Demo_Experiment",
  "message": "Demo experiment created successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

**Error Codes:**
- 400: Bad Request - usually file not found or database error

## Notes

- Demo experiments are stored in the same database as regular experiments
- Demo data is NOT automatically separated from real experiment data in results
- Each time the demo is run, it overwrites the previous `Demo_Experiment` entry
- No authentication is required to create or run a demo experiment
- Demo experiments can be deleted like regular experiments through the admin interface
- Demo files should NOT contain sensitive data

## Contact

For questions about the demo feature implementation, see the main README.md or contact the development team.
