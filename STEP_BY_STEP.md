# Steps

## Setting Up Local Virtual Environment

1. Install python: `pyenv install 3.9`
1. Set global python version: `pyenv global 3.9`
1. Create a `.envrc` file—for `direnv` use—in the root with:
    ```shell
    # For direnv use
    
    # For calls to `python3` to use currently activated pyenv version
    export PATH="$HOME/.pyenv/shims:$PATH"
    ```
1. Run `direnv allow`
1. Create/re-create/activate, install dependencies: `make venv-install-dev`

To use the virtual environment, run `direnv allow` in the root of the project.
1. Run tests: `make venv-pytest`
1. Run test coverage (`make venv-pytest-cov`) and view it (`open htmlcov/index.html`)



## DataGrip Configuration

1. Create a new connection `jdbc:postgresql://localhost:5432/postgres`
2. Username: `postgres`
3. Password: `postgres`



# Deploying


### Testing GitHub Actions:

1. [`test.yml`](https://github.com/your_username/myproject/actions/workflows/test.yml) - Click "Run workflow" 
1. [`ecr_backend.yml`](https://github.com/your_username/myproject/actions/workflows/ecr_backend.yml) - To build the `backend` image and push it to ECR, create a git tag for `be/v0.0.1`
1. [`ecr_frontend.yml`](https://github.com/your_username/myproject/actions/workflows/ecr_frontend.yml) - To build the `frontend` image and push it to ECR, create a git tag for `fe/v0.0.1`
1. [`backend_linting_and_unit_tests.yml`](https://github.com/your_username/myproject/actions/workflows/backend_linting_and_unit_tests.yml) - Create a branch called `dev` and push it up.
1. [`prod_base_create_update_terraform.yml`](https://github.com/your_username/myproject/actions/workflows/prod_base_create_update_terraform.yml) - Create/update the prod/base Terraform IaC.


### SSH into AWS environment

1. Run `make ecs-exec` (enter "staging" for environment name)
1. After in `./manage.py createsuperuser`

### Upgrading terraform

#### `terraform/boostrap`

1. `make tf-bootstrap-init-upgrade` (`cd terraform/bootstrap && terraform init -upgrade --var-file=bootstrap.tfvars`)
2. `make tf-bootstrap` (does a normal init/plan/apply)

#### `terraform/live/prod/base` and `terraform/live/prod/app`

Essentially you just need to run this command:
```shell
terraform -chdir=terraform/live/prod/base init -upgrade
```

