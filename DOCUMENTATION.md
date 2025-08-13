# ChunkitApp 2.0 Documentation

## 1. Overview (High-Level Summary)

### Purpose
ChunkitApp 2.0 is a web-based data collection platform for speech segmentation experiments. The app allows researchers to design and run experiments where participants segment orthographic transcripts of speech extracts by tapping interactive symbols between words. It aggregates data across participants and extracts, and can run Monte Carlo simulations to analyze segmentation behavior.

### Target Users
- Linguists and speech researchers
- Academic researchers studying language processing and speech segmentation
- Research groups investigating chunking in language perception

### Key Features
- **Experiment Design**: Create custom speech segmentation experiments with audio files and transcripts
- **Interactive Transcripts**: Participants tap symbols between words to mark segment boundaries
- **Multi-modal Data Collection**: Background questionnaires, feedback forms, and comprehension questions
- **English Proficiency Testing**: Built-in imitation tasks for assessing participants' English proficiency
- **Data Aggregation**: Automatic aggregation of segmentation data across participants
- **Statistical Analysis**: Monte Carlo simulations and permutation tests for significance testing
- **Result Export**: CSV export of raw and processed data
- **User Authentication**: JWT-based authentication system with email activation
- **Draft Management**: Save and load experiment drafts
- **Audio File Management**: Support for ZIP archives containing audio files
- **Prolific Integration**: Built-in support for Prolific participant recruitment

## 2. Tech Stack

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

## 3. Setup Guide

### Prerequisites
- Docker and Docker Compose installed
- Git installed
- Minimum 4GB RAM
- **MISSING**: Specific Python version requirements beyond Python 3.9 (used in Dockerfile)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/annthehuman/ChunkitApp2.0.git
   cd ChunkitApp2.0
   ```

2. **Environment Configuration:**
   ```bash
   # MISSING: .env.sample file referenced in README.md
   # Create .env file with the following variables:
   
   # Required environment variables:
   SECRET_KEY=your_secret_key_here  # Generate at https://djecrety.ir/
   DEBUG=1  # Set to 0 for production
   ALLOWED_HOSTS=127.0.0.1,localhost,your_server_ip
   ```

3. **Build the application:**
   ```bash
   docker-compose build
   ```

4. **Run the application:**
   ```bash
   # For production:
   docker-compose up
   
   # For development:
   docker-compose -f docker-compose-develop.yml up
   ```

5. **Access the application:**
   - Local: http://127.0.0.1
   - Server: http://your_server_ip

### Development Setup

For local development without Docker:

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Install Node.js dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Build frontend assets:**
   ```bash
   # Development build:
   npm run dev
   
   # Production build:
   npm run build
   ```

4. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Start development server:**
   ```bash
   python manage.py runserver
   ```

## 4. Configuration

### Environment Variables
**Required:**
- `SECRET_KEY`: Django secret key for cryptographic signing
- `DEBUG`: Debug mode flag (1 for development, 0 for production)  
- `ALLOWED_HOSTS`: Comma-separated list of allowed host/domain names

**Optional:**
- `SQLITE3_DB`: Database filename (defaults to db.sqlite3)
- `APP_HOST`: Application host for proxy (defaults to app)
- `APP_PORT`: Application port for proxy (defaults to 9000)

### Email Configuration (Hard-coded in settings.py)
**MISSING**: These should be environment variables
- `EMAIL_HOST`: smtp.gmail.com
- `EMAIL_HOST_USER`: info.chunkitapp@gmail.com  
- `EMAIL_HOST_PASSWORD`: **MISSING** - hardcoded as 'ppppppp'
- `EMAIL_PORT`: 587
- `EMAIL_USE_TLS`: True

### Feature Flags
- **ImitationTask**: Boolean field in experiment configuration
- **UseQuestions**: Boolean field to enable comprehension questions
- **UseProlific**: Boolean field to enable Prolific integration
- **shuffleExtracts**: Controls randomization of experiment audio
- **shuffleExtractsPractice**: Controls randomization of practice audio

## 5. Architecture & Code Structure

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

## 6. Authentication Flow

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

## 7. API Documentation

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
```

