FROM php:8.2-apache

# Install system dependencies
# libfreetype6-dev + libjpeg62-turbo-dev are required to configure the gd extension in PHP 8.x
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev \
    zip unzip libzip-dev libpq-dev \
    libfreetype6-dev libjpeg62-turbo-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_pgsql pdo_mysql mbstring exif pcntl bcmath gd zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Disable Composer memory limit — prevents exit code 2 during dependency resolution
ENV COMPOSER_MEMORY_LIMIT=-1

# Enable Apache mod_rewrite
RUN a2enmod rewrite headers

# Set working directory
WORKDIR /var/www/html

# Copy all application files
COPY . .

# --no-scripts: skips post-autoload-dump (php artisan package:discover)
# which fails at build time because there is no .env / APP_KEY yet.
# package:discover runs at container startup in CMD instead.
# --ignore-platform-reqs: prevents platform extension mismatches from blocking build
RUN composer install \
    --optimize-autoloader \
    --no-dev \
    --no-interaction \
    --no-scripts \
    --prefer-dist \
    --ignore-platform-reqs

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Apache virtual host — point to Laravel's public/ folder
# Uses REPLACE_PORT as a plain placeholder; entrypoint.sh substitutes the real PORT at runtime
RUN echo 'Listen REPLACE_PORT' > /etc/apache2/ports.conf \
    && echo '<VirtualHost *:REPLACE_PORT>\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html/public>\n\
        AllowOverride All\n\
        Require all granted\n\
        Options -Indexes\n\
    </Directory>\n\
    ErrorLog ${APACHE_LOG_DIR}/error.log\n\
    CustomLog ${APACHE_LOG_DIR}/access.log combined\n\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf

# Copy and prepare the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]
