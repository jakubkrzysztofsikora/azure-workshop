resource "azurerm_storage_account" "function_storage" {
  name                     = "functionsstorage${var.unique_suffix}"
  resource_group_name      = "${var.resource_group_name}"
  location                 = "${var.location}"
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_app_service_plan" "consumption_plan" {
  name                = "consumption-plan"
  location            = "${var.location}"
  resource_group_name = "${var.resource_group_name}"
  kind                = "FunctionApp"

  sku {
    tier = "Dynamic"
    size = "Y1"
  }
}

resource "azurerm_function_app" "function_app" {
  name                      = "function-${var.unique_suffix}"
  location                  = "${var.location}"
  resource_group_name       = "${var.resource_group_name}"
  app_service_plan_id       = "${azurerm_app_service_plan.consumption_plan.id}"
  storage_connection_string = "${azurerm_storage_account.function_storage.primary_connection_string}"
  depends_on                = ["azurerm_storage_account.function_storage", "azurerm_app_service_plan.consumption_plan"]
  version                   = "~2"
}
