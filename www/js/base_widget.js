
function BaseWidget(container, path, data, opts) {

  BaseWidget.widgets_count++;
  
  opts = typeof opts !== 'undefined' ? opts : { };

  this.container = container
  this.path = path;
  
  // this.data = data;
  // this.data = typeof data !== 'undefined' ? data : this.default_data();
  this.data = data;
  if ( _.isEqual(data.data, {}) && _.isEqual(data.css, {}) ) {
    var def_data = this.default_data();
    this.data["css"] = def_data.css;
    this.data["data"] = def_data.data;
  }


  this.controllers = {
    'root': {
      'height': { 'val':'400', 'type':'slider', 'range':[100,2000], 'reload':'true', 'el':'.slickcontainer', },
      'margin-top': { 'val':'20', 'type':'slider', 'range':[0,200], 'el':'.slickcontainer', },
      'margin': { 'val':'0', 'type':'slider', 'range':[0,200], 'el':'.slickcontainer .datacontainer', }, // left & right  
    }
  }

  // BaseWidget.load_edit_menu(this.container, opts);
  this.load_edit_menu(this.container, opts);
} 

// static var
BaseWidget.widgets_count = 0;
BaseWidget.widgeteditor_id = "widgetconfigurationcollapse"; //'widgeteditor';


BaseWidget.prototype.load_edit_menu = function(el, opts) {
  var lobj = this;
  $.get( "html/base_widget_edit_menu.html" + '?' + Math.random()*Math.random(), function (ldata) {
    el.append(ldata)
    if ( ('btn1' in opts) /*&& ('btn1CB' in opts)*/ ) {
      var btn_group = el.find(".edit_menu")[0];
      var btn = $('\
        <button type="button" class="btn btn-default btn-lg" aria-label="Left Align" title="Add Image" > \
          <span class="' + opts['btn1'] +'" aria-hidden="true"></span> \
        </button>');
      $(btn_group).append(btn);
      // btn.click( $.proxy(this.addImage, this) );
      console.log('adding on click');
      // var lfunc = $.proxy(lobj.addImage, lobj);
      // btn.on('click', lfunc() );
      // btn.on('click', function() {
      //   alert('clicking');
      // });
      btn.on('click', $.proxy(function(e) {
        this.addImage();
      }, lobj) );
    }
  });
}

// static function
BaseWidget.get_container_for_obj_action = function(obj) {
  var widgetContainer = $(obj).parents(".picndo-row")[0];
  return widgetContainer;
}

BaseWidget.get_class_obj_from_container = function(container) {
  //var class_obj = picndoOBJs[container.id];
  cid = container.id;
  return BaseWidget.get_class_obj_from_container_id(cid);
}

BaseWidget.get_class_obj_from_container_id = function(id) {
  var class_obj = picndoOBJs[id][0];
  return class_obj;
}

BaseWidget.destroy_obj_and_element_for_event = function(obj) {
  var widgetContainer = BaseWidget.get_container_for_obj_action(obj);  

  // delete the dom element
  widgetContainer.remove();

  // remove from json 
  remove_obj_from_json(widgetContainer.id);

  // delete the class obj
  delete picndoOBJs[widgetContainer.id];

}

BaseWidget.save_obj = function(obj) {
  var obj_id = obj.container[0].id;
  picndoOBJs[obj_id][1].data = obj.data.data;
  picndoOBJs[obj_id][1].css = obj.data.css;
}

BaseWidget.get_class_obj_for_event = function(obj) {
  var widgetContainer = BaseWidget.get_container_for_obj_action(obj)
  var class_obj = BaseWidget.get_class_obj_from_container(widgetContainer)
  return class_obj
}

BaseWidget.prototype.default_data = function() {
  alert('default_data not implemented for class');
}

// object function
BaseWidget.prototype.load_assets = function(assets, cb) {

  var obj = this;
  
  for (var i=0; i<assets.css.length; i++) {
    var href = obj.path + assets.css[i] + '?'+Math.random()*Math.random();
    $.ajax({
      url: href,
      dataType: 'text',
      async: false,
      success: function(data) {
          $('<style type="text/css">\n' + data + '</style>').appendTo("head");                    
      }                  
    });  
  } 
  
  // // load js
  // var loaded = 0 ;
  // for (var i=0; i<assets.js.length; i++) {
  //   $.getScript( obj.path + assets.js[i], function( data, textStatus, jqxhr ) {
  //     console.log("loaded " + obj.path + "..." ); 
  //     loaded++;
  //     if (loaded == assets.js.length) {
  //       $.get(obj.path + assets.html + '?'+Math.random()*Math.random(), function (ldata) {
  //         obj.container.append(ldata);
  //         cb(obj);
  //       });
  //     }
  //   });
  // }
  this.load_js_and_html(assets,cb);
}

