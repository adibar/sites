function PDG_image_flow_gallery(container, path, data) {
  
  this.default_controllers = {
    "root" : { 
      'height':     { 'type':'slider', 'val':'400', 'range':[100,1200], 'units':'px', "cb":"set_css", 'reload':'true', 'el':[ [ '.slickcontainer', 'height'] ],},
      'margin-top': { 'type':'slider', 'val':'20',  'range':[0,300],    'units':'px', "cb":"set_css",                  'el':[ [ '.slickcontainer', 'margin-top'] ], },
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
    'html': 'image-flow-gallery.html',
  }

  this.image_flow = undefined;

  var myobj = this;
  
  this.load_assets( assets, function(myobj) {
    myobj.loadImagesAndInit();  
    myobj.load_style();  
  } );
}

// See note below
PDG_image_flow_gallery.prototype = Object.create(BaseWidget.prototype); 
// Set the "constructor" property to refer to Student
PDG_image_flow_gallery.prototype.constructor = PDG_image_flow_gallery;

PDG_image_flow_gallery.prototype.loadImagesAndInit = function() {
  var myobj = this;
  console.log('PDG_image_flow_gallery.prototype.loadImagesAndInit');

  // assign id to image flow container
  var newId = myobj.container.attr('id') + 'image_flow';
  myobj.container.find(".imageflow").attr('id', newId);

  var imgLoaded = 0;
  var imgAppended = 0;
  
  if (myobj.data["data"]["photos"].length == 0) {
    console.log("PDG_image_flow_gallery No images to load");
    
  }
  else {
    console.log('PDG_image_flow_gallery loading ' + myobj.data["data"]["photos"].length + ' photos');
    for (var i=0; i<myobj.data["data"]["photos"].length; i++) {
      
      var limg = jQuery('<img/>', {
        src       : myobj.data["data"]["photos"][i]["image"],
        longdesc  : myobj.data["data"]["photos"][i]["image"],
        alt       : "Hey Boobi Ma Kore - Im OK Thank you, and see you tomorrow. :-) " + i 
      });


      limg.one("load", function(i) {
        imgLoaded++;
        if ( (imgLoaded == imgAppended) && (imgLoaded == myobj.data["data"]["photos"].length) ) {

          myobj.image_flow = new ImageFlow();
          myobj.image_flow.init({
            ImageFlowID: newId,
            reflections: false,
            opacity: true,
            opacityArray: [10, 8, 5, 2, 1],
            circular: true,
            slider: true,
            buttons:true,
            slideshow: true,
            sliderWidth: 24,
            onClick: function() { console.log("clicked to view"); },
            percentOther: 120,
            percentLandscape: 175,
            xStep: 200,
            aspectRatio: 2.333,
            imagesHeight: 0.7,

            slideshowSpeed: 3500,
            animationSpeed: 100,
          });
          
          // myobj.resize( myobj.container.find(".image-flow") );
        }
      });

      // ldiv.append(limg);

      myobj.container.find(".imageflow").append(limg);
      
      imgAppended++;
      if ( (imgLoaded == imgAppended) && (imgLoaded == myobj.data["data"]["photos"].length) ) {

        myobj.image_flow = new ImageFlow();
        myobj.image_flow.init({
          ImageFlowID: newId,
          reflections: false,
          circular: true,
        });

        // myobj.resize( myobj.container.find(".image-flow") );
      }
    }
  }   
}


PDG_image_flow_gallery.prototype.removed = function(index) {
  // reload
  this.reload();
}

PDG_image_flow_gallery.prototype.added = function() {
  // do nothing
}

PDG_image_flow_gallery.prototype.resize = function(container) {
  
  container.resizable({
    stop: function( event, ui ) {
      c_obj = BaseWidget.get_class_obj_for_event(ui.element[0]);
      c_obj.reload();        
    }   
  });
};

PDG_image_flow_gallery.prototype.reload = function() {

      // this.container.find(".image-flow").resizable( "destroy" );
      // this.container.find(".image-flow").slick( 'unslick' );

      this.container.find(".imageflow").empty();

      this.loadImagesAndInit();

}

PDG_image_flow_gallery.prototype.default_data = function() {
  var lobj =  {
    "css": { "root": { } },
    "data": {
      "photos": [

      ],
    },
  };
  return lobj;
}
