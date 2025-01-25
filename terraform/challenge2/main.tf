provider "aws" {
  region = "ap-south-1"
}

resource "aws_instance" "web_server" {
  ami           = "ami-0ad21ae1d0696ad58"
  instance_type = "t2.micro"
  user_data = file("serverscript.sh")
  security_groups = [ aws_security_group.web_traffic.name ]
  tags = {
    Name = "Web Server"
  }
}

resource "aws_instance" "db_server" {
  ami           = "ami-0ad21ae1d0696ad58"
  instance_type = "t2.micro"
  
  tags = {
    Name = "DB Server"
  }
}

resource "aws_eip" "web" {
  instance = aws_instance.web_server.id
}

variable "ingress" {
  type = list(number)
  default = [ 80, 443 ]
}

variable "egress" {
  type = list(number)
  default = [ 80, 443 ]
}

resource "aws_security_group" "web_traffic" {
  name = "Allow web traffic"
  dynamic "ingress" {
    iterator = port
    for_each = var.ingress
    content {
      from_port = port.value
      to_port = port.value
      protocol = "TCP"
      cidr_blocks = [ "0.0.0.0/0" ]
    }
  }

  dynamic "egress" {
    iterator = port
    for_each = var.egress
    content {
      from_port = port.value
      to_port = port.value
      protocol = "TCP"
      cidr_blocks = [ "0.0.0.0/0" ]
    }
  }

}

output "PrivateIP" {
  value = aws_instance.db_server.private_ip
}

output "PublicIp" {
  value = aws_eip.web.public_ip
}