
var site_data;
var jsonObj;
var site_images;
var jsonObj_orig;
var picndoOBJs = {}

// TEMPLATES
var image_manager_templete;
var t_controllers;


$(document).ready(function () {

  $(document).on('mouseenter', '.picndo-editable', function() {
    $(this).css("border", "2px dotted orange");
    $(this).find('.edit_menu').css("visibility", "visible")
  });
  $(document).on('mouseleave', '.picndo-editable', function() {
    // $(this).css("border", "none");
    $(this).css("border", "2px dotted transparent")
    $(this).find('.edit_menu').css("visibility", "hidden")
  });

  $(document).on('click', '.site-link', function(ev) {
    var page_name = $(this).data("name");
    activatePage(page_name);

    ev.preventDefault();
    ev.stopPropagation();
  });

  // $('body').load('html/stracture.html', function() {


  var source = $('#image-manager').html().replace(/[\u200B]/g, '');
  image_manager_templete = Handlebars.compile(source);
  source = $('#t_controllers').html().replace(/[\u200B]/g, '');
  t_controllers = Handlebars.compile(source);

  Handlebars.registerPartial("image-manager-img", $("#image-manager-img").html().replace(/[\u200B]/g, '') );
  Handlebars.registerPartial("image-manager-obj-list", $("#image-manager-obj-list").html().replace(/[\u200B]/g, '') );

  Handlebars.registerHelper("ifCond",function(v1,operator,v2,options) {
    return ifCond(v1,operator,v2,options);
  });

  Handlebars.registerHelper("index_of",function(arr, index_str, options) {
    // return arr[index_str]
    return options.fn( arr[index_str] );
    // return 7
  });

  Handlebars.registerHelper("urlFromImageObj",function(img,size) {
    return url_from_image_element(img,size);
  });

  Handlebars.registerHelper("get_css",function(v1,operator,v2,options) {
    return '';
  });

  Handlebars.registerHelper("get_class",function(v1,operator,v2,options) {
    return '';
  });

  Handlebars.registerHelper("to_text",function(html) {
    return $(html).text();
  });

  Handlebars.registerHelper('include', function(options) {
    var context = {},
        mergeContext = function(obj) {
            for(var k in obj)context[k]=obj[k];
        };
    mergeContext(this);
    mergeContext(options.hash);
    return options.fn(context);
  });



  // $('#content').redactor({
  //   lang:           'he',
  //   imageUpload:    '/siteseditor/image_upload',
  //   // imageUpload:    '/siteseditor/images',
  //   imageGetJson:   '/siteseditor/images',
  //   plugins:        ['fontcolor','fontsize','fullscreen','custombutton'],
  // });

  // $(".floating-menu").draggable( { containment: "#contentcontainer", scroll: false } );
  $(".floating-menu").draggable( { containment: "#draggables-container", scroll: false } );

  // $(window).scroll(function () {
  //   if ($(this).scrollTop() > 600) {
  //     $('.scrollup').fadeIn();
  //   } else {
  //     $('.scrollup').fadeOut();
  //   }
  // });

  // $('.scrollup').click(function () {
  //   $("html, body").animate({
  //     scrollTop: 0
  //   }, 600);
  //   return false;
  // });

  // storeData(1, jsonObj);

  // jsonObj = getData(1);
  site_data = getData(1);
  jsonObj = site_data.site.data;
  site_images = site_data.images;

  // var ldiv1 = jQuery('<div/>', {
  //   class: 'row .picndo-editable'
  // });
  // $("#contentcontainer").append(ldiv1);
  // $.getScript("widgets/" + data.menu.type + "/" + data.menu.type + ".js", function() {
  //   //loadmenu($("#contentcontainer"), "widgets/top-menu/", data);
  //   loadmenu(ldiv1, "widgets/top-menu/", data);
  // });


  var pageData = jsonObj["pages"][jsonObj["menu"]["view"]["active"]];
  //var pageData = jsonObj.site.data.pages[jsonObj.site.data.menu.view.active];

  loadMenu( $("#menucontainer"), $("#contentcontainer"),  pageData );
  loadPage( $("#contentcontainer"), pageData, jsonObj["widgets"] );

  // $(".mypopover").popover({ trigger: "hover" });
  $('[data-toggle="popover"]').popover( { /*placement: "auto right"*/ });


  jsonObj_orig = _.clone(jsonObj, true);
  start_diff();



  // });
});

