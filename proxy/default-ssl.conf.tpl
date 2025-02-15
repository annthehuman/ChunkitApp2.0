server {
    listen 80;
    server_name chunkitapp.online www.chunkitapp.online;

    location /.well-known/acme-challenge/ {
        alias /vol/www/.well-known/acme-challenge/;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name chunkitapp.online www.chunkitapp.online;

    ssl_certificate     /etc/letsencrypt/live/chunkitapp.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/chunkitapp.online/privkey.pem;

    include     /etc/nginx/options-ssl-nginx.conf;

    ssl_dhparam /vol/proxy/ssl-dhparams.pem;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location /static {
        alias /vol/static;
    }

    location / {
        uwsgi_pass           ${APP_HOST}:${APP_PORT};
        include              /etc/nginx/uwsgi_params;
        client_max_body_size 100M;
    }

}