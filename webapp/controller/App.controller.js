sap.ui.define(
  ["sap/ui/model/json/JSONModel", "sap/ui/core/mvc/Controller"],
  function (JSONModel, Controller) {
    "use strict";

    return Controller.extend("sap.ui.demo.fiori2.controller.App", {
      onInit: function () {
        this.oOwnerComponent = this.getOwnerComponent();
        this.oRouter = this.oOwnerComponent.getRouter();
        this.oRouter.attachRouteMatched(this.onRouteMatched, this);

        this.getView().getModel("dbList").setXML("<DBList></DBList>");
        this.getView().getModel("usedList").setXML("<PlAufList></PlAufList>");
      },

      onRouteMatched: function (oEvent) {
        var sRouteName = oEvent.getParameter("name"),
          oArguments = oEvent.getParameter("arguments");

        this._updateUIElements();

        // Save the current route name
        this.currentRouteName = sRouteName;
        this.currentProduct = oArguments.product;
        this.currentSupplier = oArguments.supplier;
      },

      onStateChanged: function (oEvent) {
        var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
          sLayout = oEvent.getParameter("layout");

        this._updateUIElements();

        // Replace the URL with the new layout if a navigation arrow was used
        if (bIsNavigationArrow) {
          this.oRouter.navTo(
            this.currentRouteName,
            {
              layout: sLayout,
              product: this.currentProduct,
              supplier: this.currentSupplier,
            },
            true
          );
        }
      },

      // Update the close/fullscreen buttons visibility
      _updateUIElements: function () {
        var oModel = this.oOwnerComponent.getModel(),
          oUIState;
        this.oOwnerComponent.getHelper().then(function (oHelper) {
          oUIState = oHelper.getCurrentUIState();
          oModel.setData(oUIState);
        });
      },

      handleValueChange: function (e) {
        sap.ui.core.BusyIndicator.show();
        const file = e.getParameter("files") && e.getParameter("files")[0];
        const model = this.getView().getModel("puzzelData");
        const frontendModel = this.getView().getModel("viewData");
        const saveModel = this.getView().getModel("saveData");

        if (file && window.FileReader) {
          const reader = new FileReader();
          const that = this;
          reader.onload = function (evn) {
            const strCSV = evn.target.result;
            console.log(strCSV);

            // create XHR object
            const xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
              // 4 means request is finished and response is ready
              // 200 means ok
              if (this.readyState == 4 && this.status == 200) {
                // this refers here to the XHR object
                // sap.base.Log.info(this.responseText);
                // console.log(this.responseText);
                model.setXML(this.responseText);
                frontendModel.setXML(
                  model.getObject("/PuzzelGroupModel").outerHTML
                );
                saveModel.setXML(model.getObject("/SAP2LEPO").outerHTML);
                console.log("View-Data-Model");
                console.log(frontendModel);
              }
            };

            // set the XHR request parameters
            xhttp.open(
              "POST",
              "https://localhost:44371/sap2lepo?withFrontendInformation=true",
              true
            );
            xhttp.setRequestHeader("Accept", "*/*");
            xhttp.setRequestHeader("content-type", "application/xml");
            // fire the XHR request with data in body
            xhttp.send(strCSV);

            sap.ui.core.BusyIndicator.hide();
          };
          reader.readAsText(file);
        }
      },

      onExit: function () {
        this.oRouter.detachRouteMatched(this.onRouteMatched, this);
        this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
      },

      onSaveBtnPress: function () {
        const model = this.getView().getModel("viewData");
        const model2 = this.getView().getModel("saveData");
      },
    });
  }
);
