server {
    listen ${LISTEN_PORT};
    server_name chunkitapp.online www.chunkitapp.online;

    location ~ /.well-known/acme-challenge {
        allow all;
        root /var/www/certbot;
    }

    location /static {
        alias /vol/static;
    }

    location / {
        uwsgi_pass            ${APP_HOST}:${APP_PORT};
        include               /etc/nginx/uwsgi_params;
        client_max_body_size  100M;
        rewrite ^ https://$host$request_uri? permanent;
    }
}

server {
    listen 443 ssl http2;
    server_name chunkitapp.online www.chunkitapp.online;

    include /etc/letsencrypt/options-ssl-nginx.conf;

    location /static {
        alias /vol/static;
    }

    location / {
        proxy_pass http://www.chunkitapp.online;
        uwsgi_pass            ${APP_HOST}:${APP_PORT};
        include               /etc/nginx/uwsgi_params;
        client_max_body_size  100M;
    }
}