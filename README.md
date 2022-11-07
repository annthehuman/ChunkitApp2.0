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

If you have any questions about the software part of the application, please contact me. For any other questions, please contact Alena Konina at alena.konina@helsinki.fi.

## This project is distributed under CC-BY-NC-SA license.
