"""
https://avilpage.com/2017/05/how-to-auto-reload-celery-workers-in-development.html
"""

import shlex
import subprocess

from django.core.management.base import BaseCommand
from django.utils import autoreload


def restart_celery_worker():
    cmd = "pkill -9 celery"
    subprocess.call(shlex.split(cmd))
    cmd = "celery"
    cmd += " --app=backend.celery_app:app worker"
    cmd += " --loglevel=INFO"
    # Run the queue named "default" only
    cmd += " -Q default"
    # Run only 1 worker process/thread (for development)
    cmd += " --concurrency=1"
    # Run celery beat
    cmd += " --beat"
    subprocess.call(shlex.split(cmd))


class Command(BaseCommand):
    def handle(self, *args, **options):
        autoreload.run_with_reloader(restart_celery_worker)
