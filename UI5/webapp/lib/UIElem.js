class Property {
  constructor() {
    this.properties = [];
  }
  setPType(ptype) {
    this.ptype = ptype;
  }
  getPType() {
    return this.ptype;
  }
  setName(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  setNameDescr(namedescr) {
    this.namedescr = namedescr;
  }
  getNameDescr() {
    return this.namedescr;
  }
  setValue(value) {
    this.value = value;
  }
  getValue() {
    return this.value;
  }
  setValueDescr(valuedescr) {
    this.valuedescr = valuedescr;
  }
  getValueDescr() {
    return this.valuedescr;
  }
  setIcon(icon) {
    this.icon = icon;
  }
  getIcon() {
    return this.icon;
  }
  setProperties(properties) {
    this.properties = properties;
  }
  getProperties() {
    return this.properties;
  }
  addProperty(property) {
    this.properties.push(property);
  }
  static fromNode(node) {
    var p = new Property();
    var attributes = node.children;
    for (var i = 0; i < attributes.length; i++) {
      switch (attributes[i].getAttribute("Name")) {
        case "Ptype":
          p.setPType(attributes[i].getAttribute("Value"));
          break;
        case "Name":
          p.setName(attributes[i].getAttribute("Value"));
          break;
        case "Name_Descr":
          p.setNameDescr(attributes[i].getAttribute("Value"));
          break;
        case "Value":
          p.setValue(attributes[i].getAttribute("Value"));
          break;
        case "Value_Descr":
          p.setValueDescr(attributes[i].getAttribute("Value"));
          break;
        case "Icon":
          p.setIcon(attributes[i].getAttribute("Value"));
          break;
        case "Properties":
          var sub_properties = attributes[i];
          var subprop_nodes = sub_properties.children;
          for (var i = 0; i < subprop_nodes.length; i++) {
            var subprop = this.fromNode(subprop_nodes[i]);
            if (!subprop.IsEmpty) {
              p.addProperty(subprop);
            }
          }
          break;
      }
    }
    return p;
  }
  static toNode(prop, name) {
    var elP;
    if (prop !== null && prop !== undefined) {
      if (name !== null && name !== undefined && name.localeCompare("") !== 0)
        elP = createNode(name, null, "C");

      if (
        prop.getPType() !== null &&
        prop.getPType() !== undefined &&
        prop.getPType().localeCompare("") !== 0
      ) {
        elP.appendChild(createNode("Ptype", prop.getPType(), "E"));
      }
      if (
        prop.getName() !== null &&
        prop.getName() !== undefined &&
        prop.getName().localeCompare("") !== 0
      ) {
        elP.appendChild(createNode("Name", prop.getName(), "E"));
      }
      if (
        prop.getNameDescr() !== null &&
        prop.getNameDescr() !== undefined &&
        prop.getNameDescr().localeCompare("") !== 0
      ) {
        elP.appendChild(createNode("Name_Descr", prop.getNameDescr(), "E"));
      }
      if (
        prop.getValue() !== null &&
        prop.getValue() !== undefined &&
        prop.getValue().localeCompare("") !== 0
      ) {
        elP.appendChild(createNode("Value", prop.getValue(), "E"));
      }
      if (
        prop.getValueDescr() !== null &&
        prop.getValueDescr() !== undefined &&
        prop.getValueDescr().localeCompare("") !== 0
      ) {
        elP.appendChild(createNode("Value_Descr", prop.getValueDescr(), "E"));
      }
      if (
        prop.getIcon() !== null &&
        prop.getIcon() !== undefined &&
        prop.getIcon().localeCompare("") !== 0
      ) {
        elP.appendChild(createNode("Icon", prop.getIcon(), "E"));
      }

      if (
        prop.getProperties() !== null &&
        prop.getProperties() !== undefined &&
        prop.getProperties().length > 0
      ) {
        var properties = createNode("Properties", null, "L");
        var props = prop.getProperties();
        for (var i = 0; i < props.length; i++) {
          var childprop = Property.toNode(props[i], "Prop");
          properties.appendChild(childprop);
        }
        elP.appendChild(properties);
      }
    }
    return elP;
  }
}

class UIElem {
  constructor() {
    this.children = [];
    this.x = 0;
    this.y = 0;
    this.w = 200;
    this.h = 50;
    this.rota = 0;
    this.halign = "Left";
    this.valign = "Bottom";
    this.cliptobounds = "False";
    this.recttype = "Initial";
    this.description = "Src";
    this.prio = 0;
    this.clip = "";
    this.showoverbox = false;
    this.ishittestvisible = true;
  }
  setIsHitTestVisible(ishittestvisible) {
    this.ishittestvisible = ishittestvisible;
  }
  getIsHitTestVisible() {
    return this.ishittestvisible;
  }
  setShowOverBox(showoverbox) {
    this.showoverbox = showoverbox;
  }
  getShowOverBox() {
    return this.showoverbox;
  }
  setClip(clip) {
    this.clip = clip;
  }
  getClip() {
    return this.clip;
  }
  setPrio(prio) {
    this.prio = prio;
  }
  getPrio() {
    return this.prio;
  }
  setProperties(properties) {
    this.properties = properties;
  }
  getProperties() {
    return this.properties;
  }
  setSVG(svg) {
    this.svg = svg;
  }
  getSVG() {
    return this.svg;
  }
  setRota(rota) {
    this.rota = rota;
  }
  getRota() {
    return this.rota;
  }
  setX(x) {
    this.x = x;
  }
  getX() {
    return this.x;
  }
  setY(y) {
    this.y = y;
  }
  getY() {
    return this.y;
  }
  setW(w) {
    this.w = w;
  }
  getW() {
    return this.w;
  }
  setH(h) {
    this.h = h;
  }
  getH() {
    return this.h;
  }
  setHAlign(halign) {
    this.halign = halign;
  }
  getHAlign() {
    return this.halign;
  }
  setVAlign(valign) {
    this.valign = valign;
  }
  getVAlign() {
    return this.valign;
  }
  setClipToBounds(cliptobounds) {
    this.cliptobounds = cliptobounds;
  }
  getClipToBounds() {
    return this.cliptobounds;
  }
  setChildren(children) {
    this.children = children;
  }
  getChildren() {
    return this.children;
  }
  addChild(elem) {
    this.children.push(elem);
    if (this.getSVG() !== null && this.getSVG() !== undefined) {
      if (this.getElemType().localeCompare("Text") === 0) {
        this.getSVG().get(0).get(2).add(elem.toSVG());
      } else if (this.getElemType().localeCompare("Container") === 0) {
        this.getSVG().get(0).get(0).add(elem.toSVG());
      } else {
        this.getSVG().get(0).get(1).add(elem.toSVG());
      }
    }
  }
  setElemType(elemtype) {
    this.elemtype = elemtype;
  }
  getElemType() {
    return this.elemtype;
  }
  setRectType(recttype) {
    this.recttype = recttype;
  }
  getRectType() {
    return this.recttype;
  }
  setDescription(description) {
    this.description = description;
  }
  getDescription() {
    return this.description;
  }
  setParent(parent) {
    this.parent = parent;
  }
  getParent() {
    return this.parent;
  }
  remove() {
    if ((this.getSVG() !== null) & (this.getSVG() !== undefined))
      this.getSVG().remove();
    var idx = this.getParent().getChildren().indexOf(this);
    this.getParent().getChildren().splice(idx, 1);
  }
  toSVG(barcodeCounter = 0) {
    var pos = retPosAdjustedToAlignment(this);
    var x = pos[0];
    var y = pos[1];
    var w = this.getW();
    var h = this.getH();
    var r = this.getRota();
    var enclosingSVG = SVG()
      .nested()
      .attr({ x: mmToP(x), y: mmToP(y), width: mmToP(w), height: mmToP(h) });
    if (this.getClipToBounds().localeCompare("False") === 0) {
      enclosingSVG.attr({ overflow: "visible" });
    } else {
      enclosingSVG.attr({ overflow: "hidden" });
    }
    var grp = enclosingSVG.group();

    grp.rotate(this.getRota(), mmToP(w / 2), mmToP(h / 2));

    switch (this.getElemType()) {
      case "Container":
        break;
      case "Tile":
        var tile = this.getUIElemToTile();
        if (tile !== null && tile !== undefined) {
          var tmp = document.createElement("div");
          tmp.setAttribute("id", "tmp");
          document.body.append(tmp);
          var svg = SVG().addTo("#tmp");
          var pattern = svg.pattern(
            mmToP(parseFloat(tile.getW()) + parseFloat(tile.getX())),
            mmToP(parseFloat(tile.getH()) + parseFloat(tile.getY())),
            function (add) {
              add.add(tile.toSVG(barcodeCounter));
            }
          );
          var childs = svg.children();
          for (var i = 0; i < childs.length; i++) {
            enclosingSVG.add(childs[i]);
          }
          tmp.parentElement.removeChild(tmp);

          var rect = grp.rect().size(mmToP(w), mmToP(h));
          rect.attr({ fill: pattern });
        }
        break;
      case "BarCode":
        var lineColor = new Color(this.getForeground());
        var background = new Color(this.getBackground());

        var tmp = document.createElement("div");
        tmp.setAttribute("id", "tmp");
        document.body.append(tmp);
        var id = "barcode" + barcodeCounter;
        barcodeCounter++;
        var barcode = SVG()
          .addTo("#tmp")
          .attr({
            width: mmToP(this.getW()),
            height: mmToP(this.getH()),
            id: id,
          });
        if (this.getText() !== null && this.getText().localeCompare("") !== 0) {
          JsBarcode("#" + id, this.getText(), {
            height: mmToP(this.getH()),
            displayValue: false,
            format: "CODE128A",
            lineColor: lineColor.toHex(),
            background: background.toHex(),
            margin: 0,
          });
        }
        grp.add(barcode);
        tmp.parentElement.removeChild(tmp);
        break;
      case "PDFPage":
        var uielem = this;
        var pagenr = uielem.getPageNr();
        var base64 = uielem.getBase64();
        if (
          base64 !== null &&
          base64 !== undefined &&
          base64.localeCompare("") !== 0
        ) {
          var pdfdata = atob(base64);
          pdfjsLib.getDocument({ data: pdfdata }).promise.then(
            function getPdfHelloWorld(pdf) {
              pdf.getPage(pagenr).then(
                function (page) {
                  var scale = 1.0;
                  var viewport = page.getViewport({ scale: scale });

                  var canvas = document.createElement("canvas");
                  var context = canvas.getContext("2d");
                  canvas.height = viewport.height;
                  canvas.width = viewport.width;

                  var task = page.render({
                    canvasContext: context,
                    background: "rgba(0,0,0,0)",
                    viewport: viewport,
                  });

                  task.promise.then(
                    function () {
                      var base64 = canvas.toDataURL("image/png");
                      var img = grp.image(base64);
                      img.size(viewport.width / scale, viewport.height / scale);
                      var xdif = mmToP(uielem.getW()) - img.width();
                      var ydif = mmToP(uielem.getH()) - img.height();
                      img.attr({ x: xdif / 2, y: ydif / 2 });
                    },
                    function (reason) {
                      //							  console.error(reason);
                    }
                  );
                },
                function (reason) {
                  //						  console.error(reason);
                }
              );
            },
            function (reason) {
              //					  console.error(reason);
            }
          );
        } else {
          console.log("PDF-Datei kann nicht gerendert werden.");
        }
        break;
      case "Text":
        var backcolor = new Color(this.getBackground());

        var background = grp.rect();
        background.attr({
          fill: backcolor.toSVGJS(),
          opacity: backcolor.getOpacity(),
        });

        var text = grp.plain(this.getText());

        var fontcolor = new Color(this.getFontColor());
        text.font({
          family: this.getFontName(),
          size: this.getFontSize(),
          fill: fontcolor.toSVGJS(),
          opacity: fontcolor.getOpacity(),
        });

        var bbox = text.bbox();
        var height = bbox.height;
        var width = bbox.width;
        text.attr({ y: height });
        enclosingSVG.attr({ width: width, height: height });
        bbox = enclosingSVG.bbox();
        height = bbox.height;
        width = bbox.width;
        background.attr({ width: width, height: height });
        break;
      case "Rect":
        var rect = grp.rect(mmToP(w), mmToP(h));

        var fillColorAndOpacity = new Color(this.getFillColor());
        rect.fill({
          color: fillColorAndOpacity.toSVGJS(),
          opacity: fillColorAndOpacity.getOpacity(),
        });
        var borderColorAndOpacity = new Color(this.getBorderColor());
        rect.stroke({
          color: borderColorAndOpacity.toSVGJS(),
          opacity: borderColorAndOpacity.getOpacity(),
          width: this.getBorderThickness(),
        });
        break;
      case "Line":
        var colorAndOpacity = new Color(this.getColor());
        var x1 = this.getX1() - this.getX();
        var x2 = this.getX2() - this.getX();
        var y1 = this.getY1() - this.getY();
        var y2 = this.getY2() - this.getY();

        var line = grp.line(mmToP(x1), mmToP(y1), mmToP(x2), mmToP(y2)).stroke({
          color: colorAndOpacity.toSVGJS(),
          width: mmToP(this.getThickness()),
          opacity: colorAndOpacity.getOpacity(),
        });
        break;
      case "Ellipse":
        var ellipse = grp.ellipse(mmToP(w), mmToP(h));

        var fillcolorAndOpacity = new Color(this.getFill());
        ellipse.fill({
          color: fillcolorAndOpacity.toSVGJS(),
          opacity: fillcolorAndOpacity.getOpacity(),
        });

        var strokecolorAndOpacity = new Color(this.getStrokeColor());
        ellipse.stroke({
          color: strokecolorAndOpacity.toSVGJS(),
          opacity: strokecolorAndOpacity.getOpacity(),
          width: this.getThickness(),
        });
        break;
      case "PathGeometry":
        var path = grp.path(this.getGeometry()).attr({
          x: mmToP(x),
          y: mmToP(y),
          width: mmToP(w),
          height: mmToP(h),
        });

        var fillcolorAndOpacity = new Color(this.getFillColor());
        path.fill({
          color: fillcolorAndOpacity.toSVGJS(),
          opacity: fillcolorAndOpacity.getOpacity(),
        });

        var bordercolorAndOpacity = new Color(this.getBorderColor());
        path.stroke({
          color: bordercolorAndOpacity.toSVGJS(),
          opacity: bordercolorAndOpacity.getOpacity(),
          width: this.getBorderThickness(),
        });
        break;
    }
    if (r != 0) {
      var bbox = enclosingSVG.bbox();
      var xMove = bbox.x * -1;
      var yMove = bbox.y;
      enclosingSVG.dmove(xMove, yMove);
    }
    var childgrp = grp.group();
    var children = this.getChildren();
    for (var idx = 0; idx < children.length; idx++) {
      childgrp.add(children[idx].toSVG(barcodeCounter));
    }
    this.setSVG(enclosingSVG);
    return enclosingSVG;
  }

  static fromXML(xmlNode, parent) {
    var uielem;
    var attributes = xmlNode.children;
    for (var i = 0; i < attributes.length; i++) {
      if (attributes[i].getAttribute("Name").localeCompare("ElType") === 0) {
        switch (attributes[i].getAttribute("Value")) {
          case "Rect":
            uielem = new UIElemRect();
            for (var i = 0; i < attributes.length; i++) {
              switch (attributes[i].getAttribute("Name")) {
                case "BorderColor":
                  uielem.setBorderColor(attributes[i].getAttribute("Value"));
                  break;
                case "BorderThickness":
                  uielem.setBorderThickness(
                    attributes[i].getAttribute("Value")
                  );
                  break;
                case "FillColor":
                  uielem.setFillColor(attributes[i].getAttribute("Value"));
                  break;
                case "Margin":
                  uielem.setMargin(attributes[i].getAttribute("Value"));
                  break;
              }
            }
            break;
          case "Line":
            uielem = new UIElemLine();
            for (var i = 0; i < attributes.length; i++) {
              switch (attributes[i].getAttribute("Name")) {
                case "Color":
                  uielem.setColor(attributes[i].getAttribute("Value"));
                  break;
                case "Thickness":
                  uielem.setThickness(attributes[i].getAttribute("Value"));
                  break;
                case "Points":
                  uielem.setPoints(attributes[i].getAttribute("Value"));
                  break;
                case "X1":
                  uielem.setX1(attributes[i].getAttribute("Value"));
                  break;
                case "Y1":
                  uielem.setY1(attributes[i].getAttribute("Value"));
                  break;
                case "X2":
                  uielem.setX2(attributes[i].getAttribute("Value"));
                  break;
                case "Y2":
                  uielem.setY2(attributes[i].getAttribute("Value"));
                  break;
              }
            }
            break;
          case "Text":
            uielem = new UIElemText();
            for (var i = 0; i < attributes.length; i++) {
              switch (attributes[i].getAttribute("Name")) {
                case "Text":
                  uielem.setText(attributes[i].getAttribute("Value"));
                  break;
                case "Background":
                  uielem.setBackground(attributes[i].getAttribute("Value"));
                  break;
                case "FontColor":
                  uielem.setFontColor(attributes[i].getAttribute("Value"));
                  break;
                case "FontName":
                  uielem.setFontName(attributes[i].getAttribute("Value"));
                  break;
                case "FontSize":
                  uielem.setFontSize(attributes[i].getAttribute("Value"));
                  break;
              }
            }
            break;
          case "Container":
            uielem = new UIElemContainer();
            for (var i = 0; i < attributes.length; i++) {
              switch (
                attributes[i].getAttribute("Name")
                //Nothing to Do here
              ) {
              }
            }
            break;
          case "PathGeometry":
            uielem = new UIElemPathGeometry();
            for (var i = 0; i < attributes.length; i++) {
              switch (attributes[i].getAttribute("Name")) {
                case "BorderColor":
                  uielem.setBorderColor(attributes[i].getAttribute("Value"));
                  break;
                case "BorderThickness":
                  uielem.setBorderThickness(
                    attributes[i].getAttribute("Value")
                  );
                  break;
                case "FillColor":
                  uielem.setFillColor(attributes[i].getAttribute("Value"));
                  break;
                case "Geometry":
                  uielem.setGeometry(attributes[i].getAttribute("Value"));
                  break;
              }
            }
            break;
          case "PDFPage":
            uielem = new UIElemPDFPage();
            for (var i = 0; i < attributes.length; i++) {
              switch (attributes[i].getAttribute("Name")) {
                case "PDFFilename":
                  uielem.setPDFFilename(attributes[i].getAttribute("Value"));
                  break;
                case "Base64":
                  uielem.setBase64(attributes[i].getAttribute("Value"));
                  break;
                case "PageNr":
                  uielem.setPageNr(
                    parseFloat(attributes[i].getAttribute("Value"))
                  );
                  break;
              }
            }
            break;
          case "Ellipse":
            uielem = new UIElemEllipse();
            for (var i = 0; i < attributes.length; i++) {
              switch (attributes[i].getAttribute("Name")) {
                case "StrokeColor":
                  uielem.setStrokeColor(attributes[i].getAttribute("Value"));
                  break;
                case "Thickness":
                  uielem.setThickness(attributes[i].getAttribute("Value"));
                  break;
              }
            }
            break;
          case "Tile":
            uielem = new UIElemTile();
            for (var i = 0; i < attributes.length; i++) {
              switch (attributes[i].getAttribute("Name")) {
                case "TileMode":
                  uielem.setTileMode(attributes[i].getAttribute("Value"));
                  break;
                case "UIElemToTile":
                  var tileNode = attributes[i];
                  uielem.setUIElemToTile(UIElem.fromXML(tileNode, uielem));
                  break;
              }
            }
            break;
          case "BarCode":
            uielem = new UIElemBarCode();
            for (var i = 0; i < attributes.length; i++) {
              switch (attributes[i].getAttribute("Name")) {
                case "Text":
                  uielem.setText(attributes[i].getAttribute("Value"));
                  break;
                case "Background":
                  uielem.setBackground(attributes[i].getAttribute("Value"));
                  break;
                case "Foreground":
                  uielem.setForeground(attributes[i].getAttribute("Value"));
                  break;
              }
            }
            break;
        }
        for (var i = 0; i < attributes.length; i++) {
          switch (attributes[i].getAttribute("Name")) {
            // allgemeine UIElem Attribute
            case "Prop":
              uielem.setProperties(Property.fromNode(attributes[i]));
              break;
            case "IsHitTestVisible":
              uielem.setIsHitTestVisible(attributes[i].getAttribute("Value"));
              break;
            case "ShowOverBox":
              uielem.setShowOverBox(attributes[i].getAttribute("Value"));
              break;
            case "Clip":
              uielem.setClip(attributes[i].getAttribute("Value"));
              break;
            case "Prio":
              uielem.setPrio(attributes[i].getAttribute("Value"));
              break;
            case "RectType":
              uielem.setRectType(attributes[i].getAttribute("Value"));
              break;
            case "X":
              uielem.setX(parseFloat(attributes[i].getAttribute("Value")));
              break;
            case "Y":
              uielem.setY(parseFloat(attributes[i].getAttribute("Value")));
              break;
            case "W":
              uielem.setW(parseFloat(attributes[i].getAttribute("Value")));
              break;
            case "H":
              uielem.setH(parseFloat(attributes[i].getAttribute("Value")));
              break;
            case "HAlign":
              uielem.setHAlign(attributes[i].getAttribute("Value"));
              break;
            case "VAlign":
              uielem.setVAlign(attributes[i].getAttribute("Value"));
              break;
            case "Rota":
              uielem.setRota(parseFloat(attributes[i].getAttribute("Value")));
              break;
            case "ClipToBounds":
              uielem.setClipToBounds(attributes[i].getAttribute("Value"));
              break;
            case "Description":
              uielem.setDescription(attributes[i].getAttribute("Value"));
              break;
            case "Children":
              var children = attributes[i].children;
              for (var idx = 0; idx < children.length; idx++) {
                uielem.addChild(UIElem.fromXML(children[idx], uielem));
              }
              break;
          }
        }
      }
    }
    if (typeof parent === "undefined") {
      uielem.setParent(null);
    } else {
      uielem.setParent(parent);
    }
    return uielem;
  }

  static toNode(uielem, name) {
    var root_node = createNode(name, null, "C");

    var properties = Property.toNode(uielem.getProperties(), "Prop");
    if (properties !== null && properties !== undefined) {
      root_node.appendChild(properties);
    }

    root_node.appendChild(createNode("RectType", uielem.getRectType(), "E"));
    root_node.appendChild(createNode("ElType", uielem.getElemType(), "E"));
    root_node.appendChild(
      createNode("Description", uielem.getDescription(), "E")
    );

    root_node.appendChild(createNode("X", uielem.getX(), "E"));
    root_node.appendChild(createNode("Y", uielem.getY(), "E"));

    root_node.appendChild(createNode("W", uielem.getW(), "E"));
    root_node.appendChild(createNode("H", uielem.getH(), "E"));

    root_node.appendChild(createNode("HAlign", uielem.getHAlign(), "E"));
    root_node.appendChild(createNode("VAlign", uielem.getVAlign(), "E"));

    root_node.appendChild(createNode("Prio", uielem.getPrio(), "E"));
    root_node.appendChild(createNode("Rota", uielem.getRota(), "E"));
    root_node.appendChild(
      createNode("ClipToBounds", uielem.getClipToBounds(), "E")
    );

    root_node.appendChild(createNode("Clip", uielem.getClip(), "E"));

    root_node.appendChild(
      createNode("ShowOverBox", uielem.getShowOverBox(), "E")
    );
    root_node.appendChild(
      createNode("IsHitTestVisible", uielem.getIsHitTestVisible(), "E")
    );

    switch (uielem.getElemType()) {
      case "Container":
        break;
      case "Tile":
        root_node.appendChild(
          createNode("TileMode", uielem.getTileMode(), "E")
        );
        root_node.appendChild(
          UIElem.toNode(uielem.getUIElemToTile(), "UIElemToTile")
        );
        break;
      case "BarCode":
        root_node.appendChild(createNode("Text", uielem.getText(), "E"));
        root_node.appendChild(
          createNode("Foreground", uielem.getForeground(), "E")
        );
        root_node.appendChild(
          createNode("Background", uielem.getBackground(), "E")
        );
        break;
      case "PDFPage":
        //			root_node.appendChild(createNode("Base64", uielem.getBase64(), "E"));
        root_node.appendChild(
          createNode("PDFFilename", uielem.getPDFFilename(), "E")
        );
        root_node.appendChild(createNode("PageNr", uielem.getPageNr(), "E"));
        break;
      case "Text":
        root_node.appendChild(createNode("Text", uielem.getText(), "E"));
        root_node.appendChild(
          createNode("Background", uielem.getBackground(), "E")
        );
        root_node.appendChild(
          createNode("FontColor", uielem.getFontColor(), "E")
        );
        root_node.appendChild(
          createNode("FontName", uielem.getFontName(), "E")
        );
        root_node.appendChild(
          createNode("FontSize", uielem.getFontSize(), "E")
        );
        break;
      case "Rect":
        root_node.appendChild(
          createNode("BorderColor", uielem.getBorderColor(), "E")
        );
        root_node.appendChild(
          createNode("BorderThickness", uielem.getBorderThickness(), "E")
        );
        root_node.appendChild(
          createNode("FillColor", uielem.getFillColor(), "E")
        );
        root_node.appendChild(createNode("Margin", uielem.getMargin(), "E"));
        break;
      case "Line":
        root_node.appendChild(createNode("Color", uielem.getColor(), "E"));
        root_node.appendChild(createNode("Points", uielem.getPoints(), "E"));
        root_node.appendChild(
          createNode("Thickness", uielem.getThickness(), "E")
        );
        root_node.appendChild(createNode("X1", uielem.getX1(), "E"));
        root_node.appendChild(createNode("X2", uielem.getX2(), "E"));
        root_node.appendChild(createNode("Y1", uielem.getY1(), "E"));
        root_node.appendChild(createNode("Y2", uielem.getY2(), "E"));
        break;
      case "Ellipse":
        root_node.appendChild(createNode("Fill", uielem.getFill(), "E"));
        root_node.appendChild(
          createNode("StrokeColor", uielem.getStrokeColor(), "E")
        );
        root_node.appendChild(
          createNode("Thickness", uielem.getThickness(), "E")
        );
        break;
      case "PathGeometry":
        root_node.appendChild(
          createNode("BorderColor", uielem.getBorderColor(), "E")
        );
        root_node.appendChild(
          createNode("BorderThickness", uielem.getBorderThickness(), "E")
        );
        root_node.appendChild(
          createNode("FillColor", uielem.getFillColor(), "E")
        );
        root_node.appendChild(
          createNode("Geometry", uielem.getGeometry(), "E")
        );
        break;
    }

    var children = createNode("Children", null, "L");
    var childs = uielem.getChildren();
    for (var i = 0; i < childs.length; i++) {
      var child_node = UIElem.toNode(childs[i], i);
      children.appendChild(child_node);
    }
    root_node.appendChild(children);

    return root_node;
  }

  changeAttribute(attributeName, newValue) {
    if (
      this.getParent() !== null &&
      this.getParent() !== undefined &&
      this.getParent().getElemType().localeCompare("Tile") == 0
    ) {
      switch (attributeName) {
        case "x":
          this.setX(newValue);
          var pos = retPosAdjustedToAlignment(this);
          this.getSVG().attr({ x: mmToP(pos[0]) });
          this.getSVG()
            .parent()
            .width(mmToP(parseFloat(this.getW()) + parseFloat(this.getX())));
          break;
        case "y":
          this.setY(newValue);
          var pos = retPosAdjustedToAlignment(this);
          this.getSVG().attr({ y: mmToP(pos[1]) });
          this.getSVG()
            .parent()
            .height(mmToP(parseFloat(this.getH()) + parseFloat(this.getY())));
          break;
        case "w":
          this.setW(newValue);
          var pos = retPosAdjustedToAlignment(this);
          this.getSVG().attr({ x: mmToP(pos[0]), y: mmToP(pos[1]) });
          this.getSVG()
            .parent()
            .width(mmToP(parseFloat(newValue) + parseFloat(this.getX())));
          break;
        case "h":
          this.setH(newValue);
          var pos = retPosAdjustedToAlignment(this);
          this.getSVG().attr({ x: mmToP(pos[0]), y: mmToP(pos[1]) });
          this.getSVG()
            .parent()
            .height(mmToP(parseFloat(newValue) + parseFloat(this.getY())));
          break;
      }
    }
    switch (attributeName) {
      //allgemein
      case "x":
        this.setX(newValue);
        var pos = retPosAdjustedToAlignment(this);
        this.getSVG().attr({ x: mmToP(pos[0]) });
        break;
      case "y":
        this.setY(newValue);
        var pos = retPosAdjustedToAlignment(this);
        this.getSVG().attr({ y: mmToP(pos[1]) });
        break;
      case "w":
        this.setW(newValue);
        this.getSVG().width(mmToP(this.getW()));
        var pos = retPosAdjustedToAlignment(this);
        this.getSVG().attr({ x: mmToP(pos[0]), y: mmToP(pos[1]) });
        break;
      case "h":
        this.setH(newValue);
        this.getSVG().height(mmToP(this.getH()));
        var pos = retPosAdjustedToAlignment(this);
        this.getSVG().attr({ x: mmToP(pos[0]), y: mmToP(pos[1]) });
        break;
      case "halign":
        this.setHAlign(newValue);
        var pos = retPosAdjustedToAlignment(this);
        this.getSVG().move(mmToP(pos[0]), mmToP(pos[1]));
        break;
      case "valign":
        this.setVAlign(newValue);
        var pos = retPosAdjustedToAlignment(this);
        this.getSVG().move(mmToP(pos[0]), mmToP(pos[1]));
        break;
      case "rota":
        //zuerst vorherige Rotation rückgängig machen
        this.getSVG()
          .get(0)
          .rotate(
            this.getRota() * -1,
            mmToP(this.getW() / 2),
            mmToP(this.getH() / 2)
          );
        this.setRota(newValue);
        //neue Rotation
        this.getSVG()
          .get(0)
          .rotate(newValue, mmToP(this.getW() / 2), mmToP(this.getH() / 2));
        break;
      case "cliptobounds":
        this.setClipToBounds(newValue);
        if (newValue.toLowerCase() === "false") {
          this.getSVG().attr({ overflow: "visible" });
        } else {
          this.getSVG().attr({ overflow: "hidden" });
        }
        break;
      case "description":
        this.setDescription(newValue);
        break;
      case "ishittestvisible":
        this.setIsHitTestVisible(newValue);
        break;
      case "showoverbox":
        this.setShowOverBox(newValue);
        break;
      case "clip":
        this.setClip(newValue);
        break;
      case "prio":
        this.setPrio(newValue);
        break;
      case "recttype":
        this.setRectType(newValue);
        break;
    }
    //Barcode
    if (this.getElemType().localeCompare("BarCode") === 0) {
      var changed = true;
      switch (attributeName) {
        case "background":
          this.setBackground(newValue);
          changed = true;
          break;
        case "foreground":
          this.setForeground(newValue);
          changed = true;
          break;
        case "text":
          this.setText(newValue);
          changed = true;
          break;
      }
      if (changed) {
        var foreground = new Color(this.getForeground());
        var background = new Color(this.getBackground());
        var id = this.getSVG().get(0).get(0).attr("id");
        if (id !== undefined) {
          var barcode = this.getSVG().get(0).get(0);
          barcode.clear();
          JsBarcode("#" + id, this.getText(), {
            height: mmToP(this.getH()),
            displayValue: false,
            format: "CODE128A",
            lineColor: foreground.toHex(),
            background: background.toHex(),
            margin: 0,
          });
        }
      }
    }
    //PDFPage
    if (this.getElemType().localeCompare("PDFPage") === 0) {
      switch (attributeName) {
        case "pdffilename":
          this.setPDFFilename(newValue);
          //this.setBase64(getBase64FromPath(this.getPDFFilename()));
          this.getSVG().replace(this.toSVG());
          break;
        case "pagenr":
          this.setPageNr(parseInt(newValue));
          this.getSVG().replace(this.toSVG());
          break;
      }
    }
    //Text
    if (this.getElemType().localeCompare("Text") === 0) {
      var changed = false;
      switch (attributeName) {
        case "background":
          this.setBackground(newValue);
          var background = new Color(newValue);
          this.getSVG().get(0).get(0).attr({ fill: background.toSVGJS() });
          this.getSVG()
            .get(0)
            .get(0)
            .attr({ opacity: background.getOpacity() });
          break;
        case "fontsize":
          this.setFontSize(newValue);
          this.getSVG().get(0).get(1).font({ size: this.getFontSize() });
          changed = true;
          break;
        case "fontname":
          this.setFontName(newValue);
          this.getSVG().get(0).get(1).font({ family: this.getFontName() });
          changed = true;
          break;
        case "fontcolor":
          this.setFontColor(newValue);
          var fontcolor = new Color(newValue);
          this.getSVG().get(0).get(1).font({ fill: fontcolor.toSVGJS() });
          this.getSVG().get(0).get(1).font({ opacity: fontcolor.getOpacity() });
          break;
        case "text":
          this.setText(newValue);
          this.getSVG().get(0).get(1).words(this.getText());
          changed = true;
          break;
      }
      if (changed) {
        var bbox = this.getSVG().get(0).get(1).bbox();
        var height = bbox.height;
        var width = bbox.width;
        this.getSVG().get(0).get(1).attr({ y: height });
        this.getSVG().attr({ width: width, height: height });
        this.getSVG().get(0).get(0).attr({ width: "1", height: "1" });
        bbox = this.getSVG().bbox();
        height = bbox.height;
        width = bbox.width;
        this.getSVG().get(0).get(0).attr({ width: width, height: height });
      }
    }
    //Rect
    if (this.getElemType().localeCompare("Rect") === 0) {
      switch (attributeName) {
        case "w":
          this.getSVG().get(0).get(0).width(mmToP(this.getW()));
          break;
        case "h":
          this.getSVG().get(0).get(0).height(mmToP(this.getH()));
          break;
        case "borderthickness":
          this.setBorderThickness(newValue);
          this.getSVG()
            .get(0)
            .get(0)
            .attr({ "stroke-width": mmToP(this.getBorderThickness()) });
          break;
        case "bordercolor":
          this.setBorderColor(newValue);
          var bordercolor = new Color(newValue);
          this.getSVG().get(0).get(0).attr({
            stroke: bordercolor.toSVGJS(),
            "stroke-opacity": bordercolor.getOpacity(),
          });
          break;
        case "fillcolor":
          this.setFillColor(newValue);
          var fillcolor = new Color(newValue);
          this.getSVG().get(0).get(0).attr({
            fill: fillcolor.toSVGJS(),
            "fill-opacity": fillcolor.getOpacity(),
          });
          break;
        case "margin":
          this.setMargin(newValue);
          break;
      }
    }
    //Line
    if (this.getElemType().localeCompare("Line") === 0) {
      var changed = false;
      switch (attributeName) {
        case "color":
          this.setColor(newValue);
          var color = new Color(newValue);
          color = convertColor(this.getColor());
          this.getSVG().get(0).get(0).attr({
            stroke: color.toSVGJS(),
            "stroke-opacity": color.getOpacity(),
          });
          break;
        case "thickness":
          this.setThickness(newValue);
          this.getSVG()
            .get(0)
            .get(0)
            .attr({ "stroke-width": this.getThickness() });
          break;
        case "x1":
          this.setX1(newValue);
          changed = true;
          break;
        case "y1":
          this.setY1(newValue);
          changed = true;
          break;
        case "x2":
          this.setX2(newValue);
          changed = true;
          break;
        case "y2":
          this.setY2(newValue);
          changed = true;
          break;
      }
      if (changed) {
        var x = this.getX();
        var y = this.getY();
        var w = this.getW();
        var h = this.getH();
        var x1 = this.getX1() - x;
        var y1 = this.getY1() - y;
        var x2 = this.getX2() - x;
        var y2 = this.getY2() - y;
        this.getSVG()
          .get(0)
          .get(0)
          .plot(mmToP(x1), mmToP(y1), mmToP(x2), mmToP(y2));
        this.getSVG().x(mmToP(x));
        this.getSVG().y(mmToP(y));
        this.getSVG().width(mmToP(w));
        this.getSVG().height(mmToP(h));
      }
    }
    //Ellipse
    if (this.getElemType().localeCompare("Ellipse") === 0) {
      switch (attributeName) {
        case "w":
          this.getSVG()
            .get(0)
            .get(0)
            .radius(mmToP(this.getW() / 2), mmToP(this.getH() / 2));
          this.getSVG()
            .get(0)
            .get(0)
            .attr({ cx: mmToP(this.getW() / 2), cy: mmToP(this.getH() / 2) });
          break;
        case "h":
          this.getSVG()
            .get(0)
            .get(0)
            .radius(mmToP(this.getW() / 2), mmToP(this.getH() / 2));
          this.getSVG()
            .get(0)
            .get(0)
            .attr({ cx: mmToP(this.getW() / 2), cy: mmToP(this.getH() / 2) });
          break;
        case "thickness":
          this.setThickness(newValue);
          this.getSVG().get(0).get(0).stroke({ width: this.getThickness() });
          break;
        case "strokecolor":
          this.setStrokeColor(newValue);
          var strokecolor = new Color(newValue);
          this.getSVG().get(0).get(0).stroke({
            color: strokecolor.toSVGJS(),
            opacity: strokecolor.getOpacity(),
          });
          break;
        case "fill":
          this.setFill(newValue);
          var fill = new Color(newValue);
          this.getSVG().get(0).get(0).fill({
            color: fill.toSVGJS(),
            opacity: fill.getOpacity(),
          });
          break;
      }
    }
    //PathGeometry
    if (this.getElemType().localeCompare("PathGeometry") === 0) {
      switch (attributeName) {
        case "bordercolor":
          this.setBorderColor(newValue);
          var bordercolor = new Color(newValue);
          this.getSVG().get(0).get(0).stroke({
            color: bordercolor.toSVGJS(),
            opacity: bordercolor.getOpacity(),
          });
          break;
        case "borderthickness":
          this.setBorderThickness(newValue);
          this.getSVG().get(0).get(0).stroke({ width: this.getThickness });
          break;
        case "fillcolor":
          this.setFillColor(newValue);
          var fillcolor = new Color(newValue);
          this.getSVG().get(0).get(0).fill({
            color: fillcolor.toSVGJS(),
            opacity: fillcolor.getOpacity(),
          });
          break;
        case "geometry":
          this.setGeometry(newValue);
          this.getSVG().get(0).get(0).plot(this.getGeometry());
          var bbox = this.getSVG().get(0).get(0).bbox;
          this.getSVG().attr({ w: bbox.width, h: bbox.height });
          break;
      }
    }
    //Tile
    if (this.getElemType().localeCompare("Tile") === 0) {
      switch (attributeName) {
        case "w":
          this.getSVG().get(0).get(0).width(mmToP(newValue));
          break;
        case "h":
          this.getSVG().get(0).get(0).height(mmToP(newValue));
          break;
        case "tilemode":
          this.setTileMode(newValue);
          break;
      }
    }
  }
}

function createNode(name, value, role) {
  if (value !== null && value !== undefined) {
    value = value.toString();
  }
  var node = document.createElementNS(null, role);
  node.setAttributeNS(null, "Name", name);
  if (value !== null && value !== undefined && value.localeCompare("") !== 0) {
    node.setAttributeNS(null, "Value", value);
  }
  return node;
}

class UIElemContainer extends UIElem {
  constructor() {
    super();
    this.elemtype = "Container";
  }
}

class UIElemBarCode extends UIElem {
  constructor() {
    super();
    this.elemtype = "BarCode";
    this.background = "RGB[ 0 255 255 255 ]";
    this.foreground = "RGB[ 255 0 0 0 ]";
    this.text = "";
  }
  setBackground(background) {
    this.background = background;
  }
  getBackground() {
    return this.background;
  }
  setForeground(foreground) {
    this.foreground = foreground;
  }
  getForeground() {
    return this.foreground;
  }
  setText(text) {
    this.text = text;
  }
  getText() {
    return this.text;
  }
  setBars(bars) {
    this.bars = bars;
  }
  getBars() {
    return this.bars;
  }
}

class UIElemPDFPage extends UIElem {
  constructor() {
    super();
    this.elemtype = "PDFPage";
    this.pagenr = 1;
    this.pdffilename = "";
  }
  setPageNr(pagenr) {
    this.pagenr = pagenr;
  }
  getPageNr() {
    return this.pagenr;
  }
  setPDFFilename(pdffilename) {
    this.pdffilename = pdffilename;
  }
  getPDFFilename() {
    return this.pdffilename;
  }
  setBase64(base64) {
    this.base64 = base64;
  }
  getBase64() {
    return this.base64;
  }
}

class UIElemText extends UIElem {
  constructor() {
    super();
    this.elemtype = "Text";
    this.fontsize = 12;
    this.fontname = "Lucida Console";
    this.text = "";
    this.background = "RGB[ 0 255 255 255 ]";
    this.fontcolor = "RGB[ 255 0 0 0 ]";
  }
  setFontSize(fontsize) {
    this.fontsize = fontsize;
  }
  getFontSize() {
    return this.fontsize;
  }
  setFontName(fontname) {
    this.fontname = fontname;
  }
  getFontName() {
    return this.fontname;
  }
  setText(text) {
    this.text = text;
  }
  getText() {
    return this.text;
  }
  setBackground(background) {
    this.background = background;
  }
  getBackground() {
    return this.background;
  }
  setFontColor(fontcolor) {
    this.fontcolor = fontcolor;
  }
  getFontColor() {
    return this.fontcolor;
  }
}

class UIElemRect extends UIElem {
  constructor() {
    super();
    this.elemtype = "Rect";
    this.borderthickness = 0;
    this.fillcolor = "RGB[ 0 255 255 255 ]";
    this.bordercolor = "RGB[ 255 0 0 0 ]";
    this.margin = 0;
  }
  setBorderThickness(borderthickness) {
    this.borderthickness = borderthickness;
  }
  getBorderThickness() {
    return this.borderthickness;
  }
  setBorderColor(bordercolor) {
    this.bordercolor = bordercolor;
  }
  getBorderColor() {
    return this.bordercolor;
  }
  setFillColor(fillcolor) {
    this.fillcolor = fillcolor;
  }
  getFillColor() {
    return this.fillcolor;
  }
  setMargin(margin) {
    this.margin = margin;
  }
  getMargin() {
    return this.margin;
  }
}

class UIElemLine extends UIElem {
  constructor() {
    super();
    this.elemtype = "Line";
    this.color = "RGB[ 0 255 255 255 ]";
    this.thickness = 1;
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
  }
  getX() {
    return Math.min(this.x2, this.x1);
  }
  getY() {
    return Math.min(this.y2, this.y1);
  }
  getW() {
    var x = this.getX();
    var y = this.getY();
    var w = Math.max(Math.abs(x - this.x1), Math.abs(x - this.x2));
    if (w === 0) {
      w = w + this.getThickness();
    }
    return w;
  }
  getH() {
    var x = this.getX();
    var y = this.getY();
    var h = Math.max(Math.abs(y - this.y1), Math.abs(y - this.y2));
    if (h === 0) {
      h = h + this.getThickness();
    }
    return h;
  }
  setPoints(points) {
    this.points = points;
  }
  getPoints() {
    return this.points;
  }
  setColor(color) {
    this.color = color;
  }
  getColor() {
    return this.color;
  }
  setThickness(thickness) {
    this.thickness = thickness;
  }
  getThickness() {
    return this.thickness;
  }
  setX1(x1) {
    this.x1 = x1;
  }
  getX1() {
    return this.x1;
  }
  setY1(y1) {
    this.y1 = y1;
  }
  getY1() {
    return this.y1;
  }
  setX2(x2) {
    this.x2 = x2;
  }
  getX2() {
    return this.x2;
  }
  setY2(y2) {
    this.y2 = y2;
  }
  getY2() {
    return this.y2;
  }
}

class UIElemEllipse extends UIElem {
  constructor() {
    super();
    this.elemtype = "Ellipse";
    this.strokecolor = "RGB[ 0 255 255 255 ]";
    this.fill = "RGB[ 255 255 255 255 ]";
    this.thickness = 0;
  }
  setStrokeColor(strokecolor) {
    this.strokecolor = strokecolor;
  }
  getStrokeColor() {
    return this.strokecolor;
  }
  setThickness(thickness) {
    this.thickness = thickness;
  }
  getThickness() {
    return this.thickness;
  }
  setFill(fill) {
    this.fill = fill;
  }
  getFill() {
    return this.fill;
  }
}

class UIElemPathGeometry extends UIElem {
  constructor() {
    super();
    this.elemtype = "PathGeometry";
    this.bordercolor = "RGB[ 0 255 255 255 ]";
    this.fillcolor = "RGB[ 255 255 255 255 ]";
    this.borderthickness = 0;
    this.geometry = "";
  }
  setBorderColor(bordercolor) {
    this.bordercolor = bordercolor;
  }
  getBorderColor() {
    return this.bordercolor;
  }
  setBorderThickness(borderthickness) {
    this.borderthickness = borderthickness;
  }
  getBorderThickness() {
    return this.borderthickness;
  }
  setFillColor(fillcolor) {
    this.fillcolor = fillcolor;
  }
  getFillColor() {
    return this.fillcolor;
  }
  setGeometry(geometry) {
    this.geometry = geometry;
  }
  getGeometry() {
    return this.geometry;
  }
}

class UIElemTile extends UIElem {
  constructor() {
    super();
    this.elemtype = "Tile";
    this.uielemtotile = null;
    this.tilemode = 0;
  }
  setUIElemToTile(uielemtotile) {
    this.uielemtotile = uielemtotile;
    if (this.svg !== null && this.svg !== undefined) {
      this.setSVG(this.toSVG());
    }
  }
  getUIElemToTile() {
    return this.uielemtotile;
  }
  setTileMode(tilemode) {
    this.tilemode = tilemode;
  }
  getTileMode() {
    return this.tilemode;
  }
}
class Color {
  constructor(color) {
    if (color.startsWith("RGB")) {
      var splittet = color.replace("RGB[ ", "").replace(" ]", "").split(" ");
      this.opacity = parseFloat(splittet[0]);
      this.r = splittet[1];
      this.g = splittet[2];
      this.b = splittet[3];

      var ctmp = 1 - this.r / 255;
      var mtmp = 1 - this.g / 255;
      var ytmp = 1 - this.b / 255;
      var ktmp = Math.min(ctmp, Math.min(mtmp, ytmp));

      ctmp = (ctmp - ktmp) / (1 - ktmp);
      mtmp = (mtmp - ktmp) / (1 - ktmp);
      ytmp = (ytmp - ktmp) / (1 - ktmp);

      this.c = isNaN(ctmp) ? 0 : ctmp;
      this.m = isNaN(mtmp) ? 0 : mtmp;
      this.y = isNaN(ytmp) ? 0 : ytmp;
      this.k = isNaN(ktmp) ? 0 : ktmp;
    } else if (color.startsWith("CMYK")) {
      var splittet = color.replace("CMYK[ ", "").replace(" ]", "").split(" ");
      this.opacity = splittet[0];
      this.c = splittet[1];
      this.m = splittet[2];
      this.y = splittet[3];
      this.k = splittet[4];

      this.r = Math.round(
        (1 - Math.min(1, this.c * (1 - this.k) + this.k)) * 255
      );
      this.g = Math.round(
        (1 - Math.min(1, this.m * (1 - this.k) + this.k)) * 255
      );
      this.b = Math.round(
        (1 - Math.min(1, this.y * (1 - this.k) + this.k)) * 255
      );
    } else {
    }
  }

  getOpacity() {
    return this.opacity;
  }

  toHex() {
    var rtmp = parseInt(this.r).toString(16);
    rtmp = rtmp.length === 1 ? "0" + rtmp : rtmp;
    var gtmp = parseInt(this.g).toString(16);
    gtmp = gtmp.length === 1 ? "0" + gtmp : gtmp;
    var btmp = parseInt(this.b).toString(16);
    btmp = btmp.length === 1 ? "0" + btmp : btmp;
    return "#" + rtmp + gtmp + btmp;
  }

  toSVGJS() {
    return "RGB(" + this.r + ", " + this.g + ", " + this.b + ")";
  }
}

function mmToP(valMM) {
  var valPT = 2.8346438836889 * valMM;
  return valPT;
}

function retPosAdjustedToAlignment(uielem) {
  if (
    uielem.getParent() !== null &&
    uielem.getParent() !== undefined &&
    uielem.getParent().getElemType().localeCompare("Tile") !== 0
  ) {
    var parentWidth = parseFloat(uielem.getParent().getW());
    var parentHeight = parseFloat(uielem.getParent().getH());
    var x = parseFloat(uielem.getX());
    var y = parseFloat(uielem.getY());
    var w = parseFloat(uielem.getW());
    var h = parseFloat(uielem.getH());

    var newX, newY;
    switch (uielem.getHAlign()) {
      case "Left":
        newX = x;
        break;
      case "Right":
        newX = parentWidth - (w + x);
        break;
      case "Center":
      case "Stretch":
        newX = parentWidth / 2 - w / 2;
        break;
    }
    switch (uielem.getVAlign()) {
      case "Top":
        newY = y;
        break;
      case "Bottom":
        newY = parentHeight - (h + y);
        break;
      case "Center":
      case "Stretch":
        newY = parentHeight / 2 - h / 2;
        break;
    }

    return [newX, newY];
  } else {
    return [uielem.getX(), uielem.getY()];
  }
}
