// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

//= require jquery
//= require jquery_ujs
//= require turbolinks

//= require sites/bootstrap

//= require application/template_selector
//= require application/languages
//= require application/users

$(document).ready(function(){

  $("#general-modal").on("show.bs.modal", function(e) {
    var lurl = $("#general-modal").data('url');
    var template_id = $("#general-modal").data('template_id');
    var site_name = $("#general-modal").data('site_name');

    $("#general-modal .modal-content").load(lurl, function() {
      $("#user_sites_attributes_0_template_id").val(template_id);
      $("#user_sites_attributes_0_name").val(site_name);
    });
  });

  $("#general-modal").on("hide.bs.modal", function(e) {

    var cb = $("#general-modal").data( 'cb');
    eval(cb);
    // a cb might be assigned while opening the modal
    $("#general-modal").removeData( 'cb');
  });

});