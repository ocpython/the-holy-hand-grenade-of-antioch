FROM python:3.9 as base
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    POETRY_VERSION='1.3.2'

ARG SOURCE_TAG
ENV SOURCE_TAG=$SOURCE_TAG

RUN useradd --create-home --home-dir /code --shell /bin/bash app

WORKDIR /code
RUN pip install "poetry==$POETRY_VERSION"
COPY poetry.lock pyproject.toml /code/

FROM npm_backend:latest as npm_backend_static_assets

FROM base AS prod
RUN POETRY_VIRTUALENVS_CREATE=false poetry install --only main
COPY . /code
COPY --from=npm_backend_static_assets /npm_stuff/static/dist/ /code/static/dist/
RUN chown -R app:app /code
USER app

FROM base AS local_development
RUN POETRY_VIRTUALENVS_CREATE=false poetry install --with test,dev
USER app
