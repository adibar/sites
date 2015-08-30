function PDG_slick_gallery(container, path, data) {
  
  this.default_controllers = {
    "root" : { 
      // 'menu-margin-top':  { 'type':'slider', 'val':40,                        'units':'px', "cb":"set_css",                  'el':[ ['.navbar-collapse-style > ul', 'margin-top'] ], },
      'height':     { 'type':'slider', 'val':'400', 'range':[100,1200], 'units':'px', "cb":"set_css", 'reload':'true', 'el':[ [ '.slickcontainer', 'height'] ],},
      'margin-top': { 'type':'slider', 'val':'20',  'range':[0,300],    'units':'px', "cb":"set_css",                  'el':[ [ '.slickcontainer', 'margin-top'] ], },

    }
  }

  // call base contructore
  BaseWidget.call(this, container, path, data, { 
    'btn1':'glyphicon glyphicon-picture', 
    // 'btn1CB': $.proxy(this.addImage, this),
  });
  this.resize_counter = 0;

  container.addClass("picndo-inline");

  /* each module declare lists of assets */
  var assets = {
    'css' : ['gallery.css', 'slick/slick.css'],
    'js'  : ['slick/slick.js'],
    'html': 'slick-gallery.html',
  }

  var myobj = this;
  
  this.load_assets( assets, function(myobj) {
    myobj.loadImagesAndInit();  
    myobj.load_style();  
  } );
}

// See note below
PDG_slick_gallery.prototype = Object.create(BaseWidget.prototype); 
// Set the "constructor" property to refer to Student
PDG_slick_gallery.prototype.constructor = PDG_slick_gallery;

PDG_slick_gallery.prototype.loadImagesAndInit = function() {
  var myobj = this;
  console.log('PDG_slick_gallery.prototype.loadImagesAndInit');

  var imgLoaded = 0;
  var imgAppended = 0;
  
  if (myobj.data["data"]["photos"].length == 0) {
    console.log("PDG_slick_gallery loading for 0 photos");
    myobj.container.find(".slickcontainer").slick({
      dots: false,
      arrows:true,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true,    
      slidesToScroll: 1,
      focusOnSelect: true,
      cssEase: "ease-out",
      autoplay: true,
      autoplaySpeed: 3000,
    });  
    myobj.resize( myobj.container.find(".slickcontainer") ) ;
  }
  else {
    console.log('PDG_slick_gallery loading ' + myobj.data["data"]["photos"].length + ' photos');
    for (var i=0; i<myobj.data["data"]["photos"].length; i++) {
      var ldiv = jQuery('<div/>', {
        class: 'datacontainer'
      });

      var limg = jQuery('<img/>', {
        // src: myobj.data["data"]["photos"][i]["image"]
        src: site_images[ myobj.data["data"]["photos"][i]["image-id"] ]["image"],
      });

      limg.one("load", function(i) {
        imgLoaded++;
        if ( (imgLoaded == imgAppended) && (imgLoaded == myobj.data["data"]["photos"].length) ) {
          myobj.container.find(".slickcontainer").slick({
            dots: false,
            arrows:true,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: true,    
            slidesToScroll: 1,
            focusOnSelect: true,
            cssEase: "ease-out",
            autoplay: true,
            autoplaySpeed: 3000,
          });  
          
          myobj.resize( myobj.container.find(".slickcontainer") );
        }
      });

      ldiv.append(limg);

      myobj.container.find(".slickcontainer").append(ldiv);
      imgAppended++;
      if ( (imgLoaded == imgAppended) && (imgLoaded == myobj.data["data"]["photos"].length) ) {
        myobj.container.find(".slickcontainer").slick({
          dots: false,
          arrows:true,
          infinite: true,
          speed: 800,
          slidesToShow: 1,
          centerMode: true,
          variableWidth: true,    
          slidesToScroll: 1,
          focusOnSelect: true,
          cssEase: "ease-out",
          autoplay: true,
          autoplaySpeed: 3000,

        });

        myobj.resize( myobj.container.find(".slickcontainer") );
      }
    }
  }   
}


PDG_slick_gallery.prototype.removed = function(index) {
  // reload
  this.reload();
}

PDG_slick_gallery.prototype.added = function() {
  // do nothing
}

PDG_slick_gallery.prototype.resize = function(container) {
  
  container.resizable({
    stop: function( event, ui ) {
      c_obj = BaseWidget.get_class_obj_for_event(ui.element[0]);
      c_obj.reload();        
    }   
  });
};

PDG_slick_gallery.prototype.reload = function() {

      this.container.find(".slickcontainer").resizable( "destroy" );
      this.container.find(".slickcontainer").slick( 'unslick' );

      this.container.find(".slickcontainer").empty();

      this.loadImagesAndInit();

}