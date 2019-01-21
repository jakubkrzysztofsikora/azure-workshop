resource "azurerm_cognitive_account" "dziobak" {
  name                = "dziobak"
  location            = "${var.location}"
  resource_group_name = "${var.resource_group_name}"
  kind                = "TextAnalytics"

  sku {
    name = "F0"
    tier = "Free"
  }
}
