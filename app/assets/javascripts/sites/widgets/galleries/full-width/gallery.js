function PDG_full_width_gallery(container, path, data) {

  this.default_controllers = {
    "root" : {
      'margin-top': { 'type':'slider', 'val':'20',  'range':[0,300],    'units':'px', "cb":"set_css",  'el':[ [ '.slider_container', 'margin-top'] ], },
    }
  }

  // call base contructore
  BaseWidget.call(this, container, path, data, {
    'btn1':'glyphicon glyphicon-picture',
  });

  this.resize_counter = 0;

  // // container.addClass("picndo-inline");

  /* each module declare lists of assets */
  var assets = {
    'css' : ['image-flow.css'],
    'js'  : [],
    'html': 'full-width-gallery.html',
  }

  var myobj = this;

  this.load_assets( assets, function(myobj) {
    myobj.loadImagesAndInit();
    myobj.load_style();
  } );
}

// See note below
PDG_full_width_gallery.prototype = Object.create(BaseWidget.prototype);
// Set the "constructor" property to refer to Student
PDG_full_width_gallery.prototype.constructor = PDG_full_width_gallery;

PDG_full_width_gallery.prototype.loadImagesAndInit = function() {
  load_jssor( this.container.find(".slider_container").attr('id') );
}


PDG_full_width_gallery.prototype.removed = function(index) {
  // reload
  this.reload();
}

PDG_full_width_gallery.prototype.added = function() {
  // do nothing
}

PDG_full_width_gallery.prototype.resize = function(container) {

  container.resizable({
    stop: function( event, ui ) {
      c_obj = BaseWidget.get_class_obj_for_event(ui.element[0]);
      c_obj.reload();
    }
  });
};

PDG_full_width_gallery.prototype.reload = function() {

  this.container.find("#slider1_container").remove();

  this.load_assets( assets, function(myobj) {
    myobj.loadImagesAndInit();
    myobj.load_style();
  } );

  // this.loadImagesAndInit();

}

PDG_full_width_gallery.prototype.default_data = function() {
  var lobj =  {
    "css": { "root": { } },
    "data": {
      "photos": [

      ],
    },
  };
  return lobj;
}