function start_diff() {
  window.setInterval( function() {

    var current = _.clone(jsonObj, true);

    remove_ids(jsonObj_orig);

    // active & element ids may change
    current.menu.view.active = jsonObj_orig.menu.view.active ;
    remove_ids(current);

    if (!(_.isEqual(jsonObj_orig, current))) {
      // modification happened => alert user
      $("#save-btn").css( "display", "block" );
    }
  }, 5000);
}

function save_diff() {
  storeData(1, jsonObj);
  jsonObj_orig = _.clone(jsonObj, true);

  $.ajax({
    type: "PUT",
    url: '/sites/' + current_site,
    // data: { 'json' : JSON.stringify(jsonObj) },
    data: { "data": JSON.stringify(jsonObj), },
    success: function() {
      alert('saved!!!');
    },
    dataType: 'json'
  });

  $("#save-btn").css( "display", "none" );
}

function remove_ids(lobj) {
  for (var key in lobj.pages) {
    if (lobj.pages.hasOwnProperty(key)) {
      for (var i=0 ; i<lobj.pages[key].length ; i++) {
        delete lobj.pages[key][i]['id'];
      }
    }
  }
}



function activatePage(pName) {
  // data = getData(1);
  data = jsonObj;
  data["menu"]["view"]["active"] = pName;
  var pageData = data["pages"][data["menu"]["view"]["active"]];
  cleanPage($("#contentcontainer"), $("#contentcontainer"), pName);

  loadMenu( $("#menucontainer"), $("#contentcontainer"), pageData );
  loadPage( $("#contentcontainer"), pageData, jsonObj["widgets"] );

  // load next/prev page if needed
  var next_prev = next_prev_page(pName);
  if (next_prev.next && next_prev.prev) {
    //alert ("next " + next_prev.next.h1 + "<=> prev " + next_prev.prev.h1);
    $.get('/handlebars_templates/next_prev.html', function (ldata) {
      var l_template = Handlebars.compile(ldata);
      var l_html = l_template( { next:next_prev.next, prev:next_prev.prev, } );
      $("#contentcontainer").append(l_html);

    });
  }

}

function cleanPage(container, menuContainer, pName) {
  container.empty();      // clean container
  menuContainer.empty();  // clean menu
  picndoOBJs = {};        // clean all objects
}

var elementsCounter = 0;

// TBD - TODO
function modifyMenuType() {

}

function loadMenu(container, contentcontainer, pData) {

  // empty menu
  container.empty();

  // remove all classes
  container.removeClass();
  contentcontainer.removeClass();

  var elId = 'picndo-obj' + elementsCounter;
  elementsCounter++;

  jsonObj["menu"]["id"] = elId;

  cbObj = {
    "elId"        : elId,
    "widget_name" : "menu",
    // "container"   : ldiv1,
    "container"   : container,
    "content"     : contentcontainer,
    "data"        : jsonObj["menu"],
    "path"        : "widgets/top-menu/",
  };

  loadWidgetSctipt("/assets/widgets/top-menu/top-menu.js", cbObj);
}

function loadPage(container, pData, widgets) {

  // Elements
  var i;
  for (i=0; i<pData["widgets"].length; i++) {

    var elId = 'picndo-obj' + elementsCounter;
    var ldiv = jQuery('<div/>', {
      class: 'picndo-row picndo-editable',
      id: elId,
    });
    container.append(ldiv);
    elementsCounter++;

    var widget = widgets[ pData["widgets"][i] ];
    widget["id"] = elId;

    cbObj = {
      "widget_name":widget["widget_name"],
      "container":ldiv,
      "data":widget,
    }

    switch (widget["widget_name"]) {

      case 'slick-gallery':
        cbObj["path"] = "widgets/galleries/slick-scrolling-gallery/";
        loadWidgetSctipt("widgets/galleries/slick-scrolling-gallery/gallery.js", cbObj);
        break;

      case 'masonary-gallery':
        cbObj["path"] = "widgets/galleries/masonary/";
        loadWidgetSctipt("widgets/galleries/masonary/gallery.js", cbObj);
        break;

      case 'square-gallery':
        cbObj["path"] = "widgets/galleries/square/";
        loadWidgetSctipt("widgets/galleries/square/gallery.js", cbObj);
        break;

      case 'full-width-gallery':
        cbObj["path"] = "widgets/galleries/full-width/";
        loadWidgetSctipt("widgets/galleries/full-width/gallery.js", cbObj);
        break;

      case 'flow-gallery':
        cbObj["path"] = "widgets/galleries/image-flow/";
        loadWidgetSctipt("widgets/galleries/image-flow/image-flow.js", cbObj);
        break;

      case 'general-txt':
        cbObj["path"] = "widgets/froala-txt/";
        loadWidgetSctipt("widgets/froala-txt/froala-txt.js", cbObj);
        break;

      case 'multi-elements':
        cbObj["path"] = "widgets/multi-elements/";
        loadWidgetSctipt("widgets/multi-elements/multi-elements.js", cbObj);
        break;

      case 'contact':
        cbObj["path"] = "widgets/contact/";
        loadWidgetSctipt("widgets/contact/contact.js", cbObj);
        break;

      default:
        alert("loadPage Unknown widget element");
        break;
    }
  }

}

