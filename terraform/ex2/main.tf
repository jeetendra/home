variable "vpc_name" {
  type = string
  default = "myvpc"
}

variable "ssh_port" {
  type = number
  default = 22
}

variable "enabled" {
  type = bool
  default = false
}

variable "mylist" {
  type = list(string)
  default = [ "value1", "value2" ]
}

variable "mymap" {
  type = map(string)
  default = {
    "key" = "value"
    "key2" = "value2"
  }
}

variable "mytuple" {
  type = tuple([ number, string, bool ])
  default = [ 0, "value", false ]
}

variable "myobject" {
  type = object({
    name = string
    id = number
  })
  default = {
    id = 0
    name = "value"
  }
}