sap.ui.define([], function () {
  "use strict";
  return {
    formatToTwoNumbers: function (number) {
      const float = Number.parseFloat(number);
      if (!Number.isNaN(float)) {
        return float.toFixed(2);
      } else {
        return number;
      }
    },
  };
});
