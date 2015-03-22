// PDG_masonary_gallery.prototype = new BaseWidget();                // Here's where the inheritance occurs 
// PDG_masonary_gallery.prototype.constructor = PDG_masonary_gallery; // Otherwise instances of Cat would have a constructor of Mammal 



function PDG_masonary_gallery(container, path, data) {
  
  // call base contructore
  BaseWidget.call(this, container, path, data, { 
    'btn1':'glyphicon glyphicon-picture', 
    // 'btn1CB': $.proxy(this.addImage, this),
  });
  
  // obj public properties
  this.msnry = null
  this.masnry_container = null

  /* each module declare lists of assets */
  var assets = {
    'css' : ['gallery.css', ],
    'js'  : ['masonary.js'],
    'html': 'gallery.html',
  }

  var myobj = this;
  
  this.load_assets(assets, function(myobj) {
    
    myobj.masnry_container = myobj.container.get(0).querySelector('.masonary-container');
    
    myobj.msnry = new Masonry( myobj.masnry_container, {
      // options
      // columnWidth: 200,
      // itemSelector: '.item'
      "columnWidth": ".masonary-container > div"
    });

    // $(myobj.masnry_container).resizable();

    myobj.msnry.bindResize();

    for (var i=0; i<myobj.data["data"]["photos"].length; i++) {
      console.log("photo " + i + " " + myobj.data["data"]["photos"][i]["url"]);  
    
      myobj.image_load(myobj, myobj.data["data"]["photos"][i]["url"]);
    }
    
  });

}

// See note below
PDG_masonary_gallery.prototype = Object.create(BaseWidget.prototype); 
// Set the "constructor" property to refer to Student
PDG_masonary_gallery.prototype.constructor = PDG_masonary_gallery;

PDG_masonary_gallery.prototype.addImage = function() {
  alert('PDG_masonary_gallery addImage');
};

PDG_masonary_gallery.prototype.image_load = function(obj, url) {
  console.log('image_load');

  var ldiv = jQuery('<div/>', {
    class: 'datacontainer'
  });

  var limg = jQuery('<img/>', {
    src: url
  });

  var ldiv_in = jQuery('<div/>', {
    // class: 'datacontainer'
  });

  ldiv.append(limg);
  ldiv.append(ldiv_in);

  // $(obj.masnry_container).append(ldiv);

  limg.one("load", function() { 
    console.log('loaded');
    $(obj.masnry_container).append(ldiv);
    obj.msnry.appended(ldiv);
    obj.msnry.layout();
  });
}
