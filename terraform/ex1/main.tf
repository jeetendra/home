provider "aws" {
  region = "ap-south-1"
}

resource "aws_vpc" "firstvpc" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"

  tags = {
    Name = "main"
  }
}

resource "aws_instance" "app_server" {
  ami           = "ami-0ad21ae1d0696ad58"
  instance_type = "t2.micro"
  
  tags = {
    Name = "ExampleAppServerInstance"
  }

  security_groups = [ aws_security_group.webtraffic.name ]

}

resource "aws_security_group" "webtraffic" {
  name = "Allow Web Traffic"

  ingress {
    from_port = 443
    to_port = 443
    protocol = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 443
    to_port = 443
    protocol = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

}