variable "db_username" {}
variable "db_password" {}

variable "unique_suffix" {
  default = "asdf"
}

variable "resource_group_name" {
  default = "workshops"
}

variable "location" {
  default = "northeurope"
}

variable "db_server_name" {
  default = "workshop-fp-db"
}

variable "db_name" {
  default = "series"
}
