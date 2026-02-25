#!/bin/bash
set -e

# Substitute the real PORT value into Apache config at runtime
# (PORT is injected by DigitalOcean / Render as an env variable)
export PORT=${PORT:-8080}

sed -i "s/REPLACE_PORT/$PORT/g" /etc/apache2/ports.conf
sed -i "s/REPLACE_PORT/$PORT/g" /etc/apache2/sites-available/000-default.conf

# Deferred from build time — needs APP_KEY to be available
php artisan package:discover --ansi

# Cache config and routes
php artisan config:cache
php artisan route:cache

# Run migrations and seed (firstOrCreate guards prevent duplicate data)
php artisan migrate --force
php artisan db:seed --force

# Start Apache
exec apache2-foreground
