sap.ui.define(
  [
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/MessageBox",
  ],
  function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox) {
    "use strict";

    return Controller.extend("sap.ui.demo.fiori2.controller.Master", {
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