// function loadMenu() {
//   var elId = 'picndo-obj' + elementsCounter;

//   var ldiv1 = jQuery('<div/>', {
//     // class: 'container-fluid'
//     class: 'container',
//     id:elId
//   }).append( jQuery('<div/>', {
//     class: 'row .picndo-editable'
//   }));

//   container.append(ldiv1);

//   cbObj = {
//     "widget_name":pData[i]["widget_name"],
//     "container":ldiv,
//     "path":"widgets/galleries/slick-scrolling-gallery/",
//     "data":pData[i],
//   }

//   // $.getScript("widgets/" + data.menu.type + "/" + data.menu.type + ".js", function() {
//   $.getScript("widgets/" + jsonObj.menu.type + "/" + jsonObj.menu.type + ".js", function() {
//     //loadmenu($("#contentcontainer"), "widgets/top-menu/", data);
//     loadmenu(ldiv1, "widgets/top-menu/", jsonObj);
//   });
// }

// function loadElement( ) {

// }

function remove_obj_from_json(lid) {

  var lactive = jsonObj["menu"]["view"]["active"];
  //var active_len = jsonObj["pages"][lactive].length;
  var active_len = jsonObj["pages"][lactive].widgets.length;

  for (var i = 0; i<active_len; i++) {
    var widget_name = jsonObj["pages"][lactive].widgets[i];
    if (jsonObj.widgets[widget_name].id == lid ) {
      jsonObj["pages"][lactive].widgets.splice(i,1); // remove widget name from page
      delete jsonObj.widgets[widget_name];           // remove from widgets hash
      return true;
    }
    // if ( jsonObj["pages"][lactive].widgets[i].id == lid ) {
    //   jsonObj["pages"][lactive].splice(i, 1);
    //   return true;
    // }
  }

  if ( i == active_len ) {
    alert('failed removing object from json');
    return false;
  }
}

// function createWidget(widgetName, container, pData) {
function createWidget(widgetName, container) {

  container = typeof container !== 'undefined' ? container : $("#contentcontainer");

  var cbObj = {};

  var elId = 'picndo-obj' + elementsCounter;

  var ldiv = jQuery('<div/>', {
    class: 'picndo-row picndo-editable',
    id: elId,
  });
  elementsCounter++;
  container.append(ldiv);

  var widget_name = random_name();
  var ljson = {
    "widget_name":  widgetName,
    "css":          { },
    "data":         { },
    "id":           elId,
    "name":         widget_name,
  };

  var lactive = jsonObj["menu"]["view"]["active"];
  // jsonObj["pages"][lactive].push( ljson );
  jsonObj["pages"][lactive]["widgets"].push( widget_name );
  jsonObj["widgets"][widget_name] = ljson;

  switch (widgetName) {

    case 'general-txt':
      // cbObj = {
      //   "widget_name":widgetName,
      //   "container": ldiv,
      //   "path": "widgets/general-txt/",
      //   "data":jsonObj["pages"][lactive][ jsonObj["pages"][lactive].length-1 ]
      // }

      // loadWidgetSctipt("widgets/general-txt/general-txt.js", cbObj);

      cbObj = {
        "widget_name":'froala-txt',
        "container": ldiv,
        "path": "widgets/froala-txt/",
        // "data":jsonObj["pages"][lactive][ jsonObj["pages"][lactive].length-1 ]
        "data": ljson,
      }

      loadWidgetSctipt("widgets/froala-txt/froala-txt.js", cbObj);
      break;

    case 'multi-elements':
      cbObj = {
        "widget_name":widgetName,
        "container": ldiv,
        "path": "widgets/multi-elements/",
        "data": ljson,
      }

      loadWidgetSctipt("widgets/multi-elements/fmulti-elements.js", cbObj);
      break;

    case 'masonary-gallery':
      cbObj = {
        "widget_name":widgetName,
        "container": ldiv,
        "path": "widgets/galleries/masonary/",
        "data": ljson,
      }

      loadWidgetSctipt("widgets/galleries/masonary/gallery.js", cbObj);
      break

    case 'square-gallery':
      cbObj = {
        "widget_name":widgetName,
        "container": ldiv,
        "path": "widgets/galleries/square/",
        "data": ljson,
      }

      loadWidgetSctipt("widgets/galleries/square/gallery.js", cbObj);
      break

    case 'slick-gallery':
      cbObj = {
        "widget_name":widgetName,
        "container": ldiv,
        "path": "widgets/galleries/slick-scrolling-gallery/",
        "data": ljson,
      }

      loadWidgetSctipt("widgets/galleries/slick-scrolling-gallery/gallery.js", cbObj);
      break

    case 'full-width-gallery':
      cbObj = {
        "widget_name":widgetName,
        "container": ldiv,
        "path": "widgets/galleries/full-width/",
        // "data":jsonObj["pages"][lactive][ jsonObj["pages"][lactive].length-1 ]
        "data": ljson,
      }

      loadWidgetSctipt("widgets/galleries/full-width/gallery.js", cbObj);
      break


    case 'flow-gallery':
      cbObj = {
        "widget_name":widgetName,
        "container": ldiv,
        "path": "widgets/galleries/image-flow/",
        // "data":jsonObj["pages"][lactive][ jsonObj["pages"][lactive].length-1 ]
        "data": ljson,
      }

      loadWidgetSctipt("widgets/galleries/image-flow/image-flow.js", cbObj);
      break

    case 'contact':
      cbObj = {
        "widget_name":widgetName,
        "container": ldiv,
        "path": "widgets/contact/",
        // "data":jsonObj["pages"][lactive][ jsonObj["pages"][lactive].length-1 ]
        "data": ljson,
      }

      loadWidgetSctipt("widgets/contact/contact.js", cbObj);
      break

    default:
      alert("createWidget Unknown widget element: " + widgetName);
      break;
  }

}

