function PDG_top_menu(path, data) {
  
  var lcontainer = this.buildContainer(data.container, data.elId, data.data);
  this.container = lcontainer;

  //data.container.append(lcontainer);
  this.containerId = data.elId;

  this.default_controllers = {
    'root': {
      'side-menu': { 'type':'select', 'loadstyle':0, 'val':0, 'cb': "set_menu_type", 'options':['Top Menu', 'Side Menu'] },      

      'brand-center': { 'type':'checkbox', 'val':false, 'cb': "set_css_class", 'el':[ ['.navbar-header', 'navbar-header-center'], ['.navbar-brand-style', 'navbar-brand-style-center'], ['.navbar-nav', 'navbar-nav-center'], ['.navbar-collapse', 'navbar-collapse-center'], ], },
      
      'full-width': { 'type':'checkbox', 'val':false, 'negative':true, 'cb': "set_css_class", 'el':[ ['.picndo-row-internal', 'container'], ], },
      
      'brand-width': { 'type':'slider', 'val':40, 'range':[100,500], 'units':'px', "cb":"set_css", 'el':[ ['.menu-brand-img', 'width'] ], }, 

      'menu-margin-top': { 'type':'slider', 'val':300, 'range':[0,200], 'units':'px', "cb":"set_css", 'el':[ ['.sidebar-ul', 'margin-top'] ], }, 
      
      'border-width': { 'type':'slider', 'val':0, 'range':[0,20], 'units':'px', "cb":"set_css", 'el':[ ['header', 'border-bottom-width'] ], }, 
      
      'border-style': { 'type':'select', 'val':0, 'units':'', "cb":"set_css", 'el':[ ['header', 'border-bottom-style'] ], 
          'options':['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge' ,'inset', 'outset'], }, 

      'border-color': { 'type':'color-picker', 'val':'#000000', 'units':'', "cb":"set_css", 'el':[ ['header', 'border-bottom-color'] ], }, 
    
      'background-color': { 'type':'color-picker', 'val':'#000000', 'units':'', "cb":"set_css", 'el':[ ['.wrapper-addons', 'background-color'], ['.dropdown-menu > li', 'background-color'] ], },

      'font-size': { 'type':'slider', 'range':[8,36], 'val':'10', 'units':'px', "cb":"set_css", 'el':[ ['.sidebar-ul', 'font-size'] ], },

      'font-family': { 'type':'select-hash', 'val':"Georgia, serif", 'units':'', "cb":"set_css", 'el':[ ['header', 'font-family'] ], 
          'options':{ 
            "Georgia":                  "Georgia, serif", 
            "Palatino Linotype":        "'Palatino Linotype', 'Book Antiqua', Palatino, serif", 
            "Times New Roman":          "'Times New Roman', Times, serif",

            "Ariel":                    "Arial, Helvetica, sans-serif",
            "Ariel Black":              "'Arial Black', Gadget, sans-serif",
            "Comic Sans MS":            "'Comic Sans MS', cursive, sans-serif",
            "Impact":                   "Impact, Charcoal, sans-serif",
            "Lucida Sans Unicode":      "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
            "Tahoma":                   "Tahoma, Geneva, sans-serif",
            "Trebuchet MS":             "'Trebuchet MS', Helvetica, sans-serif",
            "Verdana":                  "Verdana, Geneva, sans-serif",

            "Courier New":              "'Courier New', Courier, monospace",
            "Lucida Console":           "'Lucida Console', Monaco, monospace",

            "HelveticaNeue Ultralight": "HelveticaNeue-Ultralight"
          }, 
      },

      'color': { 'type':'color-picker', 'val':'#000000', 'units':'', "cb":"set_css", 'el':[ ['.nav-link', 'color'], ], },           
    }
  };
  
  // BaseWidget.call(this, ldiv1, path, data.data);
  BaseWidget.call(this, lcontainer, path, data.data);
  this.contentContainer = data.content;
  this.menuContainer = data.container;

  // /* each module declare lists of assets */
  // if (this.data.type == 'Side Menu') {
  //   var l_html = 'side-menu.html';
  // } else {
  //   var l_html = 'top-menu.html';
  // }

  // var assets = {
  //   'css' : ['top-menu.css', '../side-menu/side-menu.css'],
  //   'js'  : [],
  //   'html': l_html,
  // }

  var assets = this.assets();

  var myobj = this;
  
  this.load_assets( assets, function(myobj) {
    
    // myobj.topMenuTemplate =  Handlebars.compile( $('#top-menu').html().replace(/[\u200B]/g, '') );
    // myobj.sideMenuTemplate = Handlebars.compile( $('#side-menu').html().replace(/[\u200B]/g, '') ); 
    
    // Handlebars.registerHelper('stringifyFunc', function(fn) {
    //   return new Handlebars.SafeString("(" + 
    //                 fn.toString().replace(/\"/g,"'") + ")()");
    // });    

    myobj.loadMenu(myobj.data['type']);

    //load style
    // if (myobj.data.type == 'Top Menu') {
    //   var source = $('#top-menu').html().replace(/[\u200B]/g, '');
    // } else {
    //   var source = $('#side-menu').html().replace(/[\u200B]/g, '');
    // }  

    // var menu = Handlebars.compile(source);
    
    // var html = menu( myobj.data );
    // myobj.container.append(html);

    // myobj.load_style();


    // $(".navbar-nav > li").on("click", function(){
    //    console.log('navbar on click');
    //    $(".navbar-nav").find(".active").removeClass("active");
    //    $(this).addClass("active");
    //    var lid = this.id;
    //    activatePage(lid);
    // });    
    
    // $(".navbar-nav").sortable({
    //   update: function( event, ui ) {
    //     console.log("sortable updated");
    //     var arr = $(".navbar-nav").sortable( "toArray" );
    //     console.log("sortable updated");
    //   },
    // });
  
  });
}


