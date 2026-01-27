# Architecture Documentation

## Tech Stack

### Backend
- **Django**: 3.1.3 (Python web framework)
- **Django REST Framework**: 3.13.1 (API development)
- **djoser**: 2.1.0 (Authentication endpoints)
- **django-cors-headers**: 3.8.0 (CORS handling)
- **djangorestframework-simplejwt**: 4.8.0 (JWT authentication)

### Frontend
- **React**: 17.0.2 (JavaScript library)
- **React Router DOM**: 5.2.0 (Client-side routing)
- **Material-UI**: 5.5.2 (@mui/material, @mui/icons-material)
- **Bootstrap**: 4.6.0 (CSS framework)
- **Styled Components**: 5.3.0 (CSS-in-JS)
- **Draft.js**: 0.11.7 (Rich text editor)
- **Papa Parse**: 5.3.1 (CSV parsing)

### Data Processing & Analysis
- **NumPy**: 1.21.4 (Numerical computing)
- **Pandas**: 1.3.4 (Data manipulation)
- **SciPy** (Statistical functions)
- **python-Levenshtein**: 0.12.2 (String distance calculations)
- **Matplotlib**, **Seaborn**, **scikit-image** (Data visualization and analysis)

### Database
- **SQLite3** (Development and production database)

### Deployment & Infrastructure
- **Docker**: 5.0.2 (Containerization)
- **Docker Compose**: 1.29.2 (Multi-container orchestration)
- **Nginx** (Reverse proxy and static file serving)
- **uWSGI**: >=2.0.19.1,<2.1 (WSGI server)
- **Certbot** (SSL certificate management)

### Build Tools
- **Webpack**: 5.47.1 (Module bundler)
- **Babel**: 7.14.8 (JavaScript transpiler)

## Configuration

### Environment Variables
**Required:**
- `SECRET_KEY`: Django secret key for cryptographic signing
- `DEBUG`: Debug mode flag (1 for development, 0 for production)  
- `ALLOWED_HOSTS`: Comma-separated list of allowed host/domain names

**Optional:**
- `SQLITE3_DB`: Database filename (defaults to db.sqlite3)
- `APP_HOST`: Application host for proxy (defaults to app)
- `APP_PORT`: Application port for proxy (defaults to 9000)

### Email Configuration

The application uses email for user account activation. Email behavior differs between development and production:

**Development Mode (DEBUG=1):**
- Uses `django.core.mail.backends.console.EmailBackend`
- Emails are printed to console/Docker logs instead of being sent
- No SMTP credentials required
- View activation emails with: `docker-compose logs app | grep -A 20 "activation"`

**Production Mode (DEBUG=0):**
- Uses `django.core.mail.backends.smtp.EmailBackend`
- `EMAIL_HOST`: smtp.gmail.com
- `EMAIL_HOST_USER`: Environment variable or defaults to info.chunkitapp@gmail.com
- `EMAIL_HOST_PASSWORD`: **Required** - Set via environment variable
- `EMAIL_PORT`: 587
- `EMAIL_USE_TLS`: True

**Production Email Setup:**
```bash
# Set these environment variables for production
export EMAIL_HOST_USER=your-email@gmail.com
export EMAIL_HOST_PASSWORD=your-app-password  # Use Gmail App Password, not regular password
```

### Feature Flags
- **ImitationTask**: Boolean field in experiment configuration
- **UseQuestions**: Boolean field to enable comprehension questions
- **UseProlific**: Boolean field to enable Prolific integration
- **shuffleExtracts**: Controls randomization of experiment audio
- **shuffleExtractsPractice**: Controls randomization of practice audio

## Architecture & Code Structure

### High-Level Architecture
The application follows a **React + Django REST API** architecture with the following key components:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend │────│  Django REST API │────│   SQLite DB     │
│   (Port 3000)    │    │   (Port 8000)    │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌────────────────┐               │
         └──────────────│  Static Files  │───────────────┘
                        │    (Nginx)     │
                        └────────────────┘
