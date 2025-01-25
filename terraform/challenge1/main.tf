
provider "aws" {
  region = "ap-south-1"
}

resource "aws_vpc" "terraformvpc" {
  cidr_block = "192.168.0.0/24"
  instance_tenancy = "default"
  
  tags = {
    Name = "TerraformVPC"
  }
}