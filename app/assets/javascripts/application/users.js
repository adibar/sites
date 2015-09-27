
$( document ).ready( function() {

  $('[data-toggle="tooltip"]').tooltip({
    'container':'body',
  }); //initialize tooltips

  $(document).on("submit", "#new_user", function(ev) {

    ev.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      url:    $(this).attr('action'),
      method: $(this).attr('method'),
      data:   $(this).serialize(),
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

  $(document).on("submit", "#site-name-form", function(ev) {
    var hash_data = {};

    ev.preventDefault();

    var subd = $(this[name="site-name"]).val().replace(/\s/g, "") ;
    // var regex = (?:[A-Za-z0-9][A-Za-z0-9\-]{0,61}[A-Za-z0-9]|[A-Za-z0-9])

    // if ( /^[A-Za-z0-9][A-Za-z0-9\-]{0,61}[A-Za-z0-9]?/.test(subd) ) {
    if ( /^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/.test(subd) ) {
      setCookie("site-name", subd, 365);
      $('#template-selector').css("display", "block");
      // $('body').scrollTo('#template-selector');
      $('html, body').animate({
        scrollTop: $("#template-selector").offset().top
      }, 1500);
    } else {
      alert(subd + " is not a leagal site name click the ? buttton to learn about leagal names");
    }



    // var data = $(this).serialize() ;

    // // Set it into array of arrays
    // var tmp = data.split('&').map( function(el) { return el.split('='); } );
    // // array into hash
    // for (var i=0; i < tmp.length; i++) { hash_data[ tmp[i][0] ] = tmp[i][1] };

    // // alert ( "site name = " + unescape( encodeURIComponent( hash_data["site-name"] ) ) ) ;
    // alert ( "site name = " + encodeURIComponent(  hash_data["site-name"] ) ) ;
  });

});