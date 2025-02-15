#!/bin/sh
set -e

cd /home/ubuntu/chunkitapp2.0
/usr/local/bin/docker-compose run --rm certbot certbot renew --webroot-path "/vol/www"
