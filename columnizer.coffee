jQuery.fn.makeacolumnlists = (settings) ->
  settings = jQuery.extend(
    cols: 2
    colWidth: 0
    equalHeight: false
    startN: 1
  , settings)
  if jQuery("> li", this)
    @each (y) ->
      y = jQuery(".li_container").size()
      height = 0
      maxHeight = 0
      t = jQuery(this)
      classN = t.attr("class")
      listsize = jQuery("> li", this).size()
      percol = Math.ceil(listsize / settings.cols)
      contW = t.width()
      bl = (if isNaN(parseInt(t.css("borderLeftWidth"), 10)) then 0 else parseInt(t.css("borderLeftWidth"), 10))
      br = (if isNaN(parseInt(t.css("borderRightWidth"), 10)) then 0 else parseInt(t.css("borderRightWidth"), 10))
      pl = parseInt(t.css("paddingLeft"), 10)
      pr = parseInt(t.css("paddingRight"), 10)
      ml = parseInt(t.css("marginLeft"), 10)
      mr = parseInt(t.css("marginRight"), 10)
      col_Width = Math.floor((contW - (settings.cols - 1) * (bl + br + pl + pr + ml + mr)) / settings.cols)
      col_Width = settings.colWidth  if settings.colWidth
      colnum = 1
      percol2 = percol
      jQuery(this).addClass("li_cont1").wrap "<div id=\"li_container" + (++y) + "\" class=\"li_container\"></div>"
      i = 0

      while i <= listsize
        if i >= percol2
          percol2 += percol
          colnum++
        eq = jQuery("> li:eq(" + i + ")", this)
        eq.addClass "li_col" + colnum
        eq.attr("value", "" + (i + settings.startN)) + ""  if jQuery(this).is("ol")
        i++
      jQuery(this).css
        cssFloat: "left"
        width: "" + col_Width + "px"

      colnum = 2
      while colnum <= settings.cols
        if jQuery(this).is("ol")
          jQuery("li.li_col" + colnum, this).appendTo("#li_container" + y).wrapAll "<ol class=\"li_cont" + colnum + " " + classN + "\" style=\"float:left; width: " + col_Width + "px;\"></ol>"
        else
          jQuery("li.li_col" + colnum, this).appendTo("#li_container" + y).wrapAll "<ul class=\"li_cont" + colnum + " " + classN + "\" style=\"float:left; width: " + col_Width + "px;\"></ul>"
        colnum++
      if settings.equalHeight is "li"
        colnum = 1
        while colnum <= settings.cols
          jQuery("#li_container" + y + " li").each ->
            e = jQuery(this)
            border_top = (if isNaN(parseInt(e.css("borderTopWidth"), 10)) then 0 else parseInt(e.css("borderTopWidth"), 10))
            border_bottom = (if isNaN(parseInt(e.css("borderBottomWidth"), 10)) then 0 else parseInt(e.css("borderBottomWidth"), 10))
            height = e.height() + parseInt(e.css("paddingTop"), 10) + parseInt(e.css("paddingBottom"), 10) + border_top + border_bottom
            maxHeight = (if (height > maxHeight) then height else maxHeight)
          colnum++
        colnum = 1
        while colnum <= settings.cols
          eh = jQuery("#li_container" + y + " li")
          border_top = (if isNaN(parseInt(eh.css("borderTopWidth"), 10)) then 0 else parseInt(eh.css("borderTopWidth"), 10))
          border_bottom = (if isNaN(parseInt(eh.css("borderBottomWidth"), 10)) then 0 else parseInt(eh.css("borderBottomWidth"), 10))
          mh = maxHeight - (parseInt(eh.css("paddingTop"), 10) + parseInt(eh.css("paddingBottom"), 10) + border_top + border_bottom)
          eh.height mh
          colnum++
      else if settings.equalHeight is "ul" or settings.equalHeight is "ol"
        colnum = 1
        while colnum <= settings.cols
          jQuery("#li_container" + y + " .li_cont" + colnum).each ->
            e = jQuery(this)
            border_top = (if isNaN(parseInt(e.css("borderTopWidth"), 10)) then 0 else parseInt(e.css("borderTopWidth"), 10))
            border_bottom = (if isNaN(parseInt(e.css("borderBottomWidth"), 10)) then 0 else parseInt(e.css("borderBottomWidth"), 10))
            height = e.height() + parseInt(e.css("paddingTop"), 10) + parseInt(e.css("paddingBottom"), 10) + border_top + border_bottom
            maxHeight = (if (height > maxHeight) then height else maxHeight)
          colnum++
        colnum = 1
        while colnum <= settings.cols
          eh = jQuery("#li_container" + y + " .li_cont" + colnum)
          border_top = (if isNaN(parseInt(eh.css("borderTopWidth"), 10)) then 0 else parseInt(eh.css("borderTopWidth"), 10))
          border_bottom = (if isNaN(parseInt(eh.css("borderBottomWidth"), 10)) then 0 else parseInt(eh.css("borderBottomWidth"), 10))
          mh = maxHeight - (parseInt(eh.css("paddingTop"), 10) + parseInt(eh.css("paddingBottom"), 10) + border_top + border_bottom)
          eh.height mh
          colnum++
      jQuery("#li_container" + y).append "<div style=\"clear:both; overflow:hidden; height:0px;\"></div>"

jQuery.fn.uncolumnlists = ->
  jQuery(".li_cont1").each (i) ->
    onecolSize = jQuery("#li_container" + (++i) + " .li_cont1 > li").size()
    if jQuery("#li_container" + i + " .li_cont1").is("ul")
      jQuery("#li_container" + i + " > ul > li").appendTo "#li_container" + i + " ul:first"
      j = 1

      while j <= onecolSize
        jQuery("#li_container" + i + " ul:first li").removeAttr("class").removeAttr "style"
        j++
      jQuery("#li_container" + i + " ul:first").removeAttr("style").removeClass("li_cont1").insertBefore "#li_container" + i
    else
      jQuery("#li_container" + i + " > ol > li").appendTo "#li_container" + i + " ol:first"
      j = 1

      while j <= onecolSize
        jQuery("#li_container" + i + " ol:first li").removeAttr("class").removeAttr "style"
        j++
      jQuery("#li_container" + i + " ol:first").removeAttr("style").removeClass("li_cont1").insertBefore "#li_container" + i
    jQuery("#li_container" + i).remove()