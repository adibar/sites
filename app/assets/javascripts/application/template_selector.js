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
        // if (xmlHttp.responseJSON) {
        //   location.href = xmlHttp.responseJSON.redirect;
        // }
        cb(200, xmlHttp.responseJSON.redirect);
      }
      else if (xmlHttp.status == 401) {
        cb(401);
      }
    }
  });
}