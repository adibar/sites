if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
	RedactorPlugins.imagemanager = function()
	{
		return {
			init: function()
			{
				if (!this.opts.imageManagerJson) return;

				this.modal.addCallback('image', this.imagemanager.load);
			},
			load: function()
			{
				var $modal = this.modal.getModal();

				// this.modal.createTabber($modal);
				// this.modal.addTab(1, 'Upload', 'active');
				// this.modal.addTab(2, 'Choose', 'active');

				//$('#redactor-modal-image-droparea').addClass('redactor-tab redactor-tab1');

				// var $box = $('<div id="redactor-image-manager-box" style="overflow: auto; height: 300px;" class="redactor-tab redactor-tab2">').show();
				// $modal.append($box);

				console.log('loading');

				//var source = t_image_selector;
  			// var source = $('#image-manager').html();
  			// var template = Handlebars.compile(source);
  			// Handlebars.registerPartial("image-manager-img", $("#image-manager-img").html());
  			// var html  = template( { } );  
  			// $modal.append( html); 

				$.ajax({
				  dataType: "json",
				  cache: false,
				  url: this.opts.imageManagerJson,
				  success: $.proxy(function(data)
					{
						// $.each(data, $.proxy(function(key, val)
						// {
						// 	// title
						// 	var thumbtitle = '';
						// 	if (typeof val.title !== 'undefined') thumbtitle = val.title;

						// 	var img = $('<img src="' + val.thumb + '" rel="' + val.image + '" title="' + thumbtitle + '" style="" />');
						// 	var li = $('<li style=""> </li>');
						// 	li.append(img)
						// 	// $('#redactor-image-manager-box').append(img);
						// 	$('#image-manager-image-list').append(li);
						// 	$(img).click($.proxy(this.imagemanager.insert, this));

						// }, this));

						var source = $('#image-manager').html().replace(/[\u200B]/g, '');
		  			var template = Handlebars.compile(source);
		  			Handlebars.registerPartial("image-manager-img", $("#image-manager-img").html().replace(/[\u200B]/g, '') );
		  			console.log('setting');
		  			var html  = template( { "images": data, "insert":$.proxy(this.imagemanager.insert, this), } );  
		  			$modal.append( html); 
		  			var insert = $("#insert-img");
		  			insert.click(this.imagemanager.insert);

						$('#image-manager-image-list').sortable({
      				cursor: "col-resize",
      				items: "> li",
 							placeholder: '> li',
    					connectWith: '#image-manager-image-list',
    					dropOnEmpty: true,
      				
      				update: function( event, ui ) {
        				var arr = $("#image-manager-image-list").sortable( "toArray" );
      				},
   					});


					}, this)
				});


			},
			//insert: function(e)
			insert: function(e)
			{
				console.log('insert');
				// // adi baron - force image initial width into 500px
				// console.log('INSERTED');
				// // var lstr = '<img src="' + $(e.target).attr('rel') + '" alt="' + $(e.target).attr('title') + '">';
				// var lstr = '<img src="' + $(e.target).attr('rel') + '" alt="' + $(e.target).attr('title') + '" style="width:500px;" ' + '>';
				// this.image.insert(lstr);

				var lobj = this;
				var els = $(".selected-img");
				els.each(function( index ) {
					var limg = $(this).find('img')[0];
					var lstr = '<img src="' + $(limg).attr('rel') + '" alt="' + $(limg).attr('title') + '" style="width:500px;" ' + '>';
					var marker = lobj.selection.getMarker();
        	lobj.insert.node(marker);
					lobj.image.insert(lstr);
					console.log("insert -> " + $(limg).attr('rel')) ;
				});
			}
		};
	};
})(jQuery);