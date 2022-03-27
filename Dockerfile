FROM python:3.9-alpine3.13
LABEL maintainer='chunkitapp.com'

ENV PYTHONUNBUFFERD 1

COPY ./requirements.txt /requirements.txt
COPY ./ /app
COPY ./scripts /scrpits

WORKDIR /app
EXPOSE 8000


RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r /requirements.txt && \
    adduser --diabled-password --no-create-home app && \
    mkdir -p /vol/web/static && \
    mkdir -p /vol/web/media && \
    chown -R app:app /vol && \
    chmod -R 755 /vol && \
    chmod -R +x /scripts

ENV PATH="/scripts:/py/bin:$PATH"

USER app

CMD ["run.sh"]