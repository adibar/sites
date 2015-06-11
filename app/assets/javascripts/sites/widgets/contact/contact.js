function PDG_contact(container, path, data) {

  this.default_controllers = {
    'root': {
      'menu-margin-top': { 'type':'slider', 'val':100, 'range':[0,200], 'units':'px', "cb":"set_css", 'el':[ ['.PDG_contact', 'margin-top'] ], }, 
      'form-color': { 'type':'color-picker', 'val':'#000000',       'units':'', "cb":"set_css", 'el':[ ['.form-header', 'background-color'], ['.form-body', 'background-color'], ['.form-button', 'background-color'] ], },      
      // 'background-color': { 'type':'color-picker', 'val':'#000000', 'units':'', "cb":"set_css", 'el':[ ['.wrapper-addons', 'background-color'] ], },      
    }
  }
          
  // call base contructore
  BaseWidget.call(this, container, path, data);

  // obj public properties
  this.froala = null;

  // this.resize_counter = 0;

  /* each module declare lists of assets */
  var assets = {
    'css' : ['contact.css', ],
    'js'  : [ ],
    'html': 'contact.html',
  }

  var myobj = this;
  
  this.load_assets( assets, function(myobj) {
    
    // var source = $('#PDG_contact').html().replace(/[\u200B]/g, '');
    // var contact_templete = Handlebars.compile(source);
    
    // var html = contact_templete( myobj.data.data );
    
    // myobj.container.html(html);

    squareThis("#map_canvas");

    var addr = $(myobj.container.find('.contact_container')[0]).data('address');
    var map_container = myobj.container.find('#map_canvas')[0];
    myobj.load_map(map_container, addr );


    // myobj.container.find(".editable").html(myobj.data.data);                        
    myobj.container.find("#edit").on('click', function() {
      myobj.edit(1);
    });

    $(document).mouseup(function (e)
    {
      console.log("mouse up else");

      // var container = $("YOUR CONTAINER SELECTOR");
      var container = myobj.container.find("#edit");

      var x1 = !container.is(e.target);
      var x2 = container.parent().has(e.target).length;
      var x3 = $('#redactor-modal').has(e.target).length;
      var x4 = $('.redactor-dropdown').has(e.target).length;
      var x5 = !$(e.target).is('#redactor-modal-box')

      if (x1 // if the target of the click isn't the container...
        // && container.has(e.target).length === 0) // ... nor a descendant of the container
        && (x2 === 0) // ... nor a descendant of the container
          && (x3 === 0) 
            && (x4 === 0)
              && x5 )
      {
        if (myobj.froala != null) {
          console.log('***************************');
          console.log('getting txt value & closing');
          console.log('***************************');
          
          var lhtml = myobj.container.find("#edit").editable("getHTML", true, true);
          myobj.data.data.header = lhtml;
          BaseWidget.save_obj(myobj);
          //myobj.container.find(".txtcontainer").redactor('destroy');
          myobj.container.find("#edit").editable('destroy');
          myobj.froala = null;

          // // var lhtml = myobj.container.find(".txtcontainer").redactor('get');
          // var lhtml = myobj.container.find(".froala-view").redactor('code.get');
          // myobj.data.data = lhtml;
          // BaseWidget.save_obj(myobj);
          // //myobj.container.find(".txtcontainer").redactor('destroy');
          // myobj.container.find(".froala-view").redactor('core.destroy');
          // myobj.redactor = null;
        }
      }

    });    

    myobj.load_style();

    // load edit menu
    myobj.load_edit_menu( myobj.container, { } );
    myobj.resize( myobj.container.find("#edit") );
  } );
}

// See note below
PDG_contact.prototype = Object.create(BaseWidget.prototype); 
// Set the "constructor" property to refer to Student
PDG_contact.prototype.constructor = PDG_contact

PDG_contact.prototype.edit = function(val) {
  
  if (this.froala == null) {
    
    console.log('editting froala-view');
    
    var lhtml = this.container.find("#edit").html();

    console.log( lhtml );

    if (val != 1) {
      BaseWidget.prototype.edit.call(this);
    }

    console.log("PDG_froala_txt");

    var myobj = this;

    //this.froala = this.container.find(".editable").editable({ 
    this.froala = this.container.find("#edit").editable({  
      inlineMode: true,
      alwaysVisible: false,
      //language    : 'he',
    });

  }
}

PDG_contact.prototype.default_data = function() {
  
  var data =  
  {
    "widget_name": 'contact',
    "css": {
      "root": { },
    },
    "data": {
      "header"  : "<p> Contact Us, (editable ...) </p>",
      "address" : "מאפו 23 תל אביב ישראל"
    }
  };
  return data;
}

PDG_contact.prototype.resize = function(container) {
  
}

PDG_contact.prototype.load_map = function(container, address) {
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