```

### Directory Structure

```
/ChunkitApp2.0
├── chunkitapp/                    # Main Django app
│   ├── models.py                  # Database models
│   ├── views.py                   # API views and business logic
│   ├── urls.py                    # URL routing
│   ├── serializers.py             # DRF serializers
│   ├── forms.py                   # Django forms
│   └── migrations/                # Database migrations
├── chunkitapp_project/            # Django project settings
│   ├── settings.py                # Configuration
│   ├── urls.py                    # Root URL configuration
│   └── wsgi.py                    # WSGI configuration
├── frontend/                      # React application
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── app/              # Main app component
│   │   │   ├── home/             # Home page components
│   │   │   │   ├── constructor/  # Experiment designer
│   │   │   │   ├── test/         # Test runner
│   │   │   │   └── guide/        # User guide
│   │   │   ├── experiment/       # Experiment components
│   │   │   ├── results/          # Results visualization
│   │   │   └── logging-in/       # Authentication components
│   │   ├── common_components/    # Reusable UI components
│   │   └── index.js              # React entry point
│   ├── static/                   # Static assets
│   ├── templates/                # Django templates
│   └── webpack.config.js         # Webpack configuration
├── docker/                       # Docker configurations
├── proxy/                        # Nginx configuration
├── scripts/                      # Deployment scripts
└── static/                       # Collected static files
```

### Key Components

**Backend (Django):**
- **Models**: Database schema for experiments, participants, results
- **Views**: API endpoints for experiment management and data collection
- **Authentication**: JWT-based user authentication with email activation

**Frontend (React):**
- **Constructor**: Experiment design interface
- **ExperimentRun**: Participant-facing experiment interface
- **Results**: Data visualization and export
- **Authentication**: User registration, login, password reset

## Authentication Flow

### User Registration & Activation
1. **User Registration**: POST to `/auth/users/` with email and password
2. **Email Activation**: System sends activation email with UID and token
3. **Account Activation**: User clicks link, GET to `/auth/activate/{uid}/{token}`
4. **Redirect**: Successful activation redirects to `/authorized` page

### Login Process
1. **JWT Token Request**: POST to `/auth/jwt/create/` with credentials
2. **Token Response**: Returns access and refresh tokens
3. **Token Storage**: Frontend stores tokens for authenticated requests
4. **Token Refresh**: Use refresh token to get new access tokens

### Password Reset
1. **Reset Request**: POST to `/auth/users/reset_password/` with email
2. **Email Link**: System sends reset link with UID and token  
3. **Password Update**: User submits new password via `/password/reset/{uid}/{token}`

### Authentication Headers
```javascript
// JWT Authentication
Authorization: JWT {access_token}

// Token Authentication (alternative)
Authorization: Token {token}
```

### Required Permissions
- **AllowAny**: Default permission for most endpoints
- **Token Authentication**: Required for draft management and experiment access
- **Access Tokens**: Special tokens for experiment-specific access (stored in `experiment_links` model)

## API Documentation

### Authentication Endpoints
```bash
# User registration
POST /auth/users/
Content-Type: application/json
{
  "email": "user@example.com",
  "password": "password123"
}

# Login (JWT)
POST /auth/jwt/create/
Content-Type: application/json
{
  "email": "user@example.com", 
  "password": "password123"
}

# Token refresh
POST /auth/jwt/refresh/
Content-Type: application/json
{
  "refresh": "refresh_token"
}

# Password reset
POST /auth/users/reset_password/
Content-Type: application/json
{
  "email": "user@example.com"
}
```

### Experiment Management Endpoints
```bash
# Save experiment draft
POST /save_draft/
Content-Type: multipart/form-data
# Form data with experiment configuration and file uploads

# Load experiment draft
GET /load_draft/?name={experiment_name}

# Get drafts list
GET /drafts_list/?access_token={token}

# Delete draft
GET /delete_draft/?name={experiment_name}

# Start experiment
GET /start_experiment/?name={experiment_name}

# Stop experiment  
GET /stop_experiment/?name={experiment_name}
```

### Data Collection Endpoints
```bash
# Submit background questionnaire
POST /questionnaire/
Content-Type: application/x-www-form-urlencoded
# Form data with participant background information

# Submit experiment data (segmentation boundaries)
POST /data/
Content-Type: application/json
{
  "check": [1, 0, 1, 0],  # Boundary positions
  "index": 1,             # Extract index
  "session_key": "sess123",
  "question": "Yes",      # Comprehension question answer
  "experiment_name": "exp1",
  "prolific": "participant_id"
}

# Submit imitation task text
POST /text/
Content-Type: application/json
{
  "text": "transcribed text",
  "index": 1,
  "session_key": "sess123", 
  "experiment_name": "exp1",
  "prolific": "participant_id"
}

# Submit feedback questionnaire
POST /feedback/
Content-Type: application/x-www-form-urlencoded
# Form data with participant feedback
```

### Results & Analysis Endpoints
```bash
# Get experiment results (CSV export)
GET /results_data/{experiment_name}

# Get background questionnaire results
GET /background_results/{experiment_name}

# Get feedback results
GET /feedback_results/{experiment_name}

