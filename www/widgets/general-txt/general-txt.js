function PDG_general_txt(container, path, data) {
          
  // call base contructore
  BaseWidget.call(this, container, path, data);

  // obj public properties
  this.redactor = null;

  this.controllers = {
    'root': {
      'height': { 'val':'400', 'type':'slider', 'range':[100,2000], 'reload':'true', 'el':'.txtcontainer', },
      'margin-top': { 'val':'20', 'type':'slider', 'range':[0,200], 'el':'.txtcontainer', },
      'margin': { 'val':'0', 'type':'slider', 'range':[0,200], 'el':'.slickcontainer .datacontainer', }, // left & right  
    }
  }

  this.resize_counter = 0;

  // container.addClass("picndo-inline");

  /* each module declare lists of assets */
  var assets = {
    // 'css' : ['general-txt.css', 'redactor/toolbar_he.css', 'redactor/he.css'],
    'css' : ['general-txt.css', 'redactor/redactor.css', ],
    // TODO - adi baron - this is a temprorary fix - redactor.js must load before he.js otherwise crash - while async loading this fix might not work always
    // 'js'  : ['redactor/fontcolor.js', 'redactor/fontsize.js', 'redactor/fullscreen.js', 'redactor/he.js', 'redactor/redactor.js' ],
    // 'js'  : ['redactor/redactor.js', 'redactor/fontcolor.js', 'redactor/fontsize.js', 'redactor/fullscreen.js', 'redactor/he.js'],
    'js'  : [ 'redactor/redactor.js',
              'redactor/plugins/fontcolor/fontcolor.js',
              'redactor/plugins/fontsize/fontsize.js',
              'redactor/plugins/fontfamily/fontfamily.js',
              'redactor/plugins/imagemanager/imagemanager.js',
              'redactor/plugins/textdirection/textdirection.js',
              'redactor/plugins/fullscreen/fullscreen.js',
            ],
    'html': 'general-txt.html',
  }

  var myobj = this;
  
  this.load_assets( assets, function(myobj) {
    myobj.container.find(".txtcontainer").html(myobj.data.data);
      
    myobj.container.find(".txtcontainer").on('click', function() {
      myobj.edit(1);
    });

    $(document).mouseup(function (e)
    {
      console.log("mouse up else");

      // var container = $("YOUR CONTAINER SELECTOR");
      var container = myobj.container.find(".txtcontainer");

      var x1 = !container.is(e.target);
      var x2 = container.parent().has(e.target).length;
      var x3 = $('#redactor-modal').has(e.target).length;
      var x4 = $('.redactor-dropdown').has(e.target).length;

      // var x3 = false;
      // $('#redactor_modal').each(function() {
      //   if ( $.contains( $(this).get(), e.target ) ) {
      //     x3 = true;
      //     return false;
      //   }
      // });

      // var x4 = false;
      // $('.redactor-dropdown').each(function() {
      //   // alert('1');
      //   if ( $.contains( $(this).get(), e.target ) ) {
      //     x4 = true;
      //     return false;
      //   }
      // });      

      if (x1 // if the target of the click isn't the container...
        // && container.has(e.target).length === 0) // ... nor a descendant of the container
        && (x2 === 0) // ... nor a descendant of the container
          && (x3 === 0) 
            && (x4 === 0))
          // && (x2 === 0)
          //   && (!x3)
          //     && (!x4) )
      {
        if (myobj.redactor != null) {
          // var lhtml = myobj.container.find(".txtcontainer").redactor('get');
          var lhtml = myobj.container.find(".txtcontainer").redactor('code.get');
          myobj.data.data = lhtml;
          BaseWidget.save_obj(myobj);
          //myobj.container.find(".txtcontainer").redactor('destroy');
          myobj.container.find(".txtcontainer").redactor('core.destroy');
          myobj.redactor = null;
        }
      }

    });    

    myobj.resize( myobj.container.find(".txtcontainer") );
  } );
}

// See note below
PDG_general_txt.prototype = Object.create(BaseWidget.prototype); 
// Set the "constructor" property to refer to Student
PDG_general_txt.prototype.constructor = PDG_general_txt;

