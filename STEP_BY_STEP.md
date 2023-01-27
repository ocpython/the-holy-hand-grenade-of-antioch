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

### Setup `/terraform/bootstrap`

You run this once to get everything setup for terraform to work. Once this is 
run, you will do your terraform work in `terraform/live`. 

1. Go to `/terraform/bootstrap` and copy `bootstrap.tfvars.template` to `bootstrap.tfvars`
1. Run `make tf-bootstrap-init`
1. Run `make tf-bootstrap-plan`
1. Run `make tf-bootstrap-apply`
1. Note: this stores the Terraform state in the `terraform.tfstate` file, which is committed to the git repo.

The above commands create:

1. an S3 Bucket for storing terraform state 
1. a DynamoDB table for locking state
1. (2) ECR Repositories: [backend](https://us-west-2.console.aws.amazon.com/ecr/repositories/private/MY_AWS_ACCOUNT_ID/backend?region=us-west-2), [frontend](https://us-west-2.console.aws.amazon.com/ecr/repositories/private/MY_AWS_ACCOUNT_ID/frontend?region=us-west-2)


### AWS Certificate Manager (ACM)

1. Request a public certificate in [AWS Certificate Manager (ACM)](https://us-west-2.console.aws.amazon.com/acm/home?region=us-west-2#/certificates/request/public) and enter these 2 values:
   - `my-project.com`
   - `*.my-project.com`
1. Find the certificate [here](https://us-west-2.console.aws.amazon.com/acm/home?region=us-west-2#/certificates/list) and click "Create records in Route 53"
1. Copy the ARN. This is the value for `ACM_CERTIFICATE_ARN` below.


### Create a new SSH key called `id_rsa_myproject` NEEDED???


### Store secrets in GitHub for GitHub Actions usage

   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_ACCOUNT_ID: `MY_AWS_ACCOUNT_ID`
   - AWS_DEFAULT_REGION: `us-west-2`
   - TF_BACKEND_REGION: `us-west-2`
   - TF_BACKEND_BUCKET: `com-my-project-terraform-bucket`
   - TF_BACKEND_DYNAMODB_TABLE: `com-my-project-terraform-lock-table`
   - ACM_CERTIFICATE_ARN: `arn:aws:acm:us-west-2:aws_account_id:certificate/here`
   - KEY_NAME: `id_rsa_myproject`
   - DOMAIN_NAME: `my-project.com`


### Testing GitHub Actions:

1. [`test.yml`](https://github.com/your_username/myproject/actions/workflows/test.yml) - Click "Run workflow" 
1. [`ecr_backend.yml`](https://github.com/your_username/myproject/actions/workflows/ecr_backend.yml) - To build the `backend` image and push it to ECR, create a git tag for `be/v0.0.1`
1. [`ecr_frontend.yml`](https://github.com/your_username/myproject/actions/workflows/ecr_frontend.yml) - To build the `frontend` image and push it to ECR, create a git tag for `fe/v0.0.1`
1. [`backend_linting_and_unit_tests.yml`](https://github.com/your_username/myproject/actions/workflows/backend_linting_and_unit_tests.yml) - Create a branch called `dev` and push it up.
1. [`prod_base_create_update_terraform.yml`](https://github.com/your_username/myproject/actions/workflows/prod_base_create_update_terraform.yml) - Create/update the prod/base Terraform IaC.


### SSH into AWS environment

1. Run `make ad-hoc-ecs-exec` (enter "staging" for environment name)
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

