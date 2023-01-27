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
   1. `myproject` - with your project name 

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

You can confirm frontend works (browser should open automatically): [http://localhost:8081/](http://localhost:8081/)

### All Development URLs:

1. Health Check Page: [http://localhost/api/health-check/](http://localhost/api/health-check/)
1. Backend App: [http://localhost/mtv/](http://localhost/mtv/)
1. Django Admin Interface [http://localhost/admin/](http://localhost/admin/) (sign-in with your credentials set above)
1. View a Post (REST API): [http://localhost/api/drf/fbv/posts/1/](http://localhost/api/drf/fbv/posts/1/)
1. Frontend: [http://localhost:8081/](http://localhost:8081/)
1. Flower (monitor Celery tasks): [http://localhost:49555/](http://localhost:49555/)
1. Jupyter (Python Notebooks): [http://localhost:8888/](http://localhost:8888/)
1. Mailhog: [http://localhost:8025/](http://localhost:8025/)
1. Redis Commander: [http://localhost:8085/](http://localhost:8085/)



## Deploy to AWS

### Create Your AWS Account

#### Register Your Domain Name in Route53

#### Create your IAM User & Credentials

