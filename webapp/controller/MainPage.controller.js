sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  var input;
  return Controller.extend("lp.fscomposer.controller.MainPage", {
    onInit: function () {},

    handleValueChange: function (e) {
      sap.ui.core.BusyIndicator.show();
      var file = e.getParameter("files") && e.getParameter("files")[0];
      if (file && window.FileReader) {
        var reader = new FileReader();
        var that = this;
        reader.onload = function (evn) {
          var strCSV = evn.target.result;
          console.log(strCSV);

          // create XHR object
          var xhttp = new XMLHttpRequest();

          xhttp.onreadystatechange = function () {
            // 4 means request is finished and response is ready
            // 200 means ok
            if (this.readyState == 4 && this.status == 200) {
              // this refers here to the XHR object
              sap.base.Log.info(this.responseText);
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

    handleUploadPress: function () {
      var oFileUploader = this.byId("fileUploader");
      if (!oFileUploader.getValue()) {
        MessageToast.show("Choose a file first");
        return;
      }
      oFileUploader.upload();
    },
  });
});