PDG_general_txt.prototype.edit = function(val) {
  
  if (this.redactor == null) {
    
    console.log('editting redactor');
    
    var lhtml = this.container.find(".txtcontainer").html();

    console.log( lhtml );

    if (val != 1) {
      BaseWidget.prototype.edit.call(this);
    }

    console.log("PDG_general_txt");

    var myobj = this;

    this.redactor = this.container.find(".txtcontainer").redactor({
      //focus:          true,
      //focusEnd:       true,
      lang:           'he',
      imageUpload:    '/siteseditor/image_upload',
      // imageUpload:    '/siteseditor/images',
      imageManagerJson:   '/siteseditor/images',
      // plugins:        ['fontcolor','fontsize', 'fullscreen', 'textdirection', 'custombutton'],
      plugins:        ['fontcolor','fontsize', 'fontfamily', 'imagemanager', /*'fullscreen',*/ 'textdirection', 'custombutton'],

      // focusCallback: function(e)
      // {
      //   // console.log(this.code.get());
      //   myobj.container.find(".txtcontainer").redactor('focus.setEnd');
      //   console.log('focus');
      //   // myobj.container.find(".txtcontainer").redactor('caret.setEnd');
        
      // }
      imageUploadCallback: function(image, json)
      {
        $(image).attr('id', json.id);
        $(image).css('width', '500px');
      },

    });

    // this.redactor.focus.setEnd();
    //this.container.find(".txtcontainer").redactor('setEditor', this.data.data);
    // this.container.find(".txtcontainer").redactor('setEditor', lhtml);
    // this.container.find(".txtcontainer").redactor('set', lhtml);

    this.container.find(".txtcontainer").resizable( "destroy" );
    this.resize( this.container.find(".txtcontainer") );

    //this.container.find(".txtcontainer").redactor('focus.setEnd');
    // this.redactor('focus.setEnd');
  }
}

PDG_general_txt.prototype.default_data = function() {
  // return "<p style='text-align: center; background-color: rgb(255, 255, 255); display:inline;'><img src='http://127.0.0.1:8000/static/img/media/IMG_1772.jpg' alt='' style='width: 690px; float: left; margin: 0px 10px 10px 0px;' helvetica='' neue',='' helvetica,='' arial,='' sans-serif;='' text-align:='' right;='' float:='' left;='' margin:='' 0px='' 10px='' 0px;='' background-color:='' initial;'=''></p><p style='text-align: justify; margin-left: 760px;'></p><h1 style='text-align: center;'><span style='color: rgb(54, 96, 146);'><em>איך אני תופס את הרגעים הללו?</em></span></h1><p><em><br></em></p><p><span style='font-size: 18px;'><em>לאחורונה עוצרים אותי הרבה ברחוב ושואלים אותי,</em></span></p><p><span style='font-size: 18px;'><span style='color: rgb(165, 165, 165);'><em>&nbsp; &nbsp;&nbsp;איך לעזעזל את תופס את הרגעים הללו?</em></span></span></p><p><span style='font-size: 18px;'><span style='color: rgb(165, 165, 165);'><em><br></em></span></span></p><p><span style='font-size: 18px;'><em><span style='color: rgb(0, 0, 0);'>אין לי תשובה אמיתי לשאלה הזאת, אבל סוד אחד אני יכול לגלות לכם:</span></em></span></p><p><span style='font-size: 18px;'><span style='color: rgb(0, 0, 0);'><em>את האווירה, התחושה והאמונה במה שאני עושה, אף אחד לא יכול לפספס. זה נובע ממני ומהאנרגיות בסטודיו שלי. נעים לי ונעים לדוגמנים.</em></span></span></p><p><span style='font-size: 18px;'><span style='color: rgb(0, 0, 0);'><em>אז קדימה, עכשיו את יודעים, פשוט תהיו מי שאתם</em></span></span></p><p><span style='color: rgb(0, 0, 0);'><em><strong></strong><span style='font-size: 20px;'><strong>ותתחילו לצלם!!!</strong></span></em></span></p><p style='direction: rtl; text-align: right;'><span style='color: rgb(0, 0, 0);'><em><span style='font-size: 20px;'><strong>שלכם,&nbsp;</strong></span></em></span><a href='http://ynet.co.il' target='_blank'><span style='font-size: 20px;'><span style='color: rgb(54, 96, 146);'>עדי ברון&nbsp;</span></span></a></p><p style='text-align: center; margin-left: 160px;'></p>"
  
  var data =  
  {
    "widget_name": 'general-txt',
    "css": {

    },
    'data': "<h1 style='text-align: center; background-color:'> Rich text area </h1> <p> Edit this text / Add photos / design </p>"
  };
  return data;
}

PDG_general_txt.prototype.resize = function(container) {
  
  //alert('resized');  
  container.resizable({
    //handles: "n, e, s, w",
    handles: "e",
    stop: function( event, ui ) {
      // c_obj = BaseWidget.get_class_obj_for_event(ui.element[0]);
        
      // c_obj.container.find(".slickcontainer").resizable( "destroy" );
      // c_obj.container.find(".slickcontainer").slick( 'unslick' );
      // // c_obj.container.find(".slickcontainer").unslick();
      // // c_obj.container.find(".slickcontainer").slick( 'setPosition' );

      // c_obj.container.find(".slickcontainer").slick({
      //   dots: false,
      //   arrows:true,
      //   infinite: true,
      //   speed: 800,
      //   slidesToShow: 1,
      //   centerMode: true,
      //   variableWidth: true,    
      //   slidesToScroll: 1,
      //   focusOnSelect: true,
      //   cssEase: "ease-out"
      // });
      // c_obj.resize( c_obj.container.find(".slickcontainer") );
    
      console.log('resized');
    }   
  });
}

