function PDG_multi_elements(container, path, data) {
          
  this.default_controllers = {
    'root': {
      // 'height': { 'val':'400', 'type':'slider', 'range':[100,2000], 'reload':'true', 'el':'.redactor-editor', },
      'margin-top': { 'type':'slider', 'val':'50',  'range':[0,300], 'units':'px', "cb":"set_css", 'el':[ [ '.picndo-row-internal', 'margin-top'] ], },
      // 'margin': { 'val':'0', 'type':'slider', 'range':[0,200], 'el':'.slickcontainer .datacontainer', }, // left & right  
      'width': { 'type':'slider', 'val':'500', 'range':[100,1920], 'units':'px', "cb":"set_css", 'el':[ [ '.editable', 'width'] ], },

      'full-width': { 'type':'checkbox', 'val':false, 'negative':true, 'cb': "set_css_class", 'el':[ ['.picndo-row-internal', 'container'], ], },

      'background-color': { 'type':'color-picker', 'val':'#ffffff', 'units':'', "cb":"set_css", 'el':[ ['.multielement', 'background-color'], ], },
    }
  }

  // call base contructore
  BaseWidget.call(this, container, path, data);
  this.resize_counter = 0;

  // obj public properties
  // for masnrt
  this.msnry = null
  this.masnry_container = null  
  // for froala
  this.froala = null;

  var myobj = this;

  $.get('/handlebars_templates/partials/single-element.html', function(ldata) {
    Handlebars.registerPartial('single-element', ldata);
    myobj.load();
  });
  
}

PDG_multi_elements.assets = {
  'css' : ['multi-elements.css'],
  'js'  : [],
  'html': 'multi-elements.html',
};


// See note below
PDG_multi_elements.prototype = Object.create(BaseWidget.prototype); 
// Set the "constructor" property to refer to Student
PDG_multi_elements.prototype.constructor = PDG_multi_elements;

PDG_multi_elements.prototype.load = function() {
  var myobj = this;
  myobj.load_assets( PDG_multi_elements.assets, function(myobj) {
    
    myobj.load_style();  
    
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


    myobj.container.find(".edit").editable({  
      inlineMode:     true,
      alwaysVisible:  true,
      //language    : 'he',
      initOnClick:    true,
    }).on('editable.blur', function (e, editor) {
      var index = $(e.target).data("index");
      var lhtml = $(e.target).editable("getHTML", true, true);
      console.log( 'html = ' + lhtml);
      myobj.data.data.elements[index]['txt'] = lhtml;
    }).on('editable.contentChanged', function (e, editor) {
      console.log('modified');
      myobj.msnry.layout();
    });;

  });
}

PDG_multi_elements.prototype.resize = function(container) {
  
  container.resizable({
    stop: function( event, ui ) {

      console.log('resized PDG_multi_elements');
    }   
  });
}

// PDG_multi_elements.addImg = function(obj) {

// }

// PDG_multi_elements.logoImg = function(lid) { 
//   console.log("logImg func called with " + lid);
//   var lobj = BaseWidget.get_class_obj_from_container_id(lid);
//   lobj.selectLogoImg();
// }

PDG_multi_elements.prototype.selectLogoImg = function(index) { 
  imageEditor(this, {
    'insertImage'     : this.setLogoImg.bind(this),
    'multippleSelect' : 0,
    'index'           : index,
  });

}

PDG_multi_elements.prototype.setLogoImg = function(ev) { 
  var image = selectedImages()[0];
  this.set_logo_image(ev.data.opts.index, image);
  editorClose();
}

PDG_multi_elements.prototype.set_logo_image = function(index, image) { 
  this.data.data.elements[index]["photo"] = {};
  this.data.data.elements[index]["photo"]["url"] = image.thumb; 
  this.reload();
}

PDG_multi_elements.prototype.set_link = function(page, index) {
  // this.data.data.elements[index]['href'] = page_url;
  jQuery.extend(this.data.data.elements[index], page);
  this.reload();
}

PDG_multi_elements.prototype.view_link = function(index) {
  var page_name = this.data.data.elements[index]['name'];
  // location.href =  page_url;
  activatePage(page_name);
}

PDG_multi_elements.prototype.remove_element = function(index) {
  this.data.data.elements.splice(index, 1);
  this.reload();
}

PDG_multi_elements.prototype.add_element = function() {
  var element = { 'h1':'Title', 'txt':'Add some text', 'photo':'' };
  this.data.data.elements.push(element);
  this.reload();
}

PDG_multi_elements.prototype.reload = function() {
  this.msnry.destroy();
  this.container.empty();

  this.load();
}

PDG_multi_elements.prototype.edit_txt = function(container, index) {
  
  if (this.froala == null) {
    
    this.froala = $(container).editable({  
      inlineMode: true,
      alwaysVisible: false,
      //language    : 'he',
    });
  }
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
  var page = add_page(random_name, false, lobj.data.name); // do not add to menu

  lobj.set_link(page, index);
}

PDG_multi_elements.view_link = function(obj) {
  var lobj = BaseWidget.get_class_obj_for_event(obj);
  var index = $(obj).parents('.multielement').data('index');  

  lobj.view_link(index);
}

PDG_multi_elements.remove_element = function(obj) {
  var lobj = BaseWidget.get_class_obj_for_event(obj);
  var index = $(obj).parents('.multielement').data('index');
  lobj.remove_element(index);
}

PDG_multi_elements.add_element = function(obj) {
  var lobj = BaseWidget.get_class_obj_for_event(obj);
  lobj.add_element();
};

PDG_multi_elements.add_element = function(obj) {
  var lobj = BaseWidget.get_class_obj_for_event(obj);
  lobj.add_element();
};

PDG_multi_elements.addImg = function(obj) {
  var lobj = BaseWidget.get_class_obj_for_event(obj);
  var index = $(obj).parents('.multielement').data('index');
  lobj.selectLogoImg(index);
}

// PDG_multi_elements.edit_txt = function(obj, index) {
//   var lobj = BaseWidget.get_class_obj_for_event(obj);
//   var lindex = $(obj).parents('.multielement').data('index');
//   if (index != lindex) {
//     alert("We might had an error - index mismatch for multi-elements");
//     return;
//   }
//   lobj.edit_txt(obj, index)
// }


