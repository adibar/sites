
function BaseWidget(container, path, data, opts) {

  BaseWidget.widgets_count++;
  
  opts = typeof opts !== 'undefined' ? opts : { };

  this.container = container
  this.path = path;
  
  if ( !(this.default_controllers) ) {
    this.default_controllers = {
      "root" : { 
        'height': { 'val':'400', 'type':'slider', 'range':[100,2000], 'reload':'true', 'el':'.slickcontainer', },
        'margin-top': { 'val':'20', 'type':'slider', 'range':[0,200], 'el':'.slickcontainer', },
        // 'margin': { 'val':'0', 'type':'slider', 'range':[0,200], 'el':'.slickcontainer .datacontainer', }, // left & right  
      }
    }
  }

  var def_data = this.default_data();

  this.data = data;
  if ( _.isEqual( data.data, { } ) )  {  // && _.isEqual( data.css, { } ) ) {
    this.data["data"] = def_data.data;
  }
  if ( _.isEqual( data.css, { } ) || ( !data.css ) ) {
    this.data["css"] = def_data.css;
  }
  this.data["css"]["root"] = BaseWidget.extend( this.data["css"]["root"], this.default_controllers["root"] ); // allowing upgrading controllers with new ones 

  this.controllers = this.data["css"];

  // BaseWidget.load_edit_menu(this.container, opts);
  this.load_edit_menu(this.container, opts);
} 

// static var
BaseWidget.widgets_count = 0;
BaseWidget.widgeteditor_id = "widgetconfigurationcollapse"; //'widgeteditor';

BaseWidget.prototype.load_style = function() {
  for ( var property in this.controllers["root"] ) {
    if (this.controllers["root"].hasOwnProperty(property)) { // why ???
      if ( 'cb' in this.controllers["root"][property] ) {
        if ( !( 'loadstyle' in this.controllers["root"][property] ) ) {
          var fnstring = this.controllers["root"][property]['cb'];
          this[fnstring]( property, this.controllers["root"][property]['val'] );
        }
      }
      // this.load_css( property, this.controllers["root"][property] );
    }
  }
}

BaseWidget.extend = function(target, source) {

  for (var property in source) {
    if (source.hasOwnProperty(property)) { // why ???
      if ( !(property in target) ) {           // if doesnt exist
        target[property] = source[property];   // => copy it
      }
      // else { // in target but ... 
      //   for ( var lkey in source[property] ) {
      //     if ( !(lkey in target[property])  ) {// ... added key
      //       target[property][lkey] = source[property][lkey]; // we add the new key     
      //     }
      //     else { // exists => overload all except value

      //     }
      //   }  
      // }
      else { // overwrite all except val
        for ( var lkey in source[property] ) {
          if (source[property].hasOwnProperty(lkey)) { // why ???
            if ( lkey != 'val' ) { // => do not overwrite the value
              target[property][lkey] = source[property][lkey];
            }
          }
        }
      }
    }
  }
  return target;
}


BaseWidget.prototype.load_edit_menu = function(el, opts) {
  var lobj = this;
  $.get( "/html/base_widget_edit_menu.html" + '?' + Math.random()*Math.random(), function (ldata) {
    el.append(ldata)
    if ( ('btn1' in opts) /*&& ('btn1CB' in opts)*/ ) {
      var btn_group = el.find(".edit_menu")[0];
      var btn = $('\
        <button type="button" class="btn btn-default btn-lg" aria-label="Left Align" title="Add Image" > \
          <span class="' + opts['btn1'] +'" aria-hidden="true"></span> \
        </button>');
      $(btn_group).append(btn);
      console.log('adding on click');
      btn.on('click', $.proxy(function(e) {
        imageEditor(this);
      }, lobj) );
    }
  });
}

// static function
BaseWidget.get_container_for_obj_action = function(obj) {
  // var widgetContainer = $(obj).parents(".picndo-row")[0];
  var widgetContainer = $(obj).parents(".picndo-editable")[0];
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
  console.log('**************************************');
  console.log('default_data not implemented for class');
  console.log('**************************************');
  return { 'data':{}, 'css':{ "root":{} } };
}

// object function
BaseWidget.prototype.load_assets = function(assets, cb) {

  var obj = this;
  
  // for (var i=0; i<assets.css.length; i++) {
  //   var href = obj.path + assets.css[i] + '?'+Math.random()*Math.random();
  //   $.ajax({
  //     url: href,
  //     dataType: 'text',
  //     async: false,
  //     success: function(data) {
  //         $('<style type="text/css">\n' + data + '</style>').appendTo("head");                    
  //     }                  
  //   });  
  // } 
  
  this.load_js_and_html(assets,cb);
}

BaseWidget.prototype.load_js_and_html = function(assets, cb) {
  var obj = this;
  var loaded = 0 ;
  
  // // if no js file to load just load the html
  // if (assets.js.length == 0) {
  //   obj.load_html(assets,cb);
  // }

  // for (var i=0; i<assets.js.length; i++) {
  //   $.getScript( obj.path + assets.js[i], function( data, textStatus, jqxhr ) {
  //     console.log("loaded " + obj.path + "..." ); 
  //     loaded++;
  //     console.log("***************************");
  //     console.log("loaded=" + loaded + " length=" + assets.js.length);
  //     console.log("***************************");
  //     if (loaded == assets.js.length) {
  //       obj.load_html(assets,cb);
  //     }
  //   })
  //   .fail(function( jqxhr, settings, exception ) {
  //     alert("failed loading js");
  //   });
  // }

  obj.load_html(assets,cb);  
}

