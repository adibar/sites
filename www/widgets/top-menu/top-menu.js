function loadmenu(container, path, data) {
  
  /* each module declare lists of assets */
  var assets = {
    'css' : ['top-menu.css', ],
    'js'  : [],
    'html': 'top-menu.html',
  }

  for (var i=0; i<assets.css.length; i++) {
    $('<link>').attr('rel','stylesheet')
      .attr('type','text/css')
      .attr('href', path + assets.css[i] + '?'+Math.random()*Math.random())
      .appendTo('head');
  }
  
  // alert(assets.css.length + " css files loaded");

  $.get(path + assets.html + '?'+Math.random()*Math.random(), function (ldata) {
    container.append(ldata);
    
    for (var i=0; i<data.menu.pages.length; i++) {
      if (data["menu"]["view"]["active"] == data.menu.pages[i][0].name) {
        var li_str = "<li id='" + data.menu.pages[i][0].name + "' class='active' style=''> <a style='' href='#'>" + data.menu.pages[i][0].name + "</a> </li>";
      }
      else {
        var li_str = "<li id='" + data.menu.pages[i][0].name + "' class='' style=''> <a style='' href='#'>" + data.menu.pages[i][0].name + "</a> </li>";
      }
 
      $(".navbar-nav").append( li_str );
    }

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

}