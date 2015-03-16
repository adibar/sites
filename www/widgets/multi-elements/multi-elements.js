function PDG_multi_elements(container, path, data) {
          
  // call base contructore
  BaseWidget.call(this, container, path, data);
  this.resize_counter = 0;

  // obj public properties
  this.msnry = null
  this.masnry_container = null  

  // container.addClass("picndo-inline");

  /* each module declare lists of assets */
  var assets = {
    'css' : ['multi-elements.css'],
    'js'  : [],
    'html': 'multi-elements.html',
  }

  var myobj = this;
  
  this.load_assets( assets, function(myobj) {
    
    var source   = $("#h-multi-elements").html();
    var template = Handlebars.compile(source);
    var partial = $("#h-single-element").html();
    Handlebars.registerPartial('single-element', partial);

    var data = myobj.data.data;
    var html  = template(data);
    
    myobj.container.find(".multielementscontainer").html(html);
    
    myobj.masnry_container = myobj.container.get(0).querySelector('.multielementscontainer');

    myobj.msnry = new Masonry( myobj.masnry_container, {
      // options
      // columnWidth: 200,
      // itemSelector: '.item'
      "columnWidth" : ".multielement",
      isInitLayout  : false,
    });
    
    myobj.msnry.bindResize();

    myobj.msnry.on( 'layoutComplete', function() {
      myobj.onLayout();
    } );

    myobj.msnry.layout();

  });
}

// See note below
PDG_multi_elements.prototype = Object.create(BaseWidget.prototype); 
// Set the "constructor" property to refer to Student
PDG_multi_elements.prototype.constructor = PDG_multi_elements;

PDG_multi_elements.prototype.resize = function(container) {
  
  container.resizable({
    stop: function( event, ui ) {

      console.log('resized PDG_multi_elements');
    }   
  });
}

PDG_multi_elements.prototype.onLayout = function() {
  console.log('PDG_multi_elements onLayout');
  var elements = this.container.find(".multielement");
  console.log("before loop");
  elements.each( function() {
    $(this).css("border-top", "1px dotted grey");
    $(this).css("border-left", "1px dotted grey");
    
    var left = $(this).css('left'); 
    var top =  $(this).css('top');

    if (left == "0px") {
      $(this).css("border-left", "none");
    }
    if (top == "0px") {
      $(this).css("border-top", "none"); 
    }

    console.log("in loop");
  }) 
  return true;
}
