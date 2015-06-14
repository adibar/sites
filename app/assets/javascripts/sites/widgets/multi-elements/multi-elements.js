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

  $.get('/handlebars_templates/partials/single-element.html', function(ldata) {
    Handlebars.registerPartial('single-element', ldata);

    myobj.load_assets( assets, function(myobj) {
      
      // var source   = $("#h-multi-elements").html();
      // var template = Handlebars.compile(source);
      // var partial = $("#h-single-element").html();
      // Handlebars.registerPartial('single-element', partial);

      //var data = myobj.data.data;
      //var html  = template(data);
      
      //myobj.container.find(".multielementscontainer").html(html);
      
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
        PDG_multi_elements.onLayout();
      } );

      myobj.msnry.layout();

    });

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

PDG_multi_elements.prototype.set_link = function(page_url, index) {
  this.data.data.elements[index]['href'] = page_url;
  this.reload();
}

PDG_multi_elements.prototype.remove_element = function(index) {
  this.data.data.elements.splice(index, 1);
  this.reload();
}

PDG_multi_elements.prototype.reload = function() {

}

//PDG_multi_elements.prototype.onLayout = function() {
PDG_multi_elements.onLayout = function() {
  // var elements = this.container.find(".multielement");
  var elements = $(".multielement");
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
  }) 
  return true;
}

PDG_multi_elements.set_link = function(obj) {
  var lobj = BaseWidget.get_class_obj_for_event(obj);
  var index = $(obj).parents('.multielement').data('index');

  var random_name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
  var page_url = add_page(random_name, false); // do not add to menu

  lobj.set_link(page_url, index);
}

PDG_multi_elements.remove_element = function(obj) {
  var lobj = BaseWidget.get_class_obj_for_event(obj);
  var index = $(obj).parents('.multielement').data('index');
  lobj.remove_element(index);
}