function PDG_slick_gallery(container, path, data) {
          
  // call base contructore
  BaseWidget.call(this, container, path, data);
  this.resize_counter = 0;

  container.addClass("picndo-inline");

  /* each module declare lists of assets */
  var assets = {
    'css' : ['gallery.css', 'slick/slick.css'],
    'js'  : ['slick/slick.js'],
    'html': 'gallery.html',
  }

  var myobj = this;
  
  this.load_assets( assets, function(myobj) {
    
    var imgLoaded = 0;
    var imgAppended = 0;
    for (var i=0; i<myobj.data["data"]["photos"].length; i++) {
      var ldiv = jQuery('<div/>', {
        class: 'datacontainer'
      });

      var limg = jQuery('<img/>', {
        src: myobj.data["data"]["photos"][i]["url"]
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
            cssEase: "ease-out"
          });  
          
          myobj.resize( myobj.container.find(".slickcontainer") )       
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
          cssEase: "ease-out"
        });

        myobj.resize( myobj.container.find(".slickcontainer") ) 
      }
    } 
  } );
}

// See note below
PDG_slick_gallery.prototype = Object.create(BaseWidget.prototype); 
// Set the "constructor" property to refer to Student
PDG_slick_gallery.prototype.constructor = PDG_slick_gallery;

BaseWidget.prototype.resize = function(container) {
  
  container.resizable({
    stop: function( event, ui ) {
      c_obj = BaseWidget.get_class_obj_for_event(ui.element[0]);
      c_obj.reload();        
      // c_obj.container.find(".slickcontainer").resizable( "destroy" );
      // c_obj.container.find(".slickcontainer").slick( 'unslick' );
      // // c_obj.container.find(".slickcontainer").unslick();
      // // c_obj.container.find(".slickcontainer").slick( 'setPosition' );

      // c_obj.container.find(".slickcontainer").slick({
      //   dots: false,
      //   arrows:true,
      //   infinite: true,
      //   speed: 800,
      //   slidesToShow: 1,
      //   centerMode: true,
      //   variableWidth: true,    
      //   slidesToScroll: 1,
      //   focusOnSelect: true,
      //   cssEase: "ease-out"
      // });
      // c_obj.resize( c_obj.container.find(".slickcontainer") );
    
      // console.log('resized');
    }   
  });
}

BaseWidget.prototype.reload = function() {

      this.container.find(".slickcontainer").resizable( "destroy" );
      this.container.find(".slickcontainer").slick( 'unslick' );
      // c_obj.container.find(".slickcontainer").unslick();
      // c_obj.container.find(".slickcontainer").slick( 'setPosition' );

      this.container.find(".slickcontainer").slick({
        dots: false,
        arrows:true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,    
        slidesToScroll: 1,
        focusOnSelect: true,
        cssEase: "ease-out"
      });
      this.resize( this.container.find(".slickcontainer") );

}