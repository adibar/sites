
var imageEditorObj; 

function imageEditor(obj) {
  $("#main-modal").modal( { } );
  console.log('modal called');
  $("#main-modal").off('hidden.bs.modal');
  $("#main-modal").on('hidden.bs.modal', function (e) {
    console.log('closing modal');
    editorClose();
  });

  imageEditorObj = obj;

  $.ajax({
    dataType: "json",
    cache: false,
    url: '/siteseditor/images',
    success: $.proxy(function(data) {

      console.log('setting');

      var lobj = {  "images": data,  
                    "object_images":obj.data.data.photos, 
                    "img_cbs":{ 
                      "delete_class"  : "img_delete", 
                      "edit_class"    : "img_edit",
                      "select_class"  : "img_select"
                    },                              
                    "obj_cbs":{ 
                      "delete_class"  : "obj_delete", 
                      "edit_class"    : "obj_edit",
                    } 
                } ;

      var html = image_manager_templete( lobj );
      
      var lbody = $(".modal-body");
      lbody.empty();
      lbody.append( html );
      unselect_all();

      // $("#insert-img").click( $.proxy(this.insertImage, this) );
      // $("#insert-img").click( $.proxy(insertImage, obj) );
      $("#insert-img").click( { obj: obj }, insertImage);
      $(".obj_delete").click( { obj: obj }, removeImage);

      sortable();
      // $('#image-manager-obj-list > ul').sortable({        
      //   cursor: "col-resize",
      //   items: "> li",
      //   placeholder: '> li',
      //   connectWith: '#image-manager-image-list',
      //   dropOnEmpty: true,
        
      //   update: function( event, ui ) {
      //     var arr = $(this).sortable( "toArray" );
      //   },
      // });
    }),
  });
}

function editorClose() {
  if ( imageEditorObj.modified == true ) {
    imageEditorObj.reload() ;
  }
}

function sortable() {
  $('#image-manager-obj-list > ul').sortable({        
    cursor: "col-resize",
    items: "> li",
    placeholder: '> li',
    connectWith: '#image-manager-image-list',
    dropOnEmpty: true,
    
    update: function( event, ui ) {
      var arr = $(this).sortable( "toArray", "data-id" );
      
      var imgHash = {};
      for (var i=0; i<imageEditorObj.data.data.photos.length; i++) {
        imgHash[imageEditorObj.data.data.photos[i].id] = imageEditorObj.data.data.photos[i];
      }

      var newPhotos = [];
      for (var i=0; i<arr.length; i++) {
        console.log ('index:' + i + ' is:' + arr[i] );
        newPhotos.push( imgHash[arr[i]] );
      };

      imageEditorObj.data.data.photos = newPhotos; 
      imageEditorObj.modified = true;

      reloadEditor(imageEditorObj);  
    },
  });  
}

function insertImage(ev) {

  var obj = ev.data.obj;
  var els = $(".selected-img");
  els.each(function( index ) {
    var limg = $(this).find('img')[0];
    var attrs = { 
      'id'    : $(this).data('id'),
      'thumb' : $(limg).attr('src'),
      'image' : $(limg).attr('rel'),
      'txt'   : $(limg).attr('title')
    };

    obj.data.data.photos.push( attrs );
    obj.added( );
  });
  
  obj.reload();

  // var lobj = {  "object_images":obj.data.data.photos, 
  //               "obj_cbs":{ 
  //                 "delete_class"  : "obj_delete", 
  //                 "edit_class"    : "obj_edit",
  //               } 
  //           } ;

  // var lhtml = Handlebars.partials["image-manager-obj-list"](lobj);
  // $("#image-manager-obj-list").replaceWith(lhtml);

  // sortable();

  // $(".obj_delete").click( { obj: ev.data.obj }, removeImage);    
  reloadEditor(obj);  
}

function removeImage(ev) {

  var lindex = $(this).parent().data('id');
  console.log('removing index ' + lindex + ' from gallery');
  ev.data.obj.data.data.photos.splice(lindex, 1);

  // var lobj = {  "object_images":ev.data.obj.data.data.photos, 
  //               "obj_cbs":{ 
  //                 "delete_class"  : "obj_delete", 
  //                 "edit_class"    : "obj_edit",
  //               } 
  //           } ;

  // var lhtml = Handlebars.partials["image-manager-obj-list"](lobj);
  // $("#image-manager-obj-list").replaceWith(lhtml);

  // sortable();  
  
  // $(".obj_delete").click( { obj: ev.data.obj }, removeImage);    

  // ev.data.obj.removed(lindex);
  reloadEditor(ev.data.obj);
}

function reloadEditor(obj) {
  var lobj = {  "object_images":obj.data.data.photos, 
                "obj_cbs":{ 
                  "delete_class"  : "obj_delete", 
                  "edit_class"    : "obj_edit",
                } 
            } ;

  var lhtml = Handlebars.partials["image-manager-obj-list"](lobj);
  $("#image-manager-obj-list").replaceWith(lhtml);

  sortable();  
  
  $(".obj_delete").click( { obj: obj }, removeImage);      
}

