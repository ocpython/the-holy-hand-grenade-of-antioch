# VPC

variable "vpc_id" {
  type = string
}

variable "private_subnet_ids" {
  type = list(string)
}

# Security Groups

variable "app_sg_id" {
  type        = string
  description = "ECS Security Group ID"
}

# Load balancer

variable "listener_arn" {
  type = string
}

variable "alb_dns_name" {
  type        = string
  description = "DNS name of the shared ALB"
}

# IAM

variable "task_role_arn" {
  type = string
}

variable "execution_role_arn" {
  type = string
}

# RDS

variable "rds_address" {
  type = string
}

variable "db_name" {
  type    = string
  default = "postgres"
}

# ElastiCache

variable "redis_service_host" {
  type        = string
  description = "value of the REDIS_SERVICE_HOST environment variable"
}

##############################################################################
# AWS
##############################################################################

variable "region" {
  default = "us-west-2"
}


################################################
# Per-environment variables
#
# These variables can be accept custom values
# per ad hoc environment
#################################################

# Application

##############################################################################
# Route 53
##############################################################################

variable "domain_name" {
  description = "Domain name to be used for Route 53 records (e.g. example.com)"
  type        = string
}

##############################################################################
# Application Services - Gunicorn, Nginx, Celery Worker, Celery Beat
##############################################################################

# Shared

variable "extra_env_vars" {
  description = "User-defined environment variables to pass to the services and task containers (gunicorn, nginx, celery_worker, etc.)"
  type        = list(object({ name = string, value = string }))
  default     = []
}

variable "assets_bucket_name" {
  description = "S3 bucket name for backend assets (media and static assets)"
}

variable "django_settings_module" {
  description = "Django settings module"
  default     = "backend.settings.production"
}

# Gunicorn (Django/Rest API/Web Server)

variable "gunicorn_command" {
  description = "Command used to start gunicorn container"
  default     = ["gunicorn", "-t", "1000", "-b", "0.0.0.0:8000", "--log-level", "info", "backend.wsgi"]
  type        = list(string)
}

variable "gunicorn_cpu" {
  default     = 256
  description = "CPU to allocate for this task (256 = 0.25 vCPU)"
  type        = number
}

variable "gunicorn_memory" {
  default     = 512
  description = "Amount (in MiB) of memory to allocate for this task"
  type        = number
}

# Nginx (Frontend, etc)

variable "nginx_command" {
  description = "Command to run in the frontend container"
  default     = ["nginx", "-g", "daemon off;"]
  type        = list(string)
}

variable "nginx_cpu" {
  default     = 256
  description = "CPU to allocate for this task (256 = 0.25 vCPU)"
  type        = number
}

variable "nginx_memory" {
  default     = 512
  description = "Amount (in MiB) of memory to allocate for this task"
  type        = number
}

# Celery Worker

variable "celery_worker_command" {
  description = "Command used to start celery worker"
  default     = ["celery", "--app=backend.celery_app:app", "worker", "--loglevel=INFO", "-Q", "default", "--beat"]
  type        = list(string)
}

variable "celery_worker_cpu" {
  default     = 256
  description = "CPU to allocate for this task (256 = 0.25 vCPU)"
  type        = number
}

variable "celery_worker_memory" {
  default     = 512
  description = "Amount (in MiB) of memory to allocate for this task"
  type        = number
}

# Celery Beat

variable "celery_beat_command" {
  default     = ["celery", "--app=backend.celery_app:app", "beat", "--loglevel=INFO"]
  description = "Command used to start celery beat"
  type        = list(string)
}

variable "celery_beat_cpu" {
  default     = 256
  description = "CPU to allocate for this task (256 = 0.25 vCPU)"
  type        = number
}

variable "celery_beat_memory" {
  default     = 512
  description = "Amount (in MiB) of memory to allocate for this task"
  type        = number
}

# backend_update commands (migrate, collectstatic)

variable "backend_update_command" {
  description = "Command used to run database migrations and collectstatic"
  default     = ["python", "manage.py", "pre_update"]
  type        = list(string)
}

variable "backend_update_cpu" {
  default     = 256
  description = "CPU to allocate for this task (256 = 0.25 vCPU)"
  type        = number
}

variable "backend_update_memory" {
  default     = 512
  description = "Amount (in MiB) of memory to allocate for this task"
  type        = number
}
