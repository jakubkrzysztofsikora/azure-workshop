resource "azurerm_eventhub_namespace" "eventhub_namespace" {
  name                = "tweets-${var.unique_suffix}"
  location            = "${var.location}"
  resource_group_name = "${var.resource_group_name}"
  sku                 = "Basic"
  capacity            = 1
}

resource "azurerm_eventhub" "eventhub" {
  name                = "newtweet"
  namespace_name      = "${azurerm_eventhub_namespace.eventhub_namespace.name}"
  resource_group_name = "${var.resource_group_name}"
  partition_count     = 2
  message_retention   = 1
  depends_on          = ["azurerm_eventhub_namespace.eventhub_namespace"]
}

resource "azurerm_eventhub" "eventhub2" {
  name                = "calculatedsentiment"
  namespace_name      = "${azurerm_eventhub_namespace.eventhub_namespace.name}"
  resource_group_name = "${var.resource_group_name}"
  partition_count     = 2
  message_retention   = 1
  depends_on          = ["azurerm_eventhub_namespace.eventhub_namespace"]
}
