# ============================================================
#  DigitalOcean App Platform — Environment Variables
#  Dashboard → App → Settings → App-Level Environment Variables
#  ⚠️  Fill in every value marked with <REPLACE_...> before saving
# ============================================================

APP_NAME=Portfolio
APP_ENV=production
APP_DEBUG=false

# Run locally: php artisan key:generate --show
# Paste the full "base64:..." string below
APP_KEY=<REPLACE_WITH_APP_KEY>

# Your DO app URL (shown after first deploy, e.g. https://portfolio-api-xxxxx.ondigitalocean.app)
APP_URL=<REPLACE_WITH_DO_APP_URL>

# Your Vercel frontend URL
FRONTEND_URL=<REPLACE_WITH_VERCEL_URL>

# ── Logging ────────────────────────────────────────────────
LOG_CHANNEL=stderr
LOG_LEVEL=error

# ── Database ───────────────────────────────────────────────
# DigitalOcean injects this automatically when you link the managed DB.
# If setting manually, copy the "Connection String" from:
# DO Dashboard → Databases → your DB → Connection Details → URI
DB_CONNECTION=pgsql
DATABASE_URL=<REPLACE_WITH_DO_DATABASE_CONNECTION_STRING>

# ── Cache / Session / Queue ────────────────────────────────
CACHE_STORE=database
SESSION_DRIVER=database
SESSION_LIFETIME=120
QUEUE_CONNECTION=database
BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local

# ── Sanctum ────────────────────────────────────────────────
# Your Vercel domain WITHOUT https://
SANCTUM_STATEFUL_DOMAINS=<REPLACE_WITH_VERCEL_DOMAIN>

# ── Composer ───────────────────────────────────────────────
COMPOSER_MEMORY_LIMIT=-1

# ── Mail ───────────────────────────────────────────────────
MAIL_MAILER=log
MAIL_FROM_ADDRESS="hello@yourdomain.com"
MAIL_FROM_NAME="${APP_NAME}"
