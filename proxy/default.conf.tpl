server {
    listen 80;
    server_name chunkitapp.online www.chunkitapp.online;

    location /.well-known/acme-challenge/ {
        alias /vol/www//.well-known/acme-challenge/;
    }

    location /static {
        alias /vol/static;
    }

    location / {
        uwsgi_pass           ${APP_HOST}:${APP_PORT};
        include              /etc/nginx/uwsgi_params;
        client_max_body_size 100M;
    }
}