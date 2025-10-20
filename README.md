# Chunkitapp2.0

To install this application on your server you need to install docker (https://docs.docker.com/get-docker/) and docker-compose (https://docs.docker.com/compose/install/).

1. You need to clone this project on your server. Make sure you have git installed and run this command in the terminal

```sh
git clone https://github.com/annthehuman/ChunkitApp2.0.git
```

2. Rename the .env.sample file to .env and change the
- DEBUG to 1
- SECRET_KEY to normal secret key (you can generate it on this site https://djecrety.ir/)
- ALLOWED_HOSTS to 127.0.0.1,localhost and ip adress of your server.

3. In the terminal run the command

```sh
docker-compose build
```

to build your project 

and 

```sh
docker-compose up
```

to run it.

You can access your application in a browser at 127.0.0.1 on local machine or at the ip adress of your server.

## Login and Test Account

After installation, you can log in using the pre-configured test account:

```
Email/Username: test@chunkit.app
Password:       test1234
```

**Note about new user registration:** New user signups require email activation. In development mode (DEBUG=1), activation emails are printed to the Docker logs instead of being sent. To activate a new account:

1. Sign up as a new user
2. Check the Docker logs for the activation link:
   ```sh
   docker-compose logs app
   ```
3. Copy and paste the activation URL into your browser

Alternatively, just use the test account above for immediate access.

## Demo Feature

ChunkitApp includes a **Demo Mode** that allows visitors to try the application without creating an account. The demo loads pre-configured experiment files from the `data/demo` folder and provides a quick way to explore the app's functionality.

### How to Use the Demo

1. On the home page (without logging in), click the **"Demo"** button
2. The demo experiment will load with pre-recorded speech extracts and transcripts
3. You can interact with the experiment just like in a real study
4. No account login required!

### Demo Files

The demo includes:
- **Audio files**: 3 pre-recorded speech extracts (Sonnet excerpts in English)
- **Transcripts**: Corresponding transcripts in Excel format for segmentation

Files are located in:
- `data/demo/extracts_demo/` - Audio files (.mp3)
- `data/demo/transcripts_demo/transcripts_demo.xlsx` - Transcript file
- `data/demo/demo_extracts.zip` - Zipped audio files (auto-generated)

### Customizing Demo Content

To change the demo content:

1. Replace audio files in `data/demo/extracts_demo/` with your own audio files
2. Update `data/demo/transcripts_demo/transcripts_demo.xlsx` with corresponding transcripts
3. Delete the `data/demo/demo_extracts.zip` file (it will be regenerated automatically)
4. Restart the application

## Troubleshooting

### Reset Test Account Password

If you need to reset the test account password (test@chunkit.app), run:

```sh
docker exec chunkitapp20-app-1 python -c "from django.contrib.auth.models import User; u = User.objects.get(username='test@chunkit.app'); u.set_password('test1234'); u.save(); print('Password reset!')"
```

### Email Activation Issues

If you signed up as a new user and didn't receive an activation email, remember that in development mode emails are printed to the Docker logs. Check them with:

```sh
docker-compose logs app | grep -A 20 "activation"
```

If you have any questions about the software part of the application, please contact me on Github. For any other questions, please contact Alena Konina on Github or at alena.konina@helsinki.fi.

## This project is distributed under Academic Free License v. 3.0 license.
