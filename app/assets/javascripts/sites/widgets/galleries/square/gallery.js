function PDG_square_gallery(container, path, data) {

  this.default_controllers = {
    "root" : {
      'margin-top': { 'type':'slider', 'val':'20',  'range':[0,300],   'units':'px', "cb":"set_css", 'el':[ [ '.masonary-container', 'margin-top'] ], },
      'padding':    { 'type':'slider', 'val':'0',   'range':[0,15],    'units':'px', "cb":"set_css", 'el':[ [ '.squaredatacontainer .in', 'padding'] ], },
    }
  };

  var myobj = this;

  // $.getScript( './widgets/galleries/masonary/gallery.js', function( ldata, textStatus, jqxhr ) {

    // call base contructore
    //PDG_masonary_gallery.call(this, container, path, data, false );
    PDG_masonary_gallery.call(myobj, container, path, data, false );

    /* each module declare lists of assets */
    var assets = {
      'css' : ['gallery.css', ],
      'js'  : ['../masonary/masonary.js'],
      'html': 'square-gallery.html',
    }

    myobj.load_assets(assets, function(myobj) {

      myobj.masnry_container = myobj.container.get(0).querySelector('.masonary-container');

      myobj.msnry = new Masonry( myobj.masnry_container, {
        "columnWidth": ".masonary-container > div"
      });

      // $(myobj.masnry_container).resizable();

      myobj.load_images();
      $(window).trigger('resize');
      myobj.msnry.layout();
      // myobj.msnry.bindResize();
      myobj.msnry.unbindResize();

      $( window ).resize(function() {
          myobj.msnry.layout();
      });

      myobj.load_style();

    });

  // }).fail(function( jqxhr, settings, exception ) {
  //     alert("masonary for square");
  // });

}

// $.getScript( './widgets/galleries/masonary/gallery.js', function( ldata, textStatus, jqxhr ) {

  PDG_square_gallery.prototype = Object.create(PDG_masonary_gallery.prototype);
  // PDG_square_gallery.prototype = Object.create(BaseWidget.prototype);

  PDG_square_gallery.prototype.constructor = PDG_square_gallery;
// });

PDG_square_gallery.prototype.load_images = function() {
  console.log('PDG_masonary_gallery load ' + this.data["data"]["photos"].length + ' images' );
  for (var i=0; i<this.data["data"]["photos"].length; i++) {
    // this.load_image(this, this.data["data"]["photos"][i]["image"]);
    this.load_image( this, this.data["data"]["photos"][i], i );
  }
}

PDG_square_gallery.prototype.load_image = function(obj, img, index) {
  // console.log('image_load');

  var ldiv = jQuery('<div/>', {
    class: 'squaredatacontainer fancyble'
  });
  ldiv.data('image', img.image);
  ldiv.data('index', index);

  var ldiv_in = jQuery('<div/>', {
    class: 'in'
  });

  var lsrc;
  // img["image-id"]? lsrc=site_images[ img["image-id"] ].image : lsrc=img.image;
  img["image-id"]? lsrc="url('" + site_images[ img["image-id"] ].image + "')" : lsrc="";
  ldiv_in.css( {
              // 'background-image'  : url('smiley.gif');
              'background-image'      : lsrc,

              // 'background-repeat' : 'no-repeat',
              // 'background-size'   : 'cover',
            });

  var opacity = jQuery('<div/>', {

  }).css( { 'width':'100%', 'height':'100%' } );
  ldiv_in.append(opacity);


  ldiv.append(ldiv_in);

  // $(obj.masnry_container).append(ldiv);

  // limg.one("load", function() {
  //   // console.log('loaded');
  //   $(obj.masnry_container).append(ldiv);
  //   obj.msnry.appended(ldiv);
  //   obj.msnry.layout();
  // });
  $(obj.masnry_container).append(ldiv);
  obj.msnry.appended(ldiv);
  obj.msnry.layout();
}