#!/bin/bash

set -e

function install {
  composer install
}

function setup {
  cd /var/www
  echo Setup running
  if [ ! -f .configured ]; then
    echo Configuring Laravel...
    install
    php artisan key:generate
    php artisan db:create
    php artisan migrate
    php artisan db:seed
    touch .configured
  else
    echo Laravel already configured
  fi
}

function run {
  exec /usr/sbin/httpd -D FOREGROUND -f /etc/apache2/httpd.conf &
  exec php-fpm
}

function development {
  setup
  run
}

# Wait for the postgres container to actually be up and running
until psql -h db -U postgres -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

eval "$@"
