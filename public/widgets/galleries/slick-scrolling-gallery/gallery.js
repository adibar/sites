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
    'html': 'gallery.html',
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
        src: myobj.data["data"]["photos"][i]["image"]
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

// PDG_slick_gallery.prototype.addImage = function() {
//   $("#main-modal").modal( { } );
//   console.log('modal called');

//   $.ajax({
//     dataType: "json",
//     cache: false,
//     url: '/siteseditor/images',
//     success: $.proxy(function(data) {
//       // var source = $('#image-manager').html().replace(/[\u200B]/g, '');
//       // var template = Handlebars.compile(source);
//       // Handlebars.registerPartial("image-manager-img", $("#image-manager-img").html().replace(/[\u200B]/g, '') );
//       console.log('setting');
//       // var html  = template( { "images": data, "insert":$.proxy(this.imagemanager.insert, this), } );  
//       // var html  = template( { "images": data,  "object_images":this.data.data.photos} );  
//       // var html  = template( { "images": data,  "object_images":data, } );  
      
//       // var html  = template( { "images": data,  "object_images":this.data.data.photos, "obj_cbs":{ "delete":"alert('xxx');"  } } );  
//       var lobj = {  "images": data,  
//                     "object_images":this.data.data.photos, 
//                     "img_cbs":{ 
//                       "delete_class"  : "img_delete", 
//                       "edit_class"    : "img_edit",
//                       "select_class"  : "img_select"
//                     },                              
//                     "obj_cbs":{ 
//                       "delete_class"  : "obj_delete", 
//                       "edit_class"    : "obj_edit",
//                     } 
//                 } ;
//       // var html  = template( lobj );
//       // var html  = template( lobj );
//       var html = image_manager_templete( lobj );
      

//       // var html  = template( { "images": data,  } );  

//       // $modal.append( html); 
//       var lbody = $(".modal-body");
//       lbody.empty();
//       lbody.append( html );
//       unselect_all();

//       $("#insert-img").click( $.proxy(this.insertImage, this) );
//       //$(".obj_delete").click( $.proxy(this.removeImage, this) );
//       //$(".obj_delete").click( { obj: this }, this.removeImage);
//       $(".obj_delete").click( { obj: this }, removeImage);


//       // $("#insert-img").click(this.imagemanager.insert);

//       // $('#image-manager-image-list').sortable({
//       $('#image-manager-obj-list > ul').sortable({        
//         cursor: "col-resize",
//         items: "> li",
//         placeholder: '> li',
//         connectWith: '#image-manager-image-list',
//         dropOnEmpty: true,
        
//         update: function( event, ui ) {
//           var arr = $("#image-manager-image-list").sortable( "toArray" );
//         },
//       });
//     }, this)
//   });
// };

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