BaseWidget.prototype.load_html = function(assets, cb) {
  var obj = this;

  // $.get(obj.path + assets.html + '?'+Math.random()*Math.random(), function (ldata) {
  //   obj.container.append(ldata);
  //   cb(obj);
  // });

  $.get('/handlebars_templates/' + assets.html, function (ldata) {
    obj['edit_mode'] = !g_query_string_params.view 
    var l_template = Handlebars.compile(ldata);
    var l_html = l_template(obj);

    obj.container.append(l_html);
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

  var data = this;
  console.log( "c-id = " + this.container[0].id);

  var html  = t_controllers(data);  
  $("#" + BaseWidget.widgeteditor_id).html(html);

  $('#'+BaseWidget.widgeteditor_id).find('.color-picker').each( function() {
    $(this).spectrum({
      showPaletteOnly: true,
      togglePaletteOnly: true,
      togglePaletteMoreText: 'more',
      togglePaletteLessText: 'less',
      color: $(this).val(),
      showAlpha: true,
      palette: [
          ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
          ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
          ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
          ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
          ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
          ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
          ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
          ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
      ]
    });
  });

  
  $('#'+BaseWidget.widgeteditor_id).find(':checkbox').each( function() {
    var val = $(this).val();
    if (val == "true") {
      $(this).prop('checked', true);
    }
    else {
      $(this).prop('checked', false); 
    }
  });

  $('.slider').change(function(ev) {
    widgetid = $(this).data('cid');
    var lwidget = BaseWidget.get_class_obj_from_container_id(widgetid);
    var lattr = $(this).data('name');  
    var val = this.value;
    var reload = lwidget.controllers.root[lattr].reload;

    // var lwidget = BaseWidget.get_class_obj_for_event($(this));
    console.log('slider changed');
    lwidget.set_css(lattr, val);
    
    if (reload == 'true') {
      lwidget.reload();
    }
  });

  $('#'+BaseWidget.widgeteditor_id).find(':checkbox').change(function(ev) {
    widgetid = $(this).data('cid');
    console.log('checkbox changed for ' + widgetid);
    var lwidget = BaseWidget.get_class_obj_from_container_id(widgetid);
    var lattr = $(this).data('name');  
    var val = $(this).is(':checked');
    lwidget.set_css_class(lattr, val);
  });

  $('#'+BaseWidget.widgeteditor_id).find('select').change(function(ev) {
    widgetid = $(this).data('cid');
    console.log('select changed for ' + widgetid);
    var lwidget = BaseWidget.get_class_obj_from_container_id(widgetid);
    var lattr = $(this).data('name');
    var val = $(this).val();  
    
    var cb = lwidget.controllers.root[lattr]['cb'];
    lwidget[cb](lattr, val);
    //lwidget.set_css(lattr, val);
  });

  $('#'+BaseWidget.widgeteditor_id).find('.color-picker').change(function(ev) {
    widgetid = $(this).data('cid');
    console.log('color-picker changed for ' + widgetid);    
    var lwidget = BaseWidget.get_class_obj_from_container_id(widgetid);
    var lattr = $(this).data('name');
    //var val = $(this).spectrum("get").toHexString()    
    var val = $(this).spectrum("get").toRgbString();
    console.log('color-picker val=' + val);        
    lwidget.set_css(lattr, val);
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

BaseWidget.prototype.set_css = function(attr, val) {
  console.log("set_css");
  
  for (var i=0; i<this.controllers.root[attr]["el"].length; i++) {
    var selector = this.controllers.root[attr]["el"][i][0];
    var elements = this.container.find(selector);
    //elements.css( this.controllers.root[attr].el[0][1], val+this.controllers.root[attr]["units"]  );
    var style_attr = this.controllers.root[attr].el[i][1];
    var style_val  = val+this.controllers.root[attr]["units"];
    
    for (var j=0; j<elements.length; j++) {
      elements[j].style[style_attr] = style_val;
    }
  }

  // if (elements.length > 0) { // is this condition needed???
    //// elements[0].style[style_attr] = style_val;
    this.controllers.root[attr]["val"] = val;
  //}
}

BaseWidget.prototype.set_css_class = function(attr, val) {
  console.log( JSON.stringify( this.controllers.root[attr] ) );
  
  var els = this.controllers['root'][attr]['el']
  var negative = this.controllers['root'][attr]['negative'];
  negative = typeof negative !== 'undefined' ? negative : false;

  for (var i=0; i<els.length; i++) {
    objs = this.container.find(els[i][0]);
    if ( ( (val == true) && (negative == false) ) ||  ( (val == false) && (negative == true) ) ) {
      objs.addClass(els[i][1]);
    } else {
      objs.removeClass(els[i][1]);
    }
  }

  this.controllers["root"][attr]["val"] = val;

}

// function global_set_css_class( obj, attr, value) {

// }



