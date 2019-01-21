resource "azurerm_sql_server" "db_server" {
  name                         = "${var.db_server_name}-${var.unique_suffix}"
  resource_group_name          = "${var.resource_group_name}"
  location                     = "${var.location}"
  version                      = "12.0"
  administrator_login          = "${var.db_username}"
  administrator_login_password = "${var.db_password}"
}

resource "azurerm_sql_database" "db" {
  name                = "${var.db_name}"
  resource_group_name = "${var.resource_group_name}"
  location            = "${var.location}"
  server_name         = "${azurerm_sql_server.db_server.name}"
  collation           = "SQL_Latin1_General_CP1_CI_AS"
  depends_on          = ["azurerm_sql_server.db_server"]
}
