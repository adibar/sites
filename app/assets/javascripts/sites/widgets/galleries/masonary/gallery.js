// PDG_masonary_gallery.prototype = new BaseWidget();                // Here's where the inheritance occurs
// PDG_masonary_gallery.prototype.constructor = PDG_masonary_gallery; // Otherwise instances of Cat would have a constructor of Mammal



function PDG_masonary_gallery(container, path, data, assetsLoad) {

  assetsLoad = typeof assetsLoad !== 'undefined' ? assetsLoad : true;

  this.default_controllers = typeof this.default_controllers !== 'undefined' ? this.default_controllers : {
    "root" : {
      'margin-top': { 'type':'slider', 'val':'20',  'range':[0,300],   'units':'px', "cb":"set_css", 'el':[ [ '.masonary-container', 'margin-top'] ], },
      'padding':    { 'type':'slider', 'val':'0',   'range':[0,20],    'units':'px', "cb":"set_css", 'el':[ [ '.datacontainer', 'padding'] ], },
    }
  }

  // call base contructore
  BaseWidget.call(this, container, path, data, {
    'btn1':'glyphicon glyphicon-picture',
    // 'btn1CB': $.proxy(this.addImage, this),
  });

  // obj public properties
  this.msnry = null
  this.masnry_container = null
  this.modified = false

  /* each module declare lists of assets */
  var assets = {
    'css' : ['gallery.css', ],
    'js'  : ['masonary.js'],
    'html': 'masonry-gallery.html',
  }

  var myobj = this;

  if ( assetsLoad == true ) {
    this.load_assets(assets, function(myobj) {

      myobj.masnry_container = myobj.container.get(0).querySelector('.masonary-container');

      myobj.msnry = new Masonry( myobj.masnry_container, {
        // options
        // columnWidth: 200,
        // itemSelector: '.item'
        "columnWidth": ".masonary-container > div"
      });

      // $(myobj.masnry_container).resizable();

      // myobj.msnry.bindResize();
      myobj.msnry.unbindResize();

      myobj.load_images();

      window.onresize = function() {
        myobj.msnry.layout();
      };

      // myobj.load_style();

    });
  }

}

// See note below
PDG_masonary_gallery.prototype = Object.create(BaseWidget.prototype);
// Set the "constructor" property to refer to Student
PDG_masonary_gallery.prototype.constructor = PDG_masonary_gallery;

// PDG_masonary_gallery.prototype.addImage = function() {
//   $("#main-modal").modal( { } );
//   console.log('modal called');

//   $.ajax({
//     dataType: "json",
//     cache: false,
//     url: '/siteseditor/images',
//     success: $.proxy(function(data) {
//       var source = $('#image-manager').html().replace(/[\u200B]/g, '');
//       var template = Handlebars.compile(source);
//       Handlebars.registerPartial("image-manager-img", $("#image-manager-img").html().replace(/[\u200B]/g, '') );
//       console.log('setting');
//       // var html  = template( { "images": data, "insert":$.proxy(this.imagemanager.insert, this), } );
//       var html  = template( { "images": data, "insert":"alert('inserted');", } );

//       // $modal.append( html);
//       $(".modal-body").empty();
//       $(".modal-body").append( html );

//       var insert = $("#insert-img");
//       insert.click( $.proxy(this.insertImage, this) );

//       // $("#insert-img").click(this.imagemanager.insert);

//       // $('#image-manager-image-list').sortable({
//       //   cursor: "col-resize",
//       //   items: "> li",
//       //   placeholder: '> li',
//       //   connectWith: '#image-manager-image-list',
//       //   dropOnEmpty: true,

//       //   update: function( event, ui ) {
//       //     var arr = $("#image-manager-image-list").sortable( "toArray" );
//       //   },
//       // });
//     }, this)
//   });
// };

// PDG_masonary_gallery.prototype.insertImage = function() {
//   var lobj = this;
//   var els = $(".selected-img");
//   els.each(function( index ) {
//     var limg = $(this).find('img')[0];
//     var url = $(limg).attr('rel');
//     console.log('PDG_masonary_gallery.prototype.insertImage');
//     lobj.data.data.photos.push( { "url": url, });
//     lobj.image_load(lobj, url);
//   });
// }

PDG_masonary_gallery.prototype.removed = function(index) {

  // reload
  // this.data["data"]["photos"] = [];
  // this.reload();
  console.log("PDG_masonary_gallery removed");
  this.modified = true;

}

PDG_masonary_gallery.prototype.added = function() {
  // var len = this.data["data"]["photos"].length;
  // this.load_image( this, this.data["data"]["photos"][len-1], len-1 );
  //or just whould also work =>
  this.modified = true;
}

PDG_masonary_gallery.prototype.load_images = function() {
  console.log('PDG_masonary_gallery load ' + this.data["data"]["photos"].length + ' images' );
  for (var i=0; i<this.data["data"]["photos"].length; i++) {

    var img_id = this.data["data"]["photos"][0]["image-id"];
    if ( site_images[ img_id ] ) {  // load the image only if exists
      this.load_image( this, this.data["data"]["photos"][i], i );
    }

  }

  this.load_style();
}

PDG_masonary_gallery.prototype.load_image = function(obj, img, index) {
  // console.log('image_load');

  var ldiv = jQuery('<div/>', {
    class: 'datacontainer fancyble'
  });
  ldiv.data('image', img.image);
  ldiv.data('index', index);

  var lsrc;
  img["image-id"]? lsrc=site_images[ img["image-id"] ].image : lsrc="";

  var limg = jQuery('<img/>', {
    src: lsrc,
  });

  var ldiv_in = jQuery('<div/>', {
    // class: 'datacontainer'
  });

  ldiv.append(limg);
  ldiv.append(ldiv_in);

  // $(obj.masnry_container).append(ldiv);

  limg.one("load", function() {
    // console.log('loaded');
    // $(obj.masnry_container).append(ldiv);
    // obj.msnry.appended(ldiv);
    obj.msnry.layout();

    // TODO call the 'global' load_style on every inage load - this is not efficiant load_style should be called once
    // => moved to load images
    // obj.load_style();
  });
  $(obj.masnry_container).append(ldiv);
  obj.msnry.appended(ldiv);
  obj.msnry.layout();
}

PDG_masonary_gallery.prototype.image_containers = function() {
  return $(this.masnry_container).find('.datacontainer');
}

PDG_masonary_gallery.prototype.reload = function() {
  var lobj = this;
  console.log('reload masonary');
  if ( this.modified == true ) {

    // remove all
    var containers = lobj.image_containers();
    containers.each( function() {
      lobj.msnry.remove( this );
    });

    // load images
    lobj.load_images() ;
  }
  this.modified = false;
}

PDG_masonary_gallery.prototype.default_data = function() {
  var lobj =  {
    "css": { "root": { } },
    "data": {
      "photos": [

      ],
    },
  };
  return lobj;
}
