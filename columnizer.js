(function() {
  jQuery.fn.makeacolumnlists = function(settings) {
    settings = jQuery.extend({
      cols: 2,
      colWidth: 0,
      equalHeight: false,
      startN: 1
    }, settings);
    if (jQuery("> li", this)) {
      return this.each(function(y) {
        var bl, border_bottom, border_top, br, classN, col_Width, colnum, contW, eh, eq, height, i, listsize, maxHeight, mh, ml, mr, percol, percol2, pl, pr, t;
        y = jQuery(".li_container").size();
        height = 0;
        maxHeight = 0;
        t = jQuery(this);
        classN = t.attr("class");
        listsize = jQuery("> li", this).size();
        percol = Math.ceil(listsize / settings.cols);
        contW = t.width();
        bl = (isNaN(parseInt(t.css("borderLeftWidth"), 10)) ? 0 : parseInt(t.css("borderLeftWidth"), 10));
        br = (isNaN(parseInt(t.css("borderRightWidth"), 10)) ? 0 : parseInt(t.css("borderRightWidth"), 10));
        pl = parseInt(t.css("paddingLeft"), 10);
        pr = parseInt(t.css("paddingRight"), 10);
        ml = parseInt(t.css("marginLeft"), 10);
        mr = parseInt(t.css("marginRight"), 10);
        col_Width = Math.floor((contW - (settings.cols - 1) * (bl + br + pl + pr + ml + mr)) / settings.cols);
        if (settings.colWidth) {
          col_Width = settings.colWidth;
        }
        colnum = 1;
        percol2 = percol;
        jQuery(this).addClass("li_cont1").wrap("<div id=\"li_container" + (++y) + "\" class=\"li_container\"></div>");
        i = 0;
        while (i <= listsize) {
          if (i >= percol2) {
            percol2 += percol;
            colnum++;
          }
          eq = jQuery("> li:eq(" + i + ")", this);
          eq.addClass("li_col" + colnum);
          if (jQuery(this).is("ol")) {
            eq.attr("value", "" + (i + settings.startN)) + "";
          }
          i++;
        }
        jQuery(this).css({
          cssFloat: "left",
          width: "" + col_Width + "px"
        });
        colnum = 2;
        while (colnum <= settings.cols) {
          if (jQuery(this).is("ol")) {
            jQuery("li.li_col" + colnum, this).appendTo("#li_container" + y).wrapAll("<ol class=\"li_cont" + colnum + " " + classN + "\" style=\"float:left; width: " + col_Width + "px;\"></ol>");
          } else {
            jQuery("li.li_col" + colnum, this).appendTo("#li_container" + y).wrapAll("<ul class=\"li_cont" + colnum + " " + classN + "\" style=\"float:left; width: " + col_Width + "px;\"></ul>");
          }
          colnum++;
        }
        if (settings.equalHeight === "li") {
          colnum = 1;
          while (colnum <= settings.cols) {
            jQuery("#li_container" + y + " li").each(function() {
              var border_bottom, border_top, e;
              e = jQuery(this);
              border_top = (isNaN(parseInt(e.css("borderTopWidth"), 10)) ? 0 : parseInt(e.css("borderTopWidth"), 10));
              border_bottom = (isNaN(parseInt(e.css("borderBottomWidth"), 10)) ? 0 : parseInt(e.css("borderBottomWidth"), 10));
              height = e.height() + parseInt(e.css("paddingTop"), 10) + parseInt(e.css("paddingBottom"), 10) + border_top + border_bottom;
              return maxHeight = (height > maxHeight ? height : maxHeight);
            });
            colnum++;
          }
          colnum = 1;
          while (colnum <= settings.cols) {
            eh = jQuery("#li_container" + y + " li");
            border_top = (isNaN(parseInt(eh.css("borderTopWidth"), 10)) ? 0 : parseInt(eh.css("borderTopWidth"), 10));
            border_bottom = (isNaN(parseInt(eh.css("borderBottomWidth"), 10)) ? 0 : parseInt(eh.css("borderBottomWidth"), 10));
            mh = maxHeight - (parseInt(eh.css("paddingTop"), 10) + parseInt(eh.css("paddingBottom"), 10) + border_top + border_bottom);
            eh.height(mh);
            colnum++;
          }
        } else if (settings.equalHeight === "ul" || settings.equalHeight === "ol") {
          colnum = 1;
          while (colnum <= settings.cols) {
            jQuery("#li_container" + y + " .li_cont" + colnum).each(function() {
              var e;
              e = jQuery(this);
              border_top = (isNaN(parseInt(e.css("borderTopWidth"), 10)) ? 0 : parseInt(e.css("borderTopWidth"), 10));
              border_bottom = (isNaN(parseInt(e.css("borderBottomWidth"), 10)) ? 0 : parseInt(e.css("borderBottomWidth"), 10));
              height = e.height() + parseInt(e.css("paddingTop"), 10) + parseInt(e.css("paddingBottom"), 10) + border_top + border_bottom;
              return maxHeight = (height > maxHeight ? height : maxHeight);
            });
            colnum++;
          }
          colnum = 1;
          while (colnum <= settings.cols) {
            eh = jQuery("#li_container" + y + " .li_cont" + colnum);
            border_top = (isNaN(parseInt(eh.css("borderTopWidth"), 10)) ? 0 : parseInt(eh.css("borderTopWidth"), 10));
            border_bottom = (isNaN(parseInt(eh.css("borderBottomWidth"), 10)) ? 0 : parseInt(eh.css("borderBottomWidth"), 10));
            mh = maxHeight - (parseInt(eh.css("paddingTop"), 10) + parseInt(eh.css("paddingBottom"), 10) + border_top + border_bottom);
            eh.height(mh);
            colnum++;
          }
        }
        return jQuery("#li_container" + y).append("<div style=\"clear:both; overflow:hidden; height:0px;\"></div>");
      });
    }
  };
  jQuery.fn.uncolumnlists = function() {
    return jQuery(".li_cont1").each(function(i) {
      var j, onecolSize;
      onecolSize = jQuery("#li_container" + (++i) + " .li_cont1 > li").size();
      if (jQuery("#li_container" + i + " .li_cont1").is("ul")) {
        jQuery("#li_container" + i + " > ul > li").appendTo("#li_container" + i + " ul:first");
        j = 1;
        while (j <= onecolSize) {
          jQuery("#li_container" + i + " ul:first li").removeAttr("class").removeAttr("style");
          j++;
        }
        jQuery("#li_container" + i + " ul:first").removeAttr("style").removeClass("li_cont1").insertBefore("#li_container" + i);
      } else {
        jQuery("#li_container" + i + " > ol > li").appendTo("#li_container" + i + " ol:first");
        j = 1;
        while (j <= onecolSize) {
          jQuery("#li_container" + i + " ol:first li").removeAttr("class").removeAttr("style");
          j++;
        }
        jQuery("#li_container" + i + " ol:first").removeAttr("style").removeClass("li_cont1").insertBefore("#li_container" + i);
      }
      return jQuery("#li_container" + i).remove();
    });
  };
}).call(this);
