$(document).ready(function(){
  $(".template-selector-inner").click( function() {

    var template_id = $(this).data('template-id');

    $.ajax({
      method: "POST",
      url: "/sites",
      data: { template_id: template_id },
      // statusCode: {
      //   404: function() {
      //     alert( "page not found" );
      //   },
      //   302: function( jqXHR, textStatus, errorThrown ) {
      //     alert( "redirect" );
      //   },
      //   301: function( jqXHR, textStatus, errorThrown ) {
      //     alert( "redirect" );
      //   }
      // },
      complete: function(xmlHttp) {
        if (xmlHttp.status == 200) {
          if (xmlHttp.responseJSON) {
            location.href = xmlHttp.responseJSON.redirect;
          }
        }
      }
    })
    // .done(function() {
    //   alert( "success" );
    // })
    // .fail(function() {
    //   alert( "error" );
    // })
    // .always(function( data_or_jqXHR, textStatus, jqXHR_or_errorThrown ) {
    //   alert( "complete" );
    // });

  })

});