#!/bin/sh

set -e

echo "Spreding certificate..."

certbot certonly --cert-name chunkitapp.online -d chunkitapp.online -d www.chunkitapp.online