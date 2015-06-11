//= require jquery
//= require jquery_ujs
//= require jquery.turbolinks

//= require sites/bootstrap

//= require shared
//= require sites/imagesLoaded
//= require sites/masonary
//= require sites/slick/slick
//= require sites/image-flow/imageflow
//= require sites/fancybox/source/jquery.fancybox

//= require jssor/jssor.slider.mini
//= require overflow-navs/bootstrap-overflow-navs

//    widgets => just for static functions
// ******************************************
//= require sites/base_widget
//= require sites/widgets/multi-elements/multi-elements


//= require turbolinks



$(document).ready(function(){
	
  $('.slickcontainer').slick({
		dots: false,
		arrows:true,
		infinite: true,
		speed: 800,
		slidesToShow: 1,
		centerMode: true,
		variableWidth: true,    
		slidesToScroll: 1,
		focusOnSelect: true,
		cssEase: "ease-out",
		autoplay: true,
		autoplaySpeed: 3000,
	});

	var imageFlow_obj = new ImageFlow();
	imageFlow_obj.init({
		ImageFlowID: 'imageflow1',
		reflections: false,
		opacity: true,
		opacityArray: [10, 8, 5, 2, 1],
		circular: true,
		slider: true,
		buttons:true,
		slideshow: true,
		sliderWidth: 24,
		onClick: function() { console.log("clicked to view"); },
		percentOther: 120,
		percentLandscape: 240,
		xStep: 200,
		aspectRatio: 2.333,
		imagesHeight: 0.67,

		slideshowSpeed: 3500,
		animationSpeed: 100,
	});

	var container = document.querySelector('.masonary-container');
	var msnry;
	
	if (container) {
		// initialize Masonry after all images have loaded
		imagesLoaded( container, function() {
	  		msnry = new Masonry( container, {
	  			"columnWidth": ".masonary-container > div"
	  		});
	  		msnry.bindResize();
	  		$(window).bind('resize', function () {
	    		msnry.layout();
			}).trigger('resize');
	  		
	  		msnry.on( 'layoutComplete', function() {
	  			// $(window).trigger('resize');
	  		});
	  		// $(window).trigger('resize');
		});	
	}


  // For multi elements
  // myobj.masnry_container = myobj.container.get(0).querySelector('.multielementscontainer');

  // myobj.msnry = new Masonry( myobj.masnry_container, {
  //   "columnWidth" : ".multielement",
  //   isInitLayout  : false,
  // });
  
  // myobj.msnry.bindResize();

  // myobj.msnry.on( 'layoutComplete', function() {
  //   myobj.onLayout();
  // } );

  // myobj.msnry.layout();  

  

  // $('.multielementscontainer').masonry( {
  //   "columnWidth" : ".multielement",
  //   isInitLayout  : false,
  // }).masonry();
  
  // jQuery.each( $('.multielementscontainer'), function()  {
    // $this.masonry( {
    $('.multielementscontainer').masonry( {  
      "columnWidth" : ".multielement",
      isInitLayout  : false,
    }).masonry();
    PDG_multi_elements.onLayout();
    //$this.masonry( 'on', 'layoutComplete', PDG_multi_elements.onLayout() );
    $('.multielementscontainer').masonry( 'on', 'layoutComplete', function(){ PDG_multi_elements.onLayout(); } );
  // });

  squareThis("#map_canvas");
  var addrcontainer = $('.contact_container')
  if (addrcontainer.length > 0) {
    var addr = $(addrcontainer[0]).data('address');
  }
  var map_container = $('#map_canvas')[0];
  if (map_container) {
    load_map(map_container, addr );    
  }  

});


function load_map(container, address) {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(container, myOptions);
  if (geocoder) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          
          map.setCenter(results[0].geometry.location);

          var infowindow = new google.maps.InfoWindow(
              { content: '<b>'+address+'</b>',
                size: new google.maps.Size(150,50)
              });

          var marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map, 
              title:address
          }); 
          google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map,marker);
          });
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
}  

function squareThis (element, ratio, minLimit)
{
    // First of all, let's square the element
    square(ratio, minLimit);
 
    // Now we'll add an event listener so it happens automatically
    window.addEventListener('resize', function(event) {
        square(ratio, minLimit);
    });
    
    // This is just an inner function to help us keep DRY
    function square(ratio, minLimit)
    {
        if(typeof(ratio) === "undefined")
        {
            ratio = 1;
        }
        if(typeof(minLimit) === "undefined")
        {
            minLimit = 0;
        }
        var viewportWidth = window.innerWidth;
        
        if(viewportWidth >= minLimit)
        {
            var newElementHeight = $(element).width() * ratio;
            $(element).height(newElementHeight);
        }
        else
        {
            $(element).height('auto');
        }
    }
}