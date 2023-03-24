"""
Django settings for conf project.

Generated by 'django-admin startproject' using Django 4.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""
import os
import dj_database_url
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['SECRET_KEY']

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    '127.0.0.1',
    'ccs-final-project-flatspider.herokuapp.com',
]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    "whitenoise.runserver_nostatic",
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth.registration',
    'django.contrib.staticfiles',


    # Third party
    'rest_framework',
    'rest_framework.authtoken',
    'dj_rest_auth',

    # local
    'accounts.apps.AccountsConfig',
    'frontend.apps.FrontendConfig',
    'api.apps.ApiConfig',
    'letters.apps.LettersConfig',
    'searches.apps.SearchesConfig',
]


# https://www.django-rest-framework.org/api-guide/permissions/
# The default is to allow all. Set permission classes to require authentication. Can loosen via custom permission classes.

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
}


# Middleware provides a framework of hooks to process request/responses globally.
# https://docs.djangoproject.com/en/4.1/topics/http/middleware/

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'conf.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

# Web Server Gateway Interface
# https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/

WSGI_APPLICATION = 'conf.wsgi.application'


# Database. Checks if database url is available. If not, default to local server.
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases


if os.environ.get('DATABASE_URL'):
    DATABASES = {
        'default': dj_database_url.config(default=os.environ['DATABASE_URL'])
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'

REACT_APP_DIR = os.path.join(BASE_DIR, 'frontend/static')
STATICFILES_DIRS = (os.path.join(BASE_DIR, "frontend/static/build/static"),)

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Managing files. Topic 3.1 in Django docs.
# https://docs.djangoproject.com/en/4.1/ref/settings/#std-setting-MEDIA_ROOT

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'


# Send emails to the console:
# https://docs.djangoproject.com/en/4.1/topics/email/
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# SITE_ID. Identify which database this is attached to.
# https://docs.djangoproject.com/en/4.1/ref/settings/#site-id
SITE_ID = 1

# Substituting a custom User model
# https://docs.djangoproject.com/en/4.1/topics/auth/customizing/

AUTH_USER_MODEL = 'accounts.CustomUser'

# Allows for the input fields during registration to be personalized
# https://django-rest-auth.readthedocs.io/en/latest/configuration.html
REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'accounts.serializers.CustomRegisterSerializer'
}

# Whitenoise serves static files and compresses/hashes them for storage
# https://whitenoise.evans.io/en/stable/django.html
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
