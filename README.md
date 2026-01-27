# ChunkitApp 2.0 Documentation

## 1. Overview

### Purpose
ChunkitApp 2.0 is a web-based data collection platform for speech segmentation experiments. The app allows researchers to design and run experiments where participants segment orthographic transcripts of speech extracts by tapping interactive symbols between words. It aggregates data across participants and extracts, and can run Monte Carlo simulations to analyze segmentation behavior.

### Target Users
Researchers studying language processing, speech segmentation, and chunking

### Key Features
- **Experiment Design**: Create custom speech segmentation experiments with audio files and transcripts. The app shows the transcript as the speech extract plays. Participants in an experiment can mark boundaries between segments by tapping an interactive symbol between words and take them away by tapping it again. The experimental design is flexible: researchers can choose which experiment features to include.
- **Flexible Data Collection**: Create your own or choose sample background questionnaires, feedback forms, and comprehension questions around your segmentation task.
- **English Proficiency Testing**: Optional built-in imitation tasks for assessing participants' English proficiency.
- **Data Aggregation**: Automatic aggregation of segmentation data across participants
- **Statistical Analysis**: Monte Carlo simulations and permutation tests for significance testing
- **Result Export**: CSV export of raw and processed data
- **Prolific Integration**: Built-in support for Prolific participant recruitment

### Demo Video

See ChunkitApp 2.0 in action:

https://github.com/user-attachments/assets/e36ec384-9b81-4062-ad40-7778e51e26fd

## 2. Setup Guide

### Prerequisites
- **Python 3.9** 
- Docker and Docker Compose installed
- Git installed
- Minimum 4GB RAM
- Node.js (for frontend development, if building outside Docker)

### Installation

> **⚠️ Windows Users:** If you encounter errors like `exec /scripts/run.sh: no such file or directory`, see the [Troubleshooting Guide](docs/troubleshooting.md) for a complete solution.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/annthehuman/ChunkitApp2.0.git
   cd ChunkitApp2.0
   ```

2. **Environment Configuration:**
   ```bash
   # Change .env.sample file into .env file with the following variables:
   
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

6. **Login with test account:**
   ```
   Email/Username: test@chunkit.app
   Password:       test1234
   ```
   or **Access the Demo** through the Demo button at the welcome screen

### Production Deployment

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

5. **Database Migration:**
   ```bash
   # Apply migrations
   docker-compose exec app python manage.py migrate
   
   # Create superuser (if needed)
   docker-compose exec app python manage.py createsuperuser
   ```

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

## Additional Documentation

- **[Architecture Documentation](docs/architecture.md)**: Tech stack, configuration, architecture, authentication flow, and API documentation
- **[Troubleshooting Guide](docs/troubleshooting.md)**: Common issues and solutions, including Windows-specific fixes
- **[Contributing Guidelines](CONTRIBUTING.md)**: How to contribute to the project

## License
This project is distributed under **Academic Free License v. 3.0**.