// See note below
PDG_top_menu.prototype = Object.create(BaseWidget.prototype); 
// Set the "constructor" property to refer to Student
PDG_top_menu.prototype.constructor = PDG_top_menu;

PDG_top_menu.prototype.assets = function() {
  /* each module declare lists of assets */
  
  if (this.data.type == 'Side Menu') {
    var l_html = 'side-menu.html';
  } else {
    var l_html = 'top-menu.html';
  }

  return assets = {
    'css' : ['top-menu.css', '../side-menu/side-menu.css'],
    'js'  : [],
    'html': l_html,
  }
}

PDG_top_menu.prototype.set_menu_type = function(attr, val) {
  console.log("PDG_top_menu.prototype.set_menu_type = function(attr, val) ");
  //this.controllers['root'][attr]['val'] = val;
  this.data['type'] = val;
  this.loadMenu(val);
}

PDG_top_menu.prototype.set_logo_image = function(attrs) { 
  this.data['logoimage'] = attrs;
  this.loadMenu(this.data['type']);
}

PDG_top_menu.prototype.buildContainer = function(baseContainer, elid, data) {

  if (data['type'] == 'Top Menu' ) {

    var ldiv = jQuery('<div/>', {  
      // class: 'container'
    });
    var ldiv1 = jQuery('<div/>', {
      class: 'picndo-row picndo-editable',
      id: elid,
    });
    ldiv.append(ldiv1);
    baseContainer.append(ldiv);

  } else {

    var ldiv1 = jQuery('<div/>', {
      class: 'picndo-editable',
      id: elid,
    });
    baseContainer.append(ldiv1);

  }

  return ldiv1;
}

PDG_top_menu.prototype.loadMenu = function(menuType) { 
  
  // 1) remove css
  this.contentContainer.removeClass();
  this.menuContainer.removeClass();
  this.menuContainer.parent().removeClass();


  //2) remove dom elements
  this.menuContainer.empty();

  // 3) add css classes to parent site containers 
  if (this.data.type == 'Side Menu') {
    this.menuContainer.addClass('sidebar-wrapper');
    this.contentContainer.addClass('page-content-wrapper');
    this.menuContainer.parent().addClass('wrapper');
  }

  // 4) build
  var lcontainer = this.buildContainer(this.menuContainer, this.containerId, this.data);
  this.container = lcontainer;

  // if (this.data.type == 'Top Menu') {
  //   var html = this.topMenuTemplate( this );
  // } else {
  //   var html = this.sideMenuTemplate( this );
  // }  

  // this.container.append(html);

  var assets = this.assets();
  var myobs = this;
  this.load_assets( assets, function(myobj) {

    $(".sidebar-ul > li.menutab").on("click", function(){
       console.log('navbar on click');
       $(".navbar-nav").find(".active").removeClass("active");
       $(this).addClass("active");
       var lid = this.id;
       activatePage(lid);
    });    
    
    $(".sidebar-ul").sortable({
      // items: "> li.menutab",
      items: " li.menutab",
      update: function( event, ui ) {
        console.log("sortable updated => TODO do not support multi levels menu");
        var arr = $(".sidebar-ul").sortable( "toArray" );
        
        var tempMenuPages = [];

        for (var i=0; i<arr.length; i++) {
          for (var j=0; j<jsonObj['menu']['pages'].length; j++) {
            if ( arr[i] == jsonObj['menu']['pages'][j][0]['name'] ) {
              tempMenuPages.push( jsonObj['menu']['pages'][j] );
              break;
            }
          }
        }

        jsonObj['menu']['pages'] = tempMenuPages;
        update_overflow();
      },

    });    


    // loading styles
    myobj.load_style();

    update_overflow();
  });  
  
  // load edit menu
  this.load_edit_menu( this.container, { } );
}



PDG_top_menu.logoImg = function(lid) { 
  console.log("logImg func called with " + lid);
  var lobj = BaseWidget.get_class_obj_from_container_id(lid);
  lobj.selectLogoImg();
}

PDG_top_menu.prototype.selectLogoImg = function(menuType) { 
  console.log("prototype selectLogoImg func called");
  //imageEditor(this);
  imageEditor(this, {
    'insertImage'     : this.setLogoImg.bind(this),
    // 'insertImage'     : $.proxy(function(e) {
    //                         setLogoImg(this);
    //                     }, this) ), ,

    'multippleSelect' : 0,
  });

}

PDG_top_menu.prototype.setLogoImg = function(menuType) { 
  console.log("prototype logImg func called");
  var image = selectedImages()[0];

  this.set_logo_image(image);

  editorClose();
}

