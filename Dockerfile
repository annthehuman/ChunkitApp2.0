FROM python:3.9
LABEL maintainer='chunkitapp.com'

ENV PYTHONUNBUFFERD 1

COPY ./requirements.txt /requirements.txt
COPY ./ /app
COPY ./scripts /scripts

WORKDIR /app
EXPOSE 8000


RUN python3 -m venv /py && \
    /py/bin/pip3 install --upgrade pip && \
    /py/bin/pip3 install wheel && \
    # apk add --update --no-cache --virtual .tmp-deps linux-headers && \
    /py/bin/pip3 install -r /requirements.txt && \
    adduser --disabled-password --no-create-home app && \
    mkdir -p /vol/web/static && \
    mkdir -p /vol/web/media && \
    chown -R app:app /vol && \
    /py/bin/python3 manage.py makemigrations && \
    /py/bin/python3 manage.py migrate && \
    chown -R app:app /vol/web/db.sqlite3 && \
    chmod -R 777 /vol && \
    chmod -R +x /scripts

ENV PATH="/scripts:/py/bin:$PATH"

USER app

CMD ["run.sh"]