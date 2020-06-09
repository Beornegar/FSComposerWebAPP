sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/demo/fiori2/model/formatter"],
  function (Controller, formatter) {
    "use strict";

    return Controller.extend("sap.ui.demo.fiori2.controller.Master", {
      formatter: formatter,

      onInit: function () {
        this.oView = this.getView();
        this._bDescendingSort = false;
        this.oProductsTable = this.oView.byId("productsTable");
        this.oRouter = this.getOwnerComponent().getRouter();
      },

      onSelectionChange: function (oEvent) {
        var dbListModel = this.getView().getModel("dbList");
        var usedListModel = this.getView().getModel("usedList");

        const selected = oEvent.getParameters().selected;
        const selectedItem = oEvent
          .getParameters()
          .listItem.getBindingContext("viewData")
          .getObject();

        if (selected) {
          dbListModel
            .getProperty("/DBList")
            .setData(selectedItem.getObject("/DBList"));

          usedListModel
            .getProperty("/PlAufList")
            .setData(selectedItem.getObject("/PlAufList"));
        } else {
        }
      },

      onListItemPress: function (oEvent) {
        var productPath = oEvent
            .getSource()
            .getBindingContext("viewData")
            .getPath(),
          product = productPath.split("/").slice(-1).pop(),
          oNextUIState;
        this.getOwnerComponent()
          .getHelper()
          .then(
            function (oHelper) {
              oNextUIState = oHelper.getNextUIState(1);
              this.oRouter.navTo("detail", {
                layout: oNextUIState.layout,
                product: product,
              });
            }.bind(this)
          );
      },
    });
  }
);
