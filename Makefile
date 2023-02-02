# Makefile - common commands for development. Run `make help` to print target details

.PHONY: all	pip-install	create-venv	source	migrate	createsuperuser	runserver	pip-local	pytest
.PHONY: flake8	black	format	pg_isready	celery-worker	redis-cli-ping	openapi	show_urls
.PHONY: psql	schema	sdl

.PHONY: poetry-update	poetry-install	poetry-update
.PHONY:	poetry-pytest	poetry-pytest-cov	poetry-celery-worker
.PHONY: htmlcov

all: migrate	runserver

## -- System Check Targets --
check:
	@docker --version
	@which python3
	@python3 --version
	@echo Node `node -v`; echo

# check to see if postgres and redis are running locally
check_dbs: pg_isready	redis-cli-ping

## -- Poetry Targets --

## Check poetry installation
poetry-version:
	poetry --version

poetry-python-version:
	cd backend && poetry run python3 --version && poetry run python --version

poetry-which-python:
	cd backend && poetry run which python && poetry run which python3

poetry-lock:
	cd backend && poetry lock

## Export requirements from poetry to requirements.txt and requirements_dev.txt
poetry-export:
	cd backend && poetry export --format requirements.txt --without-hashes -o requirements.txt
	cd backend && poetry export --format requirements.txt --without-hashes --with test -o requirements_test.txt
	cd backend && poetry export --format requirements.txt --without-hashes --with test,dev -o requirements_dev.txt

## Install dependencies
poetry-install:
	cd backend && poetry install

## Update dependencies
poetry-update:
	cd backend && poetry update

## Migrate using poetry's virtual environment
poetry-makemigrations:
	cd backend && poetry run python3 manage.py makemigrations

## Migrate using poetry's virtual environment
poetry-migrate:
	cd backend && poetry run python3 manage.py migrate

## Create superuser using poetry environment
poetry-createsuperuser:
	cd backend && poetry run python3 manage.py createsuperuser --no-input --email user@domain.com

## Start local development server using poetry virtual environment
poetry-runserver:
	cd backend && poetry run python3 manage.py runserver

## As an alternative to the above runserver command, use runserver_plus from django-extensions which uses Werkzeug
poetry-runserver-plus:
	cd backend && poetry run python3 manage.py runserver_plus

## start the celery worker
poetry-celery-worker:
	cd backend && poetry run python3 manage.py start_celery_worker

## start celery beat
poetry-celery-beat:
	cd backend && poetry run python3 manage.py start_celery_beat

## open a Django shell with shell_plus from django-extensions
poetry-shell:
	cd backend && poetry run python3 manage.py shell_plus

## Run pytest using poetry virtual environment
poetry-pytest:
	cd backend && poetry run pytest

## Show URLs using poetry virtual environment
poetry-show-urls:
	cd backend && poetry run python3 manage.py show_urls

## Generate OpenAPI schema using poetry environment
poetry-make-openapi-schema:
	python3 backend/manage.py generateschema > backend/static/openapi/schema.yml

## Run pytest with a code coverage report using poetry virtual environment
poetry-pytest-cov:
	cd backend && poetry run pytest --cov-report html --cov=backend

## check code formatting with flake8
poetry-flake8:
	cd backend && poetry run flake8

## check code formatting with black
poetry-black:
	cd backend && poetry run black .

## run flake8 and black
poetry-format: poetry-flake8	poetry-black

## Generate data for post model
poetry-generate-posts:
	cd backend && poetry run python3 manage.py generate_posts

## Generate graphviz diagram of database tables
poetry-graphviz-models:
	cd backend && poetry run python3 manage.py graph_models -a -o models.png

## -- Virtual Environment Targets --

# remove the Python virtualenv
venv-delete:
	@rm -rf backend/.venv

# create the Python virtualenv
venv-create:
	@python3 -m venv backend/.venv
	@backend/.venv/bin/python -m pip install --upgrade pip

# installs dependencies
venv-install-dev:
	@backend/.venv/bin/python -m pip install --upgrade pip
	@backend/.venv/bin/python -m pip install -r backend/requirements_dev.txt

