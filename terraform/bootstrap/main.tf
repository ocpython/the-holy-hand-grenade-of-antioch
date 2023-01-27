terraform {
  required_version = ">=1.3.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.48.0"
    }
  }
}

provider "aws" {
  region     = var.region
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
}

# S3 bucket for storing state file
resource "aws_s3_bucket" "this" {
  bucket = "${var.resource_prefix}-terraform-state"
  # force_destroy = true

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "this" {
  bucket = aws_s3_bucket.this.id
  versioning_configuration {
    status = "Enabled"
  }
}

# DynamoDB table for locking the state file
resource "aws_dynamodb_table" "this" {
  name           = "${var.resource_prefix}-terraform-lock-table"
  hash_key       = "LockID"
  read_capacity  = 20
  write_capacity = 20

  attribute {
    name = "LockID"
    type = "S"
  }

  lifecycle {
    prevent_destroy = true
  }
}

# ECR repository for the backend web app
resource "aws_ecr_repository" "backend" {
  name                 = "backend"
  image_tag_mutability = "MUTABLE"
  # force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }
}

# ECR repository for the frontend web app
resource "aws_ecr_repository" "frontend" {
  name                 = "frontend"
  image_tag_mutability = "MUTABLE"
  # force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }
}
