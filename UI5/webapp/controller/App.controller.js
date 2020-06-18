sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/core/mvc/Controller", "sap/ui/core/util/File"], function (JSONModel, Controller, File) {
  "use strict";

  return Controller.extend("sap.ui.demo.fiori2.controller.App", {
    onInit: function () {
      this.oOwnerComponent = this.getOwnerComponent();
      this.oRouter = this.oOwnerComponent.getRouter();
      this.oRouter.attachRouteMatched(this.onRouteMatched, this);

      this.getView().getModel("dbList").setXML("<root><DBList></DBList></root>");

      this.getView().getModel("usedList").setXML("<root><PlAufList></PlAufList></root>");
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

      this.getView().getModel().setProperty("/filename", file.name);

      if (file && window.FileReader) {
        const reader = new FileReader();
        const that = this;
        reader.onload = function (evn) {
          const strCSV = evn.target.result;

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
              frontendModel.setXML(model.getObject("/PuzzelGroupModel").outerHTML);
              saveModel.setXML(model.getObject("/SAP2LEPO").outerHTML);
              console.log("View-Data-Model");
              console.log(frontendModel);
            }
          };

          // set the XHR request parameters
          xhttp.open("POST", "https://composer-bright-wolf-ui.cfapps.us10.hana.ondemand.com/sap2lepo?withFrontendInformation=true", true);
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
      var file = this.getView().getModel().getProperty("/filename");
      const fileparts = file.split(".");
      var filename = "default";
      var fileExtension = "xml";
      if (fileparts.length === 2) {
        filename = fileparts[0] + "_OUT";
        fileExtension = fileparts[1];
      }

      const saveDataModel = this.getView().getModel("saveData");

      const dbListModel = this.getView().getModel("dbList");
      const usedListModel = this.getView().getModel("usedList");

      const dbListElement = dbListModel.getObject("/DBList").cloneNode(true);
      const usedListElement = usedListModel.getObject("/PlAufList").cloneNode(true);

      const outputElement = saveDataModel.getObject("/OutPut");

      Array.from(outputElement.children).forEach(function (element) {
        if (element.nodeName === "DBList" || element.nodeName === "PlAufList") {
          outputElement.removeChild(element);
        }
      });

      outputElement.appendChild(dbListElement);
      outputElement.appendChild(usedListElement);

      File.save(saveDataModel.getXML(), filename, fileExtension);
    },
  });
});
