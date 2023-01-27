from django.urls import path

from apps.core import views

urlpatterns = [
    path("", views.index, name="index"),
    path("kitchen-sink/", views.kitchen_sink, name="kitchen-sink"),
    path(
        "bootstrap-cheatsheet/", views.bootstrap_cheatsheet, name="bootstrap-cheatsheet"
    ),
]
