$(document).ready(function(){
  $(".template-selector-inner").click( function() {

    var template_id = $(this).data('template-id');

    $.ajax({
      method: "POST",
      url: "/sites",
      data: { template_id: template_id },

      complete: function(xmlHttp) {
        if (xmlHttp.status == 200) {
          if (xmlHttp.responseJSON) {
            location.href = xmlHttp.responseJSON.redirect;
          }
        }
      }
    })
  })
});