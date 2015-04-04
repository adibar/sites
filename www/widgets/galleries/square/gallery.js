function PDG_square_gallery(container, path, data) {
  
  var myobj = this
  
  $.getScript( './widgets/galleries/masonary/gallery.js', function( ldata, textStatus, jqxhr ) {
           
    // call base contructore
    //PDG_masonary_gallery.call(this, container, path, data, false );
    PDG_masonary_gallery.call(myobj, container, path, data, false );

    /* each module declare lists of assets */
    var assets = {
      'css' : ['gallery.css', ],
      'js'  : ['../masonary/masonary.js'],
      'html': 'gallery.html',
    }
    
    myobj.load_assets(assets, function(myobj) {
        
      myobj.masnry_container = myobj.container.get(0).querySelector('.masonary-container');
      
      myobj.msnry = new Masonry( myobj.masnry_container, {
        // options
        // columnWidth: 200,
        // itemSelector: '.item'
        "columnWidth": ".masonary-container > div"
      });

      // $(myobj.masnry_container).resizable();

      myobj.msnry.bindResize();

      myobj.load_images();
        
    });

  }).fail(function( jqxhr, settings, exception ) {
      alert("masonary for square");
  });

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
    this.load_image( this, this.data["data"]["photos"][i] );
  }
}

PDG_square_gallery.prototype.load_image = function(obj, img) {
  // console.log('image_load');

  var ldiv = jQuery('<div/>', {
    class: 'squaredatacontainer'
  });

  // var limg = jQuery('<img/>', {
  //   src: img.image,
  // });

  var ldiv_in = jQuery('<div/>', {
    // class: 'datacontainer'
  });
  ldiv_in.css( {  
              // 'background-image'  : url('smiley.gif');
              'background-image'  : 'url(' + img.image + ')',
              // 'background-repeat' : 'no-repeat',
              // 'background-size'   : 'cover',
            });

  var opacity = jQuery('<div/>', { 
      
  }).css( { 'width':'100%', 'height':'100%' } );
  ldiv_in.append(opacity);




  // var ldiv_in = jQuery('<p/>', {
  //   // class: 'datacontainer'
  // });

  // ldiv.append(limg);
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