# Get sentence/imitation task results
GET /sentence_results/{experiment_name}

# Run permutation test
POST /permutation/{experiment_name}
Content-Type: application/x-www-form-urlencoded
{
  "amount": "1000000",    # Number of permutations
  "user": "user_token"    # Optional: email results
}

# Get Levenshtein distance analysis
GET /levi/{experiment_name}

# Get all Prolific participant IDs
GET /get_all_prolific/{experiment_name}
```

### Sample Request Examples
```bash
# Upload experiment with audio files
curl -X POST http://localhost:8000/save_draft/ \
  -H "Authorization: Token your_token" \
  -F "nameExperementForParticipants=MyExperiment" \
  -F "uploadExperimentAudio=@audio_files.zip" \
  -F "uploadExperimentTranscripts=@transcripts.xlsx"

# Submit segmentation data
curl -X POST http://localhost:8000/data/ \
  -H "Content-Type: application/json" \
  -d '{
    "check": [1,0,1,0,1],
    "index": 0,
    "session_key": "abc123",
    "experiment_name": "MyExperiment",
    "prolific": "participant123"
  }'

# Create demo experiment (no authentication required)
curl -X GET http://localhost:8000/create_demo/
```

### Demo Experiment Endpoint
```bash
# Create a demo experiment for showcasing app functionality
GET /create_demo/
Response:
{
  "success": true,
  "experiment_name": "Demo_Experiment",
  "message": "Demo experiment created successfully"
}
```

The demo endpoint loads pre-configured experiment files from `data/demo/` and creates a temporary experiment that can be run without user authentication. This is useful for:
- **Product Demonstrations**: Show potential users how the app works
- **Testing**: Quick testing without setting up full experiments
- **Onboarding**: Help new users understand the interface

## Demo Feature

### Overview
The Demo Mode allows unauthenticated visitors to experience the full functionality of ChunkitApp without creating an account. The demo loads pre-recorded speech extracts and transcripts from the `data/demo` folder.

### How It Works
1. Users click the "Demo" button on the home page
2. The frontend calls `/create_demo/` endpoint
3. Backend creates a temporary `Draft_Experiment` with demo files
4. User is redirected to the experiment interface
5. All experiment features work normally (questionnaires, feedback, segmentation)

### Demo Files Location
```
data/demo/
├── extracts_demo/
│   ├── sonnet_01_01.mp3
│   ├── sonnet_01_02.mp3
│   └── sonnet_01_03.mp3
├── transcripts_demo/
│   └── transcripts_demo.xlsx
└── demo_extracts.zip (auto-generated)
```

### Customizing Demo Content
To change what users see in the demo:

1. **Audio Files**: Replace files in `data/demo/extracts_demo/`
2. **Transcripts**: Update `data/demo/transcripts_demo/transcripts_demo.xlsx` with corresponding transcripts
   - Required columns: Audio name, Transcript, Question, Answer1, Answer2
3. **Text Content**: Edit demo text in `chunkitapp/demo.py` (helloEditor, consentEditor, etc.)
4. **Delete Cache**: Remove `data/demo/demo_extracts.zip` to force regeneration

### File Upload to Server (General Instructions)

#### For Local Files (HTTP POST)
When uploading experiment files through the web interface:

1. **Audio Files**: Must be in a ZIP archive
   - Supported formats: .mp3, .wav, .ogg
   - ZIP structure: Files can be directly in ZIP or one folder deep
   - Avoid special characters and spaces in filenames

2. **Transcripts**: Must be in XLSX (Excel) format
   - Required columns: `Audio name`, `Transcript`, `Question`, `Answer1`, `Answer2`
   - Audio names must match filenames in the ZIP (without extension)
   - Question field: Optional comprehension question
   - Answer fields: Possible answers for comprehension questions

3. **Upload Process** (via save_draft endpoint):
   ```python
   # FormData sent to /save_draft/
   nameExperementForParticipants: "Your Experiment Name"
   uploadExperimentAudio: <ZIP file>
   uploadExperimentTranscripts: <XLSX file>
   # ... other form fields
   ```

4. **Server-Side Processing**:
   - ZIP is stored in `settings.MEDIA_ROOT`
   - Excel file is stored in `settings.MEDIA_ROOT`
   - During experiment load, ZIP is extracted to `MEDIA_ROOT/Experement/{experiment_name}/`
   - Transcripts are parsed into the database

#### For Static Demo Files
Demo files are committed to the repository and served from `data/demo/`:
- Files must exist before app startup
- Files are copied to media folder on demo creation
- Demo can be reset by deleting `demo_audio.zip` and running demo creation again
