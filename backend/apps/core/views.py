import os

from django.contrib import messages
from django.http import JsonResponse
from django.shortcuts import render  # noqa
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.exceptions import APIException

from .tasks import send_email_debug_task


def health_check(request):
    return JsonResponse({"message": "OK"})


def version(request):
    version = os.environ.get("SOURCE_TAG", "-")
    return JsonResponse({"version": version, "foo": "bar"})


def index(request):
    return render(request, "index.html")


def kitchen_sink(request):
    messages.add_message(request, messages.SUCCESS, f"Example message.")
    return render(request, "kitchen-sink.html")


def bootstrap_cheatsheet(request):
    return render(request, "bootstrap-cheatsheet.html")


@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def trigger_exception(request):
    """
    Triggers an exception. used for testing
    """
    raise APIException("Exception message from the API server")


@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def email_admins(request):
    send_email_debug_task.apply_async()
    return JsonResponse({"message": "Email sent!"})