function loadWidgetSctipt(jsURL, wData) {
  // TODO => this is wrong to make masonary gallery.js a must for square gallery => load all from header, no dynamically

  // $.getScript( './widgets/galleries/masonary/gallery.js', function( ldata, textStatus, jqxhr ) {
  //   $.ajax({
  //     url: jsURL,
  //     dataType: 'script',
  //     success: function() {
  //       loadWidget(wData);
  //     }
  //   });
  // });
  loadWidget(wData);
}

// function loadWidet(container, wData) {
function loadWidget(wData) {
  var obj = null;

  console.log("loaded widget script for " + wData.widget_name);
  switch (wData["widget_name"]) {
    case 'slick-gallery':
      obj = new PDG_slick_gallery(wData.container, wData.path, wData.data);
      break;
    case 'masonary-gallery':
      obj = new PDG_masonary_gallery(wData.container, wData.path, wData.data);
      break;
    case 'square-gallery':
      obj = new PDG_square_gallery(wData.container, wData.path, wData.data);
      break;
    case 'full-width-gallery':
      obj = new PDG_full_width_gallery(wData.container, wData.path, wData.data);
      break;
    case 'flow-gallery':
      obj = new PDG_image_flow_gallery(wData.container, wData.path, wData.data);
      break;
    // case 'general-txt':
    //   obj = new PDG_general_txt(wData.container, wData.path, wData.data);
    //   break;
    case 'general-txt':
    case 'froala-txt':
      obj = new PDG_froala_txt(wData.container, wData.path, wData.data);
      break;
    case 'multi-elements':
      obj = new PDG_multi_elements(wData.container, wData.path, wData.data);
      break;

    case 'contact':
      obj = new PDG_contact(wData.container, wData.path, wData.data);
      break;

    case 'menu':
      // obj = new PDG_top_menu(wData.container, wData.path, wData.data);
      obj = new PDG_top_menu(wData.path, wData);
      break;

    default:
      alert("loadWidget - Unknown widget element: " + wData["widget_name"]);
      break;
  }

  if (obj != null) {
    // append obj to global scope
    // picndoOBJs[wData.container[0].id] = obj;

    // if (wData.data == undefined) {
    //   var default_data = obj.default_data();
    //   picndoOBJs[wData.container[0].id] = [obj, default_data];
    // } else {
    //   picndoOBJs[wData.container[0].id] = [obj, wData.data];
    // }

    if ( ( 'container' in obj ) && ( obj.container != undefined) ) {
      picndoOBJs[obj.container[0].id] = [obj, obj.data];
    }
    else { // sometimes depends on other usync file loading => returns uninitialized
      picndoOBJs[wData.container[0].id] = [obj, obj.data];
    }


  }
}

