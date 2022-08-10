FROM php:8.0.0-fpm-alpine3.12
WORKDIR /var/www

ARG ENV=prod

# Install Bash, Postgres client
RUN apk update && apk upgrade && apk add bash postgresql-client;

# PHP module dependencies
RUN rm -rf /var/www/logs \
&& apk add --no-cache apache2-proxy g++ icu-dev zlib-dev libzip-dev autoconf make postgresql-dev libmcrypt-dev \
&& docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
&& docker-php-ext-install pdo pdo_pgsql \
&& pecl install mcrypt-1.0.4 && docker-php-ext-enable mcrypt \
# Composer
&& apk add --no-cache curl \
&& curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
&& composer --version

RUN  rm -rf /etc/init.d/*; \
     mkdir /scripts; \
     mkdir /run/apache2; \
     addgroup -g 1000 -S site; \
     adduser -G site -u 1000 -s /bin/sh -D site; \
     sed -rie 's|listen = 9000|listen = 9001|g' /usr/local/etc/php-fpm.d/zz-docker.conf

RUN  cp /usr/local/etc/php-fpm.d/www.conf /usr/local/etc/php-fpm.d/www.conf.upstream

COPY docker/Docker.server.php/apache/httpd.conf /etc/apache2/httpd.conf
COPY docker/Docker.server.php/apache/www.conf /usr/local/etc/php-fpm.d/www.conf
COPY docker/Docker.server.php/apache/php.ini /usr/local/etc/php/php.ini

COPY docker/Docker.server.php/test.sh /scripts
COPY docker/Docker.server.php/entrypoint.sh /scripts

COPY php-server/laravel-graphql /var/www

RUN chgrp -R 1000 storage bootstrap/cache
RUN chmod -R ug+rwx storage bootstrap/cache

ENTRYPOINT ["/bin/bash", "/scripts/entrypoint.sh"]
CMD ["development"]

EXPOSE 8080