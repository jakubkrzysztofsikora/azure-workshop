resource "azurerm_search_service" "search" {
  name                = "search${var.unique_suffix}"
  resource_group_name = "${var.resource_group_name}"
  location            = "${var.location}"
  sku                 = "free"
}
