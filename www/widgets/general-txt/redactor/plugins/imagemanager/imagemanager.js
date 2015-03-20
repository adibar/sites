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

				this.modal.createTabber($modal);
				// this.modal.addTab(1, 'Upload', 'active');
				this.modal.addTab(2, 'Choose', 'active');

				$('#redactor-modal-image-droparea').addClass('redactor-tab redactor-tab1');

				var $box = $('<div id="redactor-image-manager-box" style="overflow: auto; height: 300px;" class="redactor-tab redactor-tab2">').show();
				$modal.append($box);

				$.ajax({
				  dataType: "json",
				  cache: false,
				  url: this.opts.imageManagerJson,
				  success: $.proxy(function(data)
					{
						$.each(data, $.proxy(function(key, val)
						{
							// title
							var thumbtitle = '';
							if (typeof val.title !== 'undefined') thumbtitle = val.title;

							var img = $('<img src="' + val.thumb + '" rel="' + val.image + '" title="' + thumbtitle + '" style="width: 120px; height: 90px; margin:5px; cursor: pointer;" />');
							$('#redactor-image-manager-box').append(img);
							$(img).click($.proxy(this.imagemanager.insert, this));

						}, this));


					}, this)
				});


			},
			insert: function(e)
			{
				// adi baron - force image initial width into 500px
				console.log('INSERTED');
				// var lstr = '<img src="' + $(e.target).attr('rel') + '" alt="' + $(e.target).attr('title') + '">';
				var lstr = '<img src="' + $(e.target).attr('rel') + '" alt="' + $(e.target).attr('title') + '" style="width:500px;" ' + '>';
				this.image.insert(lstr);
			}
		};
	};
})(jQuery);