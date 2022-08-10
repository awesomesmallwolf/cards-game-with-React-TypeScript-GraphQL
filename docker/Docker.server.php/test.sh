#!/bin/bash

set -e

bash /scripts/entrypoint.sh install
cd /var/www
php artisan test