BaseWidget.prototype.load_js_and_html = function(assets, cb) {
  var obj = this;
  var loaded = 0 ;
  
  // if no js file to load just load the html
  if (assets.js.length == 0) {
    obj.load_html(assets,cb);
  }

  for (var i=0; i<assets.js.length; i++) {
    $.getScript( obj.path + assets.js[i], function( data, textStatus, jqxhr ) {
      console.log("loaded " + obj.path + "..." ); 
      loaded++;
      console.log("***************************");
      console.log("loaded=" + loaded + " length=" + assets.js.length);
      console.log("***************************");
      if (loaded == assets.js.length) {
        // $.get(obj.path + assets.html + '?'+Math.random()*Math.random(), function (ldata) {
        //   obj.container.append(ldata);
        //   cb(obj);
        // });
        obj.load_html(assets,cb);
      }
    })
    .fail(function( jqxhr, settings, exception ) {
      alert("failed loading js");
    });
  }  
}

BaseWidget.prototype.load_html = function(assets, cb) {
  var obj = this;

  $.get(obj.path + assets.html + '?'+Math.random()*Math.random(), function (ldata) {
    obj.container.append(ldata);
    cb(obj);
  });
}


// Force overloading this funct if class resiezable
BaseWidget.prototype.resize = function(container) {
  alert('Class did not implement resize function')
}

BaseWidget.prototype.reload = function() {
  alert('Class did not implement reload function'); 
}

// function loads widget edit bar into the widget edit area
// TODO implement
// TODO - create a hash in each widget for its configurable elements
// hash should include key: class selector & css attribute
// value: edit element type and posiable value (enum / range)
BaseWidget.prototype.edit = function() {
  console.log('editing ' + this.container[0].id);
  // $("#" + BaseWidget.widgeteditor_id).html(this.data.widget_name);
  
  var source = t_controllers;
  var template = Handlebars.compile(source);
  // var partial = $("#h-single-element").html();
  // Handlebars.registerPartial('single-element', partial);

  // var data = this.controllers;
  var data = this;
  console.log( "c-id = " + this.container[0].id);

  Handlebars.registerHelper("ifCond",function(v1,operator,v2,options) {
    return ifCond(v1,operator,v2,options);
  });

  var html  = template(data);  

  $("#" + BaseWidget.widgeteditor_id).html(html);
  $('.slider').change(function(ev) {
    widgetid = $(this).data('cid');
    var lwidget = BaseWidget.get_class_obj_from_container_id(widgetid);
    var lattr = $(this).data('name');  
    var val = this.value;
    var reload = lwidget.controllers.root[lattr].reload;

    // var lwidget = BaseWidget.get_class_obj_for_event($(this));
    console.log('slider changed');
    lwidget.set_data(lattr, val);
    
    if (reload == 'true') {
      lwidget.reload();
    }

  });
  // $('.c_slider').each( function() {
  //   $(this).slider({
      
  //     stop: function( event, ui ) {
  //       widgetid = $(this).data('cid');
  //       var lwidget = BaseWidget.get_class_obj_from_container_id(widgetid);
  //       var lattr = $(this).data('name');  
  //       // var val = this.value;
  //       var val = ui.value;
  //       var reload = lwidget.controllers.root[lattr].reload;

  //       // var lwidget = BaseWidget.get_class_obj_for_event($(this));
  //       console.log('slider changed');
  //       lwidget.set_data(lattr, val);
        
  //       if (reload == 'true') {
  //         lwidget.reload();
  //       }        
  //     }
  //   });
  // });
  

  $("#" + BaseWidget.widgeteditor_id).collapse('show');
}

BaseWidget.prototype.set_data = function(attr, val) {
  console.log("set_data");
  var selector = this.controllers.root[attr].el
  var elements = this.container.find(selector);
  elements.css(attr, val+'px');
}



