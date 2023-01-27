# flake8: noqa

from .base import *

ALLOWED_HOSTS = ["*"]

# INSTALLED_APPS += ["django_extensions",]

INTERNAL_IPS = ["127.0.0.1"]

ADMIN_EMAIL = "user@email.com"


# PRIVATE_MEDIA_STORAGE = "backend.storage_backends"
DEFAULT_FILE_STORAGE = "backend.storage_backends.PrivateVolumeMediaStorage"
