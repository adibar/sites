function PDG_contact(container, path, data) {

  this.default_controllers = {
    'root': {

    }
  }
          
  // call base contructore
  BaseWidget.call(this, container, path, data);

  // obj public properties
  // this.froala = null;

  // this.resize_counter = 0;

  /* each module declare lists of assets */
  var assets = {
    'css' : ['contact.css', ],
    'js'  : [ ],
    'html': 'contact.html',
  }

  var myobj = this;
  
  this.load_assets( assets, function(myobj) {
    
    var source = $('#PDG_contact').html().replace(/[\u200B]/g, '');
    var contact_templete = Handlebars.compile(source);

    // myobj.container.find(".editable").html(myobj.data.data);
      
    // myobj.container.find(".editable").on('click', function() {
    //   myobj.edit(1);
    // });

    // $(document).mouseup(function (e)
    // {
    //   console.log("mouse up else");

    //   // var container = $("YOUR CONTAINER SELECTOR");
    //   var container = myobj.container.find(".editable");

    //   var x1 = !container.is(e.target);
    //   var x2 = container.parent().has(e.target).length;
    //   var x3 = $('#redactor-modal').has(e.target).length;
    //   var x4 = $('.redactor-dropdown').has(e.target).length;
    //   var x5 = !$(e.target).is('#redactor-modal-box')

    //   if (x1 // if the target of the click isn't the container...
    //     // && container.has(e.target).length === 0) // ... nor a descendant of the container
    //     && (x2 === 0) // ... nor a descendant of the container
    //       && (x3 === 0) 
    //         && (x4 === 0)
    //           && x5 )
    //   {
    //     if (myobj.froala != null) {
    //       console.log('***************************');
    //       console.log('getting txt value & closing');
    //       console.log('***************************');
          
    //       var lhtml = myobj.container.find(".editable").editable("getHTML", true, true);
    //       myobj.data.data = lhtml;
    //       BaseWidget.save_obj(myobj);
    //       //myobj.container.find(".txtcontainer").redactor('destroy');
    //       myobj.container.find(".editable").editable('destroy');
    //       myobj.froala = null;

    //       // // var lhtml = myobj.container.find(".txtcontainer").redactor('get');
    //       // var lhtml = myobj.container.find(".froala-view").redactor('code.get');
    //       // myobj.data.data = lhtml;
    //       // BaseWidget.save_obj(myobj);
    //       // //myobj.container.find(".txtcontainer").redactor('destroy');
    //       // myobj.container.find(".froala-view").redactor('core.destroy');
    //       // myobj.redactor = null;
    //     }
    //   }

    });    

    myobj.load_style();
    myobj.resize( myobj.container.find(".editable") );
  } );
}

// See note below
PDG_contact.prototype = Object.create(BaseWidget.prototype); 
// Set the "constructor" property to refer to Student
PDG_contact.prototype.constructor = PDG_froala_txt;

PDG_contact.prototype.edit = function(val) {
  
  if (this.froala == null) {
    
    console.log('editting froala-view');
    
    var lhtml = this.container.find(".editable").html();

    console.log( lhtml );

    if (val != 1) {
      BaseWidget.prototype.edit.call(this);
    }

    console.log("PDG_froala_txt");

    var myobj = this;

    this.froala = this.container.find(".editable").editable({
      inlineMode  : false,
      language    : 'he',
    });

  }
}

PDG_contact.prototype.default_data = function() {
  
  var data =  
  {
    "widget_name": 'general-txt',
    "css": {
      "root": { },
    },
    'data': "<h1 style='text-align: center; background-color:'> Rich text area </h1> <p> Edit this text / Add photos / design </p>"
  };
  return data;
}

PDG_contact.prototype.resize = function(container) {
  
}

