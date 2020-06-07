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
