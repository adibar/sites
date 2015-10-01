
$( document ).ready( function() {

  $('[data-toggle="tooltip"]').tooltip({
    'container':'body',
  }); //initialize tooltips

  $(document).on("submit", "#new_user", function(ev) {

    ev.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      url:      $(this).attr('action'),
      method:   $(this).attr('method'),
      dataType: 'json',
      data:     $(this).serialize(),
    })
    .done(function (data, textStatus, jqXHR) {
      // Do something with the response
      location.reload();
    }).fail(function (jqXHR, textStatus, errorThrown) {
      // Whoops; show an error.
      var err = jqXHR.responseText;
      $("#error_explanation").remove();
      $(".error_box").html(err);
    });
  });

  $(document).on("submit", "#create_user", function(ev) {

    ev.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      url:      $(this).attr('action'),
      method:   $(this).attr('method'),
      dataType: 'json',
      data:     $(this).serialize(),
    })
    .done(function (data, textStatus, jqXHR) {
      // Do something with the response
      $("#general-modal").modal('hide');
      location.reload();
      // TODO - adi baron - this is bad practice =>
      // insted send the site params as nested params in the create user form.
      // setTimeout(function(){
      //   location.reload();
      // }, 5000);
    }).fail(function (jqXHR, textStatus, errorThrown) {
      // Whoops; show an error.
      var err = JSON.parse(jqXHR.responseText).errors;
      $.each( err, function( key, value ) {
        $('#create_user #error-msg').empty();
        $('#create_user #error-msg').append("<div>" + key + ": " + value + "</div>");
      });
    });
  });

  $(document).on("submit", "#site-name-form", function(ev) {
    var hash_data = {};

    ev.preventDefault();

    var subd = $(this[name="site-name"]).val().replace(/\s/g, "") ;

    if ( /^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/.test(subd) ) {
      setCookie("site-name", subd, 365);
      $('#template-selector').css("display", "block");
      $('html, body').animate({
        scrollTop: $("#template-selector").offset().top
      }, 1000);
    } else {
      alert(subd + " is not a leagal site name click the ? buttton to learn about leagal names");
    }

  });

});