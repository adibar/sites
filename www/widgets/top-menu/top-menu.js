function PDG_top_menu(container, path, data) {
  
  this.default_controllers = {
    'root': {
      'brand-center': { 'type':'checkbox', 'val':false, 'cb': "set_css_class", 'el':[ ['.navbar-header', 'navbar-header-center'], ['.navbar-brand-style', 'navbar-brand-style-center'],
          ['.navbar-nav', 'navbar-nav-center'], ['.navbar-collapse', 'navbar-collapse-center'], ], },
      
      'brand-width': { 'type':'slider', 'val':40, 'range':[100,500], 'units':'px', "cb":"set_css", 'el':[ ['.navbar-brand-style', 'width'] ], }, 

      'menu-margin-top': { 'type':'slider', 'val':300, 'range':[0,200], 'units':'px', "cb":"set_css", 'el':[ ['.navbar-collapse-style > ul', 'margin-top'] ], }, 
      
      'border-width': { 'type':'slider', 'val':0, 'range':[0,20], 'units':'px', "cb":"set_css", 'el':[ ['header', 'border-bottom-width'] ], }, 
      
      'border-style': { 'type':'select', 'val':0, 'units':'', "cb":"set_css", 'el':[ ['header', 'border-bottom-style'] ], 
          'options':['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge' ,'inset', 'outset'], }, 

      'border-color': { 'type':'color-picker', 'val':'#000000', 'units':'', "cb":"set_css", 'el':[ ['header', 'border-bottom-color'] ], }, 
    }
  };
  
  BaseWidget.call(this, container, path, data);

  /* each module declare lists of assets */
  var assets = {
    'css' : ['top-menu.css', ],
    'js'  : [],
    'html': 'top-menu.html',
  }

  // this.controllers = {
  //   'root': {
  //     'brand-center': { 'type':'checkbox', 'val':false, 'el':[ ['.navbar-header', 'navbar-header-center'], ['.navbar-brand-style', 'navbar-brand-style-center'],
  //         ['.navbar-nav', 'navbar-nav-center'], ['.navbar-collapse', 'navbar-collapse-center'], ], },
  //     'brand-centerxxx': { 'type':'checkbox', 'val':false, 'el':[ ['.navbar-header', 'navbar-header-center'], ['.navbar-brand-style', 'navbar-brand-style-center'] ], },
  //   }
  // }

  var myobj = this;
  
  this.load_assets( assets, function(myobj) {
    
    // load data
    for (var i=0; i<myobj.data.pages.length; i++) {
      if (myobj.data["view"]["active"] == myobj.data.pages[i][0].name) {
        var li_str = "<li id='" + myobj.data.pages[i][0].name + "' class='active' style=''> <a style='' href='#'>" + myobj.data.pages[i][0].name + "</a> </li>";
      }
      else {
        var li_str = "<li id='" + myobj.data.pages[i][0].name + "' class='' style=''> <a style='' href='#'>" + myobj.data.pages[i][0].name + "</a> </li>";
      }
 
      $(".navbar-nav").append( li_str );
    }

    //load style
    myobj.load_style();

    $(".navbar-nav > li").on("click", function(){
       console.log('navbar on click');
       $(".navbar-nav").find(".active").removeClass("active");
       $(this).addClass("active");
       var lid = this.id;
       activatePage(lid);
    });    
    
    $(".navbar-nav").sortable({
      update: function( event, ui ) {
        console.log("sortable updated");
        var arr = $(".navbar-nav").sortable( "toArray" );
        console.log("sortable updated");
      },
    });
  
  });

  // for (var i=0; i<assets.css.length; i++) {
  //   $('<link>').attr('rel','stylesheet')
  //     .attr('type','text/css')
  //     .attr('href', path + assets.css[i] + '?'+Math.random()*Math.random())
  //     .appendTo('head');
  // }

  // $.get(path + assets.html + '?'+Math.random()*Math.random(), function (ldata) {
  //   container.append(ldata);
    
  //   for (var i=0; i<data.menu.pages.length; i++) {
  //     if (data["menu"]["view"]["active"] == data.menu.pages[i][0].name) {
  //       var li_str = "<li id='" + data.menu.pages[i][0].name + "' class='active' style=''> <a style='' href='#'>" + data.menu.pages[i][0].name + "</a> </li>";
  //     }
  //     else {
  //       var li_str = "<li id='" + data.menu.pages[i][0].name + "' class='' style=''> <a style='' href='#'>" + data.menu.pages[i][0].name + "</a> </li>";
  //     }
 
  //     $(".navbar-nav").append( li_str );
  //   }

  //   $(".navbar-nav > li").on("click", function(){
  //      console.log('navbar on click');
  //      $(".navbar-nav").find(".active").removeClass("active");
  //      $(this).addClass("active");
  //      var lid = this.id;
  //      activatePage(lid);
  //   });    
    

  //   $(".navbar-nav").sortable({
  //     update: function( event, ui ) {
  //       console.log("sortable updated");
  //       var arr = $(".navbar-nav").sortable( "toArray" );
  //       console.log("sortable updated");
  //     },
  //   });
  // });

}

// See note below
PDG_top_menu.prototype = Object.create(BaseWidget.prototype); 
// Set the "constructor" property to refer to Student
PDG_top_menu.prototype.constructor = PDG_top_menu;