venv-activate:
	@. backend/.venv/bin/activate

## Apply migration files to the database
venv-migrate:
	backend/manage.py migrate

## Make database migration files
venv-make-migrations:
	backend/manage.py makemigrations

## Create a superuser to access the Django admin interface
venv-createsuperuser:
	DJANGO_SUPERUSER_USERNAME=admin@domain.com DJANGO_SUPERUSER_EMAIL=admin@domain.com DJANGO_SUPERUSER_PASSWORD=password backend/manage.py createsuperuser --no-input

# Start the Django application locally using runserver_plus and Werkzeug
venv-runserver:
	backend/manage.py runserver_plus

## Start nginx so that the backend API and frontend dev server can both be accessed on localhost:80
venv-nginx:
	sudo nginx -c $$(pwd)/nginx/dev/local.conf

## stop nginx
venv-nginx-stop:
	sudo nginx -s stop

## Install python dependencies in a local virtual environment (.local-env)
venv-pip-install:
	pip3 install -r backend/requirements_dev.txt

## Run pytest
venv-pytest:
	pytest backend

## Run pytest and generate a code coverage report
venv-pytest-cov:
	pytest backend --cov-report html --cov=backend

## -- Coverage Targets --
## HTTP server for viewing python code coverage results
htmlcov:
	python3 -m http.server 8002 -d backend/htmlcov

## Lint python code using flake8
venv-flake8:
	flake8 backend

## Format code using black
venv-black:
	black -l 79 backend

## Formate code using flake8 and black
venv-format: venv-flake8	venv-black

## Start celery worker
venv-celery-worker:
	cd backend && python3 manage.py start_celery_worker

## Start celery beat
venv-celery-beat:
	cd backend && python3 manage.py start_celery_beat

## Start flower for debugging and monitoring celery tasks and workers
venv-flower:
	cd backend && celery -A backend.celery_app:app flower --address=127.0.0.1 --port=5555

## Generate posts
venv-generate-posts:
	backend/manage.py generate_posts

## Delete database
venv-flush:
	backend/manage.py flush

## Generate OpenAPI schema
venv-openapi:
	python3 backend/manage.py generateschema > backend/static/openapi/schema.yml

## Show all URLs
venv-show_urls:
	python3 backend/manage.py show_urls

## output graphviz diagram of database table relationships
venv-graphviz-models:
	python3 backend/manage.py graph_models -o my_project_subsystem.png

## -- docker Targets --

## make migrations in backend container
docker-compose-backend-migrate:
	@docker compose run backend python3 manage.py migrate

## backend shell
docker-compose-backend-shell:
	@docker compose run backend python3 manage.py shell

## docker-compose up
docker-compose-up:
	@docker compose up

## run pytest-cov with backend container
docker-compose-pytest-cov:
	docker compose run backend pytest --cov-report html --cov=.

docker-compose-generate-openapi-schema:
	docker exec backend python manage.py generateschema > backend/static/openapi/schema.yml

# Poetry

docker-compose-poetry-install:
	docker compose run backend poetry install

## update poetry through docker - this updates the lock file
docker-compose-poetry-update:
	docker compose run backend poetry update

## export poetry dependencies from poetry.lock file to requirements.txt and requirements_dev.txt
docker-compose-poetry-export: docker-compose-poetry-update
	docker compose run backend poetry export --format requirements.txt --without-hashes -o requirements.txt
	docker compose run backend poetry export --format requirements.txt --without-hashes --with test -o requirements_test.txt
	docker compose run backend poetry export --format requirements.txt --without-hashes --with test,dev -o requirements_dev.txt


## -- docker build Targets --
docker-build-npm_backend:
	@docker build \
	  -t npm_backend:latest \
	  -f backend/Dockerfile.npm_backend \
	  ./backend/

docker-build-backend-prod::
	@docker build \
      --target prod \
      -t backend_prod:latest \
      ./backend


## -- Quasar Targets --

quasar-install:
	cd quasar-app && yarn

## start quasar project locally
quasar-dev:
	cd quasar-app && quasar dev

## build quasar project in SPA mode
quasar-build:
	cd quasar-app && quasar build -m spa

## -- Terraform Targets --

