import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-l68zs)b%ofz%8keyw2&v#l4cy9(wc5bv0inl)xdzhq=6@4=ja='

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'chatbot_app',
    'rest_framework',
    'corsheaders',
    'csp', 
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'csp.middleware.CSPMiddleware', 
]

ROOT_URLCONF = 'chatbot.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'chatbot.wsgi.application'

# Content Security Policy (CSP) settings
CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://www.googletagmanager.com","https://hasnainprojects.pythonanywhere.com/static/script.js")  # Add external script sources
CSP_STYLE_SRC = ("'self'", "'unsafe-inline'", "https://fonts.googleapis.com")  # Allow Google Fonts
CSP_FONT_SRC = ("'self'", "https://fonts.gstatic.com")  # Allow Google Fonts CDN
CSP_IMG_SRC = ("'self'", "data:", "https://www.youtube.com")  # Allow images from self and YouTube
CSP_CONNECT_SRC = ("'self'",)  # Allow connections to the same origin
CSP_FRAME_ANCESTORS = ("'self'", "https://govitral.kimberleyconcrete.com")  # Allow specific iframe embedding

X_FRAME_OPTIONS = "ALLOW-FROM https://govitral.kimberleyconcrete.com"

# CORS settings for allowing cross-origin requests
CORS_ALLOWED_ORIGINS = [
    'http://127.0.0.1:8000',  # Local development (adjust as needed)
    'https://govitral.kimberleyconcrete.com',  # Site embedding the chatbot
    'https://hasnainprojects.pythonanywhere.com',  # Host for the chatbot
]

CORS_ALLOW_HEADERS = [
    'content-type',
    'x-requested-with',
    'accept',
    'origin',
    'authorization',
    'x-frame-options',  # Allow X-Frame header for iframe
]
CORS_ALLOW_CREDENTIALS = True

REST_FRAMEWORK = {

    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
}
# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Localization settings
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
