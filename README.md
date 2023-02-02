# The Holy Hand Grenade of Antioch

Are you a Python developer looking to deploy a mature, production-ready, full-stack web application to AWS? Look no further, for the Holy Hand Grenade of Antioch is here to save the day!

**Whoa there knight!!!:** This project is seeking other knights (developers) to help us on our noble quest to slay the [Killer Rabbit of Caerbannog](https://montypython.fandom.com/wiki/Rabbit_of_Caerbannog) (all that is painful in deploying Python to AWS with IaC).

This repository includes:

 - A working frontend & backend built with Python and Django
 - Infrastructure as Code (IaC) using Terraform to deploy to AWS
 - CI/CD using GitHub Actions
 - And more

Our goal is to make deploying a full-stack web application as easy as saying "One...two...five!" ([reference]([url](https://montypython.fandom.com/wiki/Holy_Hand_Grenade_of_Antioch))).

## Features:

 - **Working Frontend:** A fully functional frontend built with modern technology
 - **Working Backend:** A fully functional backend built with Python & Django
 - **Background Tasks:** Long running Python-based background tasks using Celery
 - **Scheduled Tasks:** Scheduled Python-based tasks using Celery Beat
 - **Terraform for AWS:** Fully functional and deployable Infrastructure as Code(IaC) built with Terraform
 - **CI/CD using GitHub Actions:** Automated testing and deployment, ensuring that your application is always up-to-date and stable
 - **Adheres to the "The Twelve-Factor App" principles:** Your application will be scalable, maintainable, and secure
 - **Logging and Monitoring:** Automatic logging and monitoring of your application to keep track of errors, performance and user activity
 - **Authentication and Authorization:** Secure user authentication and authorization using industry-standard protocols and libraries
 - **Database Integration:** Support for PostgreSQL databases
 - **Cache Integration:** Support for Redis for cache (and message brokering)
 - **Dependabot:** Keep dependencies updated and secure
 - **And more:** Additional features and benefits that aren't listed here

## Benefits:

 - **Easy deployment:** Deploy your application with ease
 - **Scalability:** Your application will be able to handle increasing traffic and usage
 - **Maintainability:** Your application will be easy to update and maintain
 - **Security:** Your application will be secure and protect against common threats
 - **Monitoring and debugging:** Keep track of errors, performance and user activity to quickly identify and resolve issues
 - **User Management:** Securely manage user authentication and authorization
 - **Flexibility:** Support for popular databases, allowing you to choose the best fit for your application.
 - **Contribute to open-source:** Share your own ideas and help others deploy their own applications

Don't wait any longer, join the ranks of brave Python developers who have deployed their applications with the power of the Holy Hand Grenade of Antioch.

  > "And the Lord spake, saying, 'First shalt thou take out the Holy Pin. Then shalt thou count to three, no more, no less. Three shall be the number thou shalt count, and the number of the counting shall be three. Four shalt thou not count, neither count thou two, excepting that thou then proceed to three. Five is right out. Once the number three, being the third number, be reached, then lobbest thou thy Holy Hand Grenade of Antioch towards thy foe, who, being naughty in My sight, shall snuff it."
  > 
  > – Monty Python and the Holy Grail


# Getting Started

Here's what you'll need:

1. An AWS Account (for deploying)
1. A domain name (e.g. my-project.com), ideally purchased in your AWS account


## Initial Project Setup

1. Create a new git repository (e.g. github.com/your_username/myproject)
1. Copy everything from this repository into it
1. Search and replace all instances of 
   1. `your_username/myproject` - with your actual github username and repo 
   1. `my-project.com` - with your project's actual domain name
   1. `com-my-project` - with your *reverse domain name*  (Note: all "." are replaced with "-")
   1. `myproject_` - with a unique project prefix for development (e.g. `abc_`)

## Run in Development

### Shell #1 - Run Docker Containers

Open a shell, go to your project directory, and run: 

1. `docker compose up --build`

### Shell 2 - Setup Backend (Python/Django)

Open a **second** shell, go to your project directory, and run: 

1. Populate example posts: `docker exec -it backend bash -c 'python manage.py generate_posts'`
1. Create a superuser (`admin@domain.com`/`password`): `docker exec -it backend bash -c 'DJANGO_SUPERUSER_USERNAME=admin@domain.com DJANGO_SUPERUSER_EMAIL=admin@domain.com DJANGO_SUPERUSER_PASSWORD=password python manage.py createsuperuser --no-input'`

You can confirm the backend works if the [health check](http://localhost/api/health-check/) page loads.

### Shell 2 - Setup Frontend (Vue/Quasar)

While your containers are running, continue on in the second shell:

1. `make quasar-install`
1. `make quasar-dev`
   If this command fails with `/bin/sh: quasar: command not found`, try this: `cd quasar-app && npm link @quasar/cli && cd ..`

You can confirm frontend works (browser will open automatically to port [8081](http://localhost:8081/), but you should be able to access things on the [default port 80](http://localhost/)): 

### All Development URLs:

1. Health Check Page: [http://localhost/api/health-check/](http://localhost/api/health-check/)
1. Frontend: [http://localhost/](http://localhost/)
1. Backend App: [http://localhost/mtv/](http://localhost/mtv/)
1. Django Admin Interface [http://localhost/admin/](http://localhost/admin/) (sign-in with your credentials set above)
1. View a Post (REST API): [http://localhost/api/drf/fbv/posts/1/](http://localhost/api/drf/fbv/posts/1/)
1. Flower (monitor Celery tasks): [http://localhost:49555/](http://localhost:49555/)
1. Jupyter (Python Notebooks): [http://localhost:8888/](http://localhost:8888/)
1. Mailhog: [http://localhost:8025/](http://localhost:8025/)
1. Redis Commander: [http://localhost:8085/](http://localhost:8085/)



## Deploy to AWS

### Create Your AWS Account

#### Register Your Domain Name in Route53

#### Create your IAM User & Credentials

#### Choose your region

This project sets `us-west-2` as the default region, and `us-west-2d`, 
`us-west-2c`, `us-west-2b` as the default availability zones. If you dont have 
a preference, these should work great. If you want to use a different region, 
you will search/replace all in this project.


### Setup `/terraform/bootstrap`

The following steps create:

1. (1) S3 Bucket for storing terraform state (for the remainder of infrastructure) 
1. (1) DynamoDB table for preventing conflicts during concurrent terraform runs
1. (2) ECR Repositories: backend, frontend

You will do this "bootstrap" process only once to get everything setup for 
terraform to work.

1. `cd terraform/bootstrap`
1. Create bootstrap.tfvars file: `cp bootstrap.tfvars.template bootstrap.tfvars`
1. Modify bootstrap.tfvars file and replace values with your AWS credential values above
1. `make tf-init`
1. `make tf-plan`
1. `make tf-apply`
1. `git add .terraform.lock.hcl` - Record the provider selections. Include this file in git so that Terraform can guarantee to make the same selections by default when you run "terraform init" in the future.
1. `git add terraform.tfstate` - This stores the terraform state for these few bootstrap resources in the `terraform.tfstate` file. This file should be committed to the git repo.


### AWS Certificate Manager (ACM)

1. Request a public certificate in [AWS Certificate Manager (ACM)](https://us-west-2.console.aws.amazon.com/acm/home?region=us-west-2#/certificates/request/public) and enter these 2 values:
   - `my-project.com`
   - `*.my-project.com`
1. Find the certificate [here](https://us-west-2.console.aws.amazon.com/acm/home?region=us-west-2#/certificates/list) and click "Create records in Route 53"
1. You'll need to view the certificate and select "Create records in Route 53". The status will change to "Issued" once the DNS records are created.
1. Copy the ARN. This is the value for `ACM_CERTIFICATE_ARN` below.


### Store Secrets in GitHub (for GitHub Actions)

Go to your project's GitHub repo » Settings » Security » [Secrets and Variables » Actions](https://github.com/your_username/myproject/settings/secrets/actions) and create the following secrets:

   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_ACCOUNT_ID
   - AWS_DEFAULT_REGION: `us-west-2`
   - TF_BACKEND_REGION: `us-west-2`
   - TF_BACKEND_BUCKET: `com-my-project-terraform-state`
   - TF_BACKEND_DYNAMODB_TABLE: `com-my-project-terraform-lock-table`
   - ACM_CERTIFICATE_ARN
   - DOMAIN_NAME: `my-project.com`

### Run GitHub Actions to Deploy to AWS

Run each of these workflows in GitHub Actions:

1. Frontend - Build Image & Push to ECR
1. Backend - Build Image & Push to ECR
1. Base Environment - Create/Update
1. App Environment - Create/Update
1. Backend / Unit Tests 