## 8. Testing

### **MISSING**: Comprehensive Testing Information

The project structure indicates test files exist (`tests.py` in both `chunkitapp/` and `frontend/`) but specific testing procedures are not documented.

**Available Test Files:**
- `chunkitapp/tests.py`
- `frontend/tests.py` 
- `frontend/src/App.test.js`

**Recommended Testing Commands:**
```bash
# Django backend tests
python manage.py test

# React frontend tests (if configured)
cd frontend
npm test
```

**Test Accounts:**
**MISSING**: No predefined test accounts documented

## 9. Deployment

### Production Deployment (Docker)

1. **Environment Setup:**
   ```bash
   # Set production environment variables
   SECRET_KEY=your_production_secret_key
   DEBUG=0
   ALLOWED_HOSTS=your_domain.com,your_ip_address
   ```

2. **Build and Deploy:**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

3. **SSL Configuration:**
   The application includes Certbot for automatic SSL certificate management:
   ```bash
   # Initialize SSL certificates
   docker-compose exec certbot sh /vol/www/certify-init.sh
   ```

4. **Static Files:**
   Static files are automatically collected and served via Nginx proxy.

### Manual Deployment

**MISSING**: Detailed manual deployment instructions for non-Docker environments

### Database Migration
```bash
# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

## 10. Troubleshooting

### Common Issues & Solutions

**Database Permissions:**
```bash
# Fix SQLite permissions in Docker
chmod 777 /vol/web/db.sqlite3
chown app:app /vol/web/db.sqlite3
```

**Media File Upload Issues:**
```bash
# Ensure media directory permissions
chmod -R 777 /vol/web/media
mkdir -p /vol/web/media/Practice
mkdir -p /vol/web/media/Experement
```

**Audio File Extraction Problems:**
- Ensure ZIP files don't contain nested folders beyond one level
- Audio files should be directly in ZIP or one folder deep
- Avoid system files like `__MACOSX` folders

**CORS Issues:**
- Verify `CORS_ORIGIN_WHITELIST` includes your frontend URL
- Check `ALLOWED_HOSTS` includes your domain

**Email Configuration:**
```bash
# Email sending failures
# Check EMAIL_HOST_PASSWORD is correctly set
# Verify SMTP settings in settings.py
```

### Logging & Debugging

**Enable Debug Logging:**
```python
# In settings.py for development
DEBUG = True
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
}
```

**Frontend Debugging:**
```bash
# Enable React development mode
npm run dev

# Check browser developer console for errors
# Verify API endpoints in Network tab
```

### Performance Issues

**Large Dataset Handling:**
- Permutation tests with 1M+ iterations may take 8+ hours
- Consider reducing permutation count for faster results
- Monitor memory usage during Monte Carlo simulations

## 11. Contributing Guidelines

### **MISSING**: Formal Contributing Guidelines

Based on project structure, recommended practices:

**Branch Naming:**
- `feature/experiment-feature-name`
- `bugfix/issue-description`
- `hotfix/critical-issue`

**Code Style:**
- Follow Django coding standards
- Use React/JavaScript ES6+ conventions
- Maintain consistent indentation (4 spaces for Python, 2 for JavaScript)

**Pull Request Process:**
1. Fork the repository
2. Create feature branch
3. Make changes with appropriate tests
4. Submit pull request with detailed description

**Contact:**
- Technical issues: GitHub issues
- Research questions: alena.konina@helsinki.fi

### License
This project is distributed under **Academic Free License v. 3.0**.

---

*Documentation generated based on codebase analysis. Items marked as **MISSING** indicate gaps in current implementation or documentation that should be addressed.*
