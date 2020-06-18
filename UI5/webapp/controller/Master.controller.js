sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/demo/fiori2/model/formatter"], function (Controller, formatter) {
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
      const dbListModel = this.getView().getModel("dbList");
      const usedListModel = this.getView().getModel("usedList");
      const viewDataModel = this.getView().getModel("viewData");

      const selected = oEvent.getParameters().selected;

      const dbListItem = viewDataModel.getObject(oEvent.getParameters().listItem.getBindingContext("viewData").sPath + "/DBList");
      const plaufListItem = viewDataModel.getObject(oEvent.getParameters().listItem.getBindingContext("viewData").sPath + "/PlAufList");

      if (selected) {
        const dbList = dbListModel.getObject("/DBList");
        Array.from(dbListItem.children).forEach(function (element) {
          const clone = element.cloneNode(true);
          dbList.appendChild(clone);
        });

        const usedList = usedListModel.getObject("/PlAufList");
        Array.from(plaufListItem.children).forEach(function (element) {
          const clone = element.cloneNode(true);
          usedList.appendChild(clone);
        });
      } else {
        const dbList = dbListModel.getObject("/DBList");
        Array.from(dbListItem.children).forEach(function (elementToRemove) {
          //Search through children and look if children has attribute "ID" with same value
          Array.from(dbList.children).forEach(function (elementInList) {
            if (elementToRemove.getAttribute("ID") === elementInList.getAttribute("ID")) {
              dbList.removeChild(elementInList);
            }
          });
        });

        const usedList = usedListModel.getObject("/PlAufList");
        Array.from(plaufListItem.children).forEach(function (elementToRemove) {
          //Search through children and look if children has attribute "ID" with same value
          Array.from(usedList.children).forEach(function (elementInList) {
            if (elementToRemove.getAttribute("ID") === elementInList.getAttribute("ID")) {
              usedList.removeChild(elementInList);
            }
          });
        });
      }
    },

    onListItemPress: function (oEvent) {
      var productPath = oEvent.getSource().getBindingContext("viewData").getPath(),
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
});
