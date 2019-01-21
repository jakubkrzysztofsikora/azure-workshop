resource "azurerm_logic_app_workflow" "tweets" {
  name                = "search-tweets-for-series"
  location            = "${var.location}"
  resource_group_name = "${var.resource_group_name}"
}

resource "azurerm_logic_app_trigger_recurrence" "test" {
  name         = "run-every-3-seconds"
  logic_app_id = "${azurerm_logic_app_workflow.tweets.id}"
  frequency    = "Second"
  interval     = 3
}
