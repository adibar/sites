$(document).ready(function(){
  $(".template-selector-inner").click( function() {

    var template_id = $(this).data('template-id');
    var site_name = getCookie("site-name");

    create_site(template_id, site_name, function(code, value) {

      if (code == 200) {
        var win = window.open(value, '_blank');
        win.focus();
      }
      else if (code == 401) {
        $("#general-modal").data("url", "/users/sign_up");
        $("#general-modal").data("template_id", template_id);
        $("#general-modal").data("site_name", site_name);

        // $("#general-modal").data('cb', "create_site(" + template_id + "," + "'" + site_name + "'" + ")" );
        $("#general-modal").modal('show');
      }

    });
  })

});

function create_site(template_id, site_name, cb) {
  $.ajax({
    method: "POST",
    url: "/sites",
    dataType: 'script',
    data: {
      template_id: template_id,
      name:site_name ,
    },
    complete: function(xmlHttp) {
      if (xmlHttp.status == 200) {
        var lurl = JSON.parse(xmlHttp.responseText).redirect;
        if (cb) {
          cb(200, lurl);
        }
        else {
          if (xmlHttp.responseText) {
            var win = window.open(lurl, '_blank');
            win.focus();
          }
        }
      }
      else if (xmlHttp.status == 401) {
        if (cb) { cb(401); };
      }
    }
  });
}