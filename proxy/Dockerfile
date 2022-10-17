FROM nginxinc/nginx-unprivileged
LABEL maintainer='chunkitapp.online'

COPY ./* /etc/nginx/
COPY ./run.sh /run.sh


ENV APP_HOST=app
ENV APP_PORT=9000

USER root

RUN mkdir -p /vol/static && \
    chmod 755 /vol/static && \
    touch /etc/nginx/conf.d/default.conf && \
    chown nginx:nginx /etc/nginx/conf.d/default.conf && \
    chmod +x /run.sh

VOLUME /vol/static
VOLUME /vol/www

CMD ["/run.sh"]