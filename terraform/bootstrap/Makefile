help:
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

tf-init: ## Run `terraform init --var-file=bootstrap.tfvars`
	terraform init --var-file=bootstrap.tfvars

tf-plan: ## Run `terraform plan --var-file=bootstrap.tfvars -out=tfplan`
	terraform plan --var-file=bootstrap.tfvars -out=tfplan

tf-apply: ## Run `terraform apply tfplan`
	terraform apply tfplan

tf-init-upgrade: ## Run `terraform init -upgrade --var-file=bootstrap.tfvars`
	terraform init -upgrade --var-file=bootstrap.tfvars

tf-destroy: ## Run `terraform destroy --var-file=bootstrap.tfvars`
	terraform destroy --var-file=bootstrap.tfvars
