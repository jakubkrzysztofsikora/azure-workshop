resource "azurerm_storage_account" "testsa" {
  name                     = "serieswebsite"
  resource_group_name      = "${var.resource_group_name}"
  location                 = "${var.location}"
  account_tier             = "Standard"
  account_replication_type = "GRS"
  account_kind             = "StorageV2"
}
