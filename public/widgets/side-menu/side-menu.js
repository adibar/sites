
function PDG_side_menu(container, path, data) {

  var myobj = this
  
  $.getScript( './widgets/top-menu/top_menu.js', function( ldata, textStatus, jqxhr ) {
           
    // call base contructore
    PDG_top_menu.call(myobj, container, path, data, false );

    /* each module declare lists of assets */
    var assets = {
      'css' : ['top-menu.css', ],
      'js'  : [],
      'html': 'top-menu.html',
    }
    
    myobj.load_assets(assets, function(myobj) {
                
    });

  }).fail(function( jqxhr, settings, exception ) {
      alert("failed loading top-menu for side menu");
  });

}

PDG_side_menu.prototype = Object.create(PDG_top_menu.prototype); 

PDG_side_menu.prototype.constructor = PDG_side_menu;