## Format terraform files
tf-fmt:
	cd terraform && terraform fmt -recursive

## initialize terraform for the backend
tf-bootstrap-init:
	cd terraform/bootstrap && terraform init --var-file=bootstrap.tfvars

## initialize terraform for the backend
tf-bootstrap-init-upgrade:
	cd terraform/bootstrap && terraform init -upgrade --var-file=bootstrap.tfvars

## plan terraform S3 backend configuration
tf-bootstrap-plan:
	cd terraform/bootstrap && terraform plan --var-file=bootstrap.tfvars

## apply terraform S3 backend configuration
tf-bootstrap-apply:
	cd terraform/bootstrap && terraform apply --var-file=bootstrap.tfvars

## init, plan and apply terraform backend configuration
tf-bootstrap:	tf-bootstrap-init	tf-bootstrap-plan	tf-bootstrap-apply

## destroy terraform backend and ecr resources
tf-bootstrap-destroy:
	cd terraform/bootstrap && terraform destroy --var-file=bootstrap.tfvars

## write the backend configuration outputs to terraform/backend.tfvars
tf-bootstrap-output:
	cd terraform/bootstrap && terraform output > ../local.tfvars
	cd terraform/bootstrap && terraform output > ../backend.config
  # cd terraform/bootstrap && terraform output -json > local.tfvars

# TODO: move main terraform config files to core directory?
tf-core-init:
	cd terraform && terraform init --backend-config=backend.config --var-file=local.tfvars

tf-core-init-upgrade:
	cd terraform && terraform init -upgrade --backend-config=backend.config --var-file=local.tfvars

tf-core-plan:
	cd terraform && terraform plan --var-file=local.tfvars

tf-core-apply:
	cd terraform && terraform apply --var-file=local.tfvars

tf-core-apply-yes:
	cd terraform && terraform apply -auto-approve --var-file=local.tfvars

tf-core-validate:
	cd terraform && terraform validate

tf-core-output-json:
	@cd terraform && terraform output -json

tf-core:	tf-core-init  tf-core-plan	tf-core-apply

tf-core-destroy:
	cd terraform && terraform destroy --var-file=local.tfvars

tf-core-destroy-yes:
	cd terraform && terraform destroy -auto-approve --var-file=local.tfvars

tf-dev-init:
	terraform -chdir=terraform/live/dev init -backend-config=backend.config

tf-dev-plan:
	terraform -chdir=terraform/live/dev plan

tf-dev-apply:
	terraform -chdir=terraform/live/dev apply

## -- CDK Targets --
projen:
	@cd iac/cdk && npx projen

## -- AWS Targets --

## start ecs exec session for ad hoc env
ecs-exec:
	@./backend/scripts/aws/ecs_exec.sh

## start port forwarding session for ad hoc env
ssm-port-forward:
	@./backend/scripts/aws/ssm_port_forward.sh

# Credit: https://gist.github.com/prwhite/8168133#gistcomment-2749866
## Show this help menu
help:
	@printf "Usage\n";

	@awk '{ \
			if ($$0 ~ /^.PHONY: [a-zA-Z\-\_0-9]+$$/) { \
				helpCommand = substr($$0, index($$0, ":") + 2); \
				if (helpMessage) { \
					printf "\033[36m%-20s\033[0m %s\n", \
						helpCommand, helpMessage; \
					helpMessage = ""; \
				} \
			} else if ($$0 ~ /^[a-zA-Z\-\_0-9.]+:/) { \
				helpCommand = substr($$0, 0, index($$0, ":")); \
				if (helpMessage) { \
					printf "\033[36m%-20s\033[0m %s\n", \
						helpCommand, helpMessage; \
					helpMessage = ""; \
				} \
			} else if ($$0 ~ /^##/) { \
				if (helpMessage) { \
					helpMessage = helpMessage"\n                     "substr($$0, 3); \
				} else { \
					helpMessage = substr($$0, 3); \
				} \
			} else { \
				if (helpMessage) { \
					print "\n                     "helpMessage"\n" \
				} \
				helpMessage = ""; \
			} \
		}' \
		$(MAKEFILE_LIST)