// function get_container_for_obj_action(obj) {
//   var widgetContainer = $(obj).parents(".picndo-row")[0];
//   return widgetContainer;
// }

// function get_class_obj_from_container(container) {
//   var class_obj = picndoOBJs[container.id];
//   return class_obj;
// }

// function destroy_obj_and_element_for_event(obj) {
//   var widgetContainer = get_container_for_obj_action(obj);

//   // delete the class obj
//   delete picndoOBJs[widgetContainer.id];

//   // delete the dom element
//   widgetContainer.remove();
// }

// function get_class_obj_for_event(obj) {
//   var widgetContainer = get_container_for_obj_action(obj)
//   var class_obj = get_class_obj_from_container(widgetContainer)
//   return class_obj
// }


// function edit_widget(obj) {
//   var lwidget = get_class_obj_for_event(obj);
//   console.log('Editing ' + lwidget.data.widget_name);
// }



function storeData(index, data) {
  localStorage.setItem(index.toString(), JSON.stringify(data) );
}

function getData(index) {
  var storage_data = JSON.parse(localStorage.getItem(index.toString()) );

  var ldata ;

  $.ajax({
    type: "GET",
    async: false,
    // url: '/siteseditor/save_site',
    url: '/sites/' + current_site,
    // data: { 'json' : JSON.stringify(jsonObj) },
    // data: jsonObj,
    success: function(data) {
      ldata = data;
    },
    error: function (xhr, ajaxOptions, thrownError) {
      var lurl = JSON.parse(xhr.responseText).redirect_url;
      window.location.href = lurl;
    },
    dataType: 'text',
  });

  var ret = JSON.parse(ldata);
  return ret;
  // return storage_data;
}

function remove_page(name) {
  console.log('removing page ' + name);

  // TODO currently do not support multi layer (dropboxed) menus
  console.log( 'TODO currently do not support multi layer (dropboxed) menus' );

  // remove from menu
  for (var i=0; i<jsonObj['menu']['pages'].length; i++) {
    if ( jsonObj['menu']['pages'][i][0]['name'] == name ) {
      jsonObj['menu']['pages'].splice(i, 1);
      break;
    }
  }

  // remove from pages
  delete jsonObj['pages'][name];

  // handle if active
  var active = jsonObj["menu"]["view"]["active"]
  if (name == active) {
    if ( jsonObj['menu']['pages'].length > 0 ) {
      var first = jsonObj['menu']['pages'][0][0]['name'];
      activatePage(first);
    }
  }
}

function add_page(name, add_to_menu, part_of_list) {

  add_to_menu   = typeof add_to_menu !== 'undefined' ? add_to_menu : true; // if not passed default true
  part_of_list  = typeof part_of_list !== 'undefined' ? part_of_list : false; // if not passed default false

  // check if such page allready exist
  for (var i=0; i<jsonObj['menu']['pages'].length; i++) {
    if ( jsonObj['menu']['pages'][i][0]['name'] == name ) {
      alert("page named " + name + "already exist")
      return;
    }
  }

  var pageUrl = ("/" + name + ".html");

  if (add_to_menu == true) {
    jsonObj['menu']['pages'].push( [{ "name":name, "url":pageUrl, },] );
  }

  jsonObj['pages'][name] = { "css": {}, "widgets": [], "belongs_to":part_of_list };

  if (add_to_menu == true) {
    activatePage(name);
  }

  return { "name":name, "url":pageUrl };
}

function set_link() {
  var random_name = random_name();
  var page_url = add_page(rando_name, flase); // do not add to menu

}

function next_prev_page(pName) {
  var next_index = null;
  var prev_index = null;

  var page = jsonObj.pages[pName];
  if (page.belongs_to) {
    var widget = jsonObj.widgets[page.belongs_to];
    var length = widget.data.elements.length;

    if (length > 1) {
      // find current page in  elements
      for (var i=0; i<length; i++) {
        if ( widget.data.elements[i].name == pName ) {
          next_index = (i+1)%length
          prev_index = (i == 0) ? (length-1) : (i-1)
        }
      }
    }
  }
  if ( (next_index != null) && (prev_index != null) ) {
    return { "prev" : widget.data.elements[prev_index], "next": widget.data.elements[next_index] }
  } else {
    return { }
  }
}

function random_name() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
}

var g_query_string_params = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  }
    return query_string;
} ();


