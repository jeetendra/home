

docker run --rm -v ${PWD}:/workspace -v ${HOME}/.aws/credentials:/root/.aws/credentials -w /workspace hashicorp/terraform:latest init

docker run --rm -v ${PWD}:/workspace -v ${HOME}/.aws/credentials:/root/.aws/credentials -w /workspace hashicorp/terraform:latest plan

docker run --rm -v ${PWD}:/workspace -v ${HOME}/.aws/credentials:/root/.aws/credentials -w /workspace hashicorp/terraform:latest apply --auto-approve

docker run --rm -v ${PWD}:/workspace -v ${HOME}/.aws/credentials:/root/.aws/credentials -w /workspace hashicorp/terraform:latest destroy --auto-approve

# To pass variables
-var-file="filepath" 