#!/bin/sh

set -e

echo "Spreding certificate..."

certbot certonly --cert-name chunkitapp.online --webroot --webroot-path "/vol/www" -d chunkitapp.online -d www.chunkitapp.online