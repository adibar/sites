# require 'v8'
# require 'handlebars'

class SitesController < ApplicationController
  # before_action :authenticate_user!
  before_action :loged_in?, :only => [:new, :create]
  before_action :can_edit?, :except => [:new, :create]

  before_filter :allow_iframe_requests, only: [:show]

  helper_method :current_site

  # menus
  @@top_menu_file_str = File.read(Rails.public_path.to_s + '/handlebars_templates/top-menu.html')
  @@side_menu_file_str = File.read(Rails.public_path.to_s + '/handlebars_templates/side-menu.html')
  @@top_menu_remplate = Tilt['handlebars'].new { @@top_menu_file_str }
  @@side_menu_remplate = Tilt['handlebars'].new { @@side_menu_file_str }

  # contact
  @@contact_file_str = File.read(Rails.public_path.to_s + '/handlebars_templates/contact.html')
  @@contact_template = Tilt['handlebars'].new { @@contact_file_str }

  # rich text
  @@txt_element_file_str = File.read(Rails.public_path.to_s + '/handlebars_templates/froala-txt.html')
  @@txt_element_template = Tilt['handlebars'].new { @@txt_element_file_str }

  # multi elements
  @@single_element_file_str = File.read(Rails.public_path.to_s + '/handlebars_templates/partials/single-element.html')
  # @@single_element_file_str = File.read(Rails.public_path.to_s + '/handlebars_templates/partials/xxx.html')
  # FS.register_partial(:single_element, @@single_element_file_str)
  @@multi_elements_file_str = File.read(Rails.public_path.to_s + '/handlebars_templates/multi-elements.html')
  @@multi_elements_template = Tilt['handlebars'].new { @@multi_elements_file_str }

  # galleries
  # Full width gallery
  @@full_width_file_str = File.read(Rails.public_path.to_s + '/handlebars_templates/full-width-gallery.html')
  @@full_width_template = Tilt['handlebars'].new { @@full_width_file_str }
  # masonary-gallery
  @@masonry_gallery_file_str = File.read(Rails.public_path.to_s + '/handlebars_templates/masonry-gallery.html')
  @@masonry_gallery_template = Tilt['handlebars'].new { @@masonry_gallery_file_str }
  # square-galler
  @@square_gallery_file_str = File.read(Rails.public_path.to_s + '/handlebars_templates/square-gallery.html')
  @@square_gallery_template = Tilt['handlebars'].new { @@square_gallery_file_str }
  # slick gallery
  @@slick_gallery_file_str = File.read(Rails.public_path.to_s + '/handlebars_templates/slick-gallery.html')
  @@slick_gallery_template = Tilt['handlebars'].new { @@slick_gallery_file_str }
  # flow gallery
  @@flow_gallery_file_str = File.read(Rails.public_path.to_s + '/handlebars_templates/image-flow-gallery.html')
  @@flow_gallery_template = Tilt['handlebars'].new { @@flow_gallery_file_str }


  def loged_in?
    redirect_to root_path, notice: 'Your have to log in' unless current_user
  end

  def can_edit?
    can_edit = current_user && (Site.find_by_id(params[:id]).nil_or.user == current_user )

    if !can_edit
      # if (request.format == Mime::HTML)
      #   redirect_to root_path, notice: 'Your have to log in'
      # else
      #   render :json => {:redirect_url => root_path }, :status => 401
      # end
      if (request.format != Mime::HTML)
        render :json => {:redirect_url => root_path }, :status => 401
      end
    end
  end

  def current_site
    params[:id]
  end

  def allow_iframe_requests
    response.headers.delete('X-Frame-Options')
    # response.headers["X-Frame-Options"] = "ALLOW-FROM http://some-origin.com"
  end

  # /sites/new
  # return an HTML form for creating a new site
  def new
    @sites = Site.template
    render layout: "application"
  end

  def urlFromImageObj(img, size)
    # @site[:images][ img["image-id"] ].nil_or[size.to_sym]
    urlFromImageId(img["image-id"], size)
  end

  def urlFromImageId(img_id, size)
    @site[:images][img_id].nil_or[size.to_sym]
  end

  def get_css(selectors)
    str = ''

    @el_css[:css][selectors].nil_or.each do |val|
      str += val[0] + ':' + val[1] + ';'
    end
    # puts str + ' for ' + selectors
    str
  end

  def get_class(selectors)
    str = ''

    @el_css[:classes][selectors].nil_or.each do |val|
      str += val + ' '
    end
    # puts str + ' for ' + selectors
    str
  end

  def manipulate_images_from_html(html_str)
    # For each match of img tag
    html_str.gsub(/<img[^>]*>/) do |f|

      # 1) find image id
      img_id = ( ( ( /data-img-id=\"[^\"]*\"/.match(f).to_s ).split("=")[1] ).gsub("\"", "") )
      # 2) find image from id
      img_url = urlFromImageId(img_id, :image)

      # 3) find current src from html txt
      img_src = ( ( /src=\"[^\"]*\"/.match(f).to_s ).split("=")[1] ).gsub("\"", "")

      # 4) replace img src from txt with on from db
      html_str.gsub!(img_src, img_url.to_s) # img_url.to_s => to avoid craching for nil
    end
    html_str
  end

  # /sites/:id display a specific site
  def show

  	respond_to do |format|

      # @site = params[:id] ? Site.find(params[:id]).data : Site.find_by_name(request.domain()).data
      @site = params[:id] ? Site.find(params[:id]) :  ( Site.find_by_name(request.domain()) || Site.find_by_name(request.subdomain()) )

      format.js do
        render :json => @site
  	  end

    	format.html do

    	  @edit = false

        # handlebars = Handlebars::Context.new

        # handlebars.register_helper(:get_css) do |context, selectors|
        #   str = ''

        #   @el_css[:css][selectors].nil_or.each do |val|
        #     str += val[0] + ':' + val[1] + ';'
        #   end
        #   puts str + ' for ' + selectors
        #   str
        # end

        # handlebars.register_helper(:get_class) do |context, selectors|
        #   str = ''

        #   @el_css[:classes][selectors].nil_or.each do |val|
        #     str += val + ' '
        #   end
        #   puts str + ' for ' + selectors
        #   str
        # end

        # handlebars.register_helper(:to_text) do |context, html|
        #   html.gsub(/<\/?[^>]*>/, '').gsub(/\n\n+/, "\n").gsub(/^\n|\n$/, '')
        # end

        # handlebars.register_helper(:urlFromImageObj) do |context, img, size|
        #   @site[:images][ img["image-id"] ].nil_or[size.to_sym]
        # end


        @site = @site.as_json

        # rebase_css( @site["menu"]["css"] )
        rebase_css( @site[:site]["data"]["menu"]["css"] )

        if (@site[:site]["data"]["menu"]["type"] == "Top Menu")
    		  # template_str = File.read(Rails.public_path.to_s + '/handlebars_templates/top-menu.html')
          # template_str = File.read(Rails.public_path.to_s + '/handlebars_templates/xxx.html')
          template = @@top_menu_remplate
        else
          # template_str = File.read(Rails.public_path.to_s + '/handlebars_templates/side-menu.html')
          template = @@side_menu_remplate
        end

        FS.register_helper(:index_of) do |arr, index_str|
          arr[index_str.to_i]
          # yield.contents arr[index]
          # people.each do |person|
          #   yield.contents person
          # end
        end
        # byebug
        FS.register_helper( method(:urlFromImageObj) )
        FS.register_helper( method(:get_css) )
        FS.register_helper( method(:get_class) )
        # FS.register_helper(:urlFromImageObj) do |img, size|
        #   byebug
        #   @site[:images][ img["image-id"] ].nil_or[size.to_sym]
        # end

        # byebug
    		# template = handlebars.compile(side_menu_template)
    		# template = Tilt['handlebars'].new { template_str }
        # @menu = template.call(:edit => @edit, :data => @site[:site]["data"]["menu"]).html_safe


        # x = { :pages => [1,2,34] }
        # data = OpenStruct.new edit: @edit, data: @site[:site]["data"]["menu"]
        data = RecursiveOpenStruct.new( { edit: @edit, data: @site[:site]["data"]["menu"] }, :recurse_over_arrays => true )
        # data = OpenStruct.new edit: @edit, data: x
        # byebug
        # data = OpenStruct.new edit: @edit, data: [1,2,3]
        @menu = (template.render data).html_safe

        index = params[:route] ?
                  @site[:site]["data"]["pages"].keys.map(&:strip).map(&:downcase).find_index( params[:route].nil_or.downcase.nil_or.strip ) : 0

    		(render :file => 'public/404.html', :status => :not_found, :layout => false and return) unless index

        @page_name = params[:route] ? @site[:site]["data"]["pages"].keys[index] : @site[:site]["data"]["menu"]["pages"][index][0]["name"]

        # @page = params[:route] ? @site["pages"][ @site["pages"].keys[index] ] :
        #                            @site["pages"][@site["menu"]["pages"][index][0]["name"]]
        @page = @site[:site]["data"]["pages"][@page_name]

        @elements = []

        # Add Room search
        # @rooms = render_to_string "rooms/_search", :layout => false
        # @elements << @rooms


        @page["widgets"].each do |el_name|
        # if (false)

          el = @site[:site]["data"]["widgets"][el_name]

          rebase_css( el["css"] )

          case el['widget_name']
    		  when 'general-txt'
    			  # side_menu_template = File.read(Rails.public_path.to_s + '/handlebars_templates/froala-txt.html')
            # template = handlebars.compile(side_menu_template)
            # @elements << (template.call(:data => el["data"]).html_safe)
            data = RecursiveOpenStruct.new( { data: el["data"], }, :recurse_over_arrays => true )
            template = @@txt_element_template
            html_data = (template.render data).html_safe
            @elements << manipulate_images_from_html(html_data).html_safe
    		  when 'multi-elements'
            # slick_gallery_template = File.read(Rails.public_path.to_s + '/handlebars_templates/multi-elements.html')

            # # *** PARTIAL ***
            # # TODO - read the handlebars github to load only once (with missing partials??? else ??? maybe during rails initialization ???)
            # handlebars.register_partial('single-element', File.read(Rails.public_path.to_s + '/handlebars_templates/partials/single-element.html') )

            # template = handlebars.compile(slick_gallery_template)

            # @elements << (template.call(:data => el).html_safe)

            # TODO register partials
            data = RecursiveOpenStruct.new( { data: el, }, :recurse_over_arrays => true )
            template = @@multi_elements_template
            FlavourSaver.register_partial(:single_element, @@single_element_file_str)

            res = template.render data
            @elements << (res.html_safe)
          when 'slick-gallery'
    		  	# slick_gallery_template = File.read(Rails.public_path.to_s + '/handlebars_templates/slick-gallery.html')
    		  	# template = handlebars.compile(slick_gallery_template)
    		  	# @elements << (template.call(:data => el["data"]).html_safe)
            data = RecursiveOpenStruct.new( { data: el["data"], }, :recurse_over_arrays => true )
            template = @@slick_gallery_template
            @elements << (template.render data).html_safe
    		  when 'flow-gallery'
    		  	# image_flow_gallery_template = File.read(Rails.public_path.to_s + '/handlebars_templates/image-flow-gallery.html')
    		  	# template = handlebars.compile(image_flow_gallery_template)
    		  	# @elements << (template.call(:data => el["data"]).html_safe)
            data = RecursiveOpenStruct.new( { data: el["data"], }, :recurse_over_arrays => true )
            template = @@flow_gallery_template
            @elements << (template.render data).html_safe
          when 'full-width-gallery'
            # image_flow_gallery_template = File.read(Rails.public_path.to_s + '/handlebars_templates/full-width-gallery.html')
            # template = handlebars.compile(image_flow_gallery_template)
            # @elements << (template.call(:data => el).html_safe)
            data = RecursiveOpenStruct.new( { data: el, }, :recurse_over_arrays => true )
            template = @@full_width_template
            @elements << (template.render data).html_safe
          when 'masonary-gallery'
            # masonry_gallery_template = File.read(Rails.public_path.to_s + '/handlebars_templates/masonry-gallery.html')
            # template = handlebars.compile(masonry_gallery_template)
            # @elements << (template.call(:data => el["data"]).html_safe)
            data = RecursiveOpenStruct.new( { data: el["data"], }, :recurse_over_arrays => true )
            template = @@masonry_gallery_template
            @elements << (template.render data).html_safe
    		  when 'square-gallery'
            # square_gallery_template = File.read(Rails.public_path.to_s + '/handlebars_templates/square-gallery.html')
            # template = handlebars.compile(square_gallery_template)
            # @elements << (template.call(:data => el["data"]).html_safe)
            data = RecursiveOpenStruct.new( { data: el["data"], }, :recurse_over_arrays => true )
            template = @@square_gallery_template
            @elements << (template.render data).html_safe
          when 'contact'
            # contact_template = File.read(Rails.public_path.to_s + '/handlebars_templates/contact.html')
            data = RecursiveOpenStruct.new( { data: el, }, :recurse_over_arrays => true )
            template = @@contact_template
            # byebug
            # @elements << (template.call(:data => el["data"], :css => el["css"]).html_safe)
            # @elements << (template.call( :data => el ).html_safe)
            @elements << (template.render data).html_safe
            # byebug
          end
    		end

        # if ( next_prev = next_prev_page(@page_name) )
        if (false)
          np_template = File.read(Rails.public_path.to_s + '/handlebars_templates/next_prev.html')
          template = handlebars.compile(np_template)
          @elements << (template.call( { :next => next_prev["next"], :prev => next_prev["prev"] } ).html_safe)
        end

  		  render layout: "sites"
    	end
  	end
  end

  def next_prev_page(pName)
    next_index = prev_index= nil;
    page = @site["pages"][pName];

    if page["belongs_to"]
      widget = @site["widgets"][page["belongs_to"]]
      length = widget["data"]["elements"].length;
      if length > 1
        (0...length).each do |i|
          if widget["data"]["elements"][i]["name"] == pName
            next_index = (i+1)%length
            prev_index = (i == 0) ? (length-1) : (i-1)
          end
        end
      end
    end

    (next_index && prev_index) ? { "prev" => widget["data"]["elements"][prev_index], "next" => widget["data"]["elements"][next_index] } : nil
  end

# function next_prev_page(pName) {
#   var next_index = null;
#   var prev_index = null;

#   var page = jsonObj.pages[pName];
#   if (page.belongs_to) {
#     var widget = jsonObj.widgets[page.belongs_to];
#     var length = widget.data.elements.length;

#     if (length > 1) {
#       // find current page in  elements
#       for (var i=0; i<length; i++) {
#         if ( widget.data.elements[i].name == pName ) {
#           next_index = (i+1)%length
#           prev_index = (i == 0) ? (length-1) : (i-1)
#         }
#       }
#     }
#   }
#   if ( (next_index != null) && (prev_index != null) ) {
#     return { "prev" : widget.data.elements[prev_index], "next": widget.data.elements[next_index] }
#   } else {
#     return { }
#   }
# }

  # 'side-menu': { 'type':'select', 'loadstyle':0, 'val':0, 'cb': "set_menu_type", 'options':['Top Menu', 'Side Menu'] },

  # 'brand-center': { 'type':'checkbox', 'val':false, 'cb': "set_css_class", 'el':[ ['.navbar-header', 'navbar-header-center'], ['.navbar-brand-style', 'navbar-brand-style-center'],
  #     ['.navbar-nav', 'navbar-nav-center'], ['.navbar-collapse', 'navbar-collapse-center'], ], },

  # 'brand-width': { 'type':'slider', 'val':40, 'range':[100,500], 'units':'px', "cb":"set_css", 'el':[ ['.menu-brand-img', 'width'] ], },

  # 'menu-margin-top': { 'type':'slider', 'val':300, 'range':[0,200], 'units':'px', "cb":"set_css", 'el':[ ['.sidebar-ul', 'margin-top'] ], },

  # 'byebugorder-width': { 'type':'slider', 'val':0, 'range':[0,20], 'units':'px', "cb":"set_css", 'el':[ ['header', 'border-bottom-width'] ], },

  # 'border-style': { 'type':'select', 'val':0, 'units':'', "cb":"set_css", 'el':[ ['header', 'border-bottom-style'] ],
  #     'options':['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge' ,'inset', 'outset'], },

  # 'border-color': { 'type':'color-picker', 'val':'#000000', 'units':'', "cb":"set_css", 'el':[ ['header', 'border-bottom-color'] ], },

  # 'background-color': { 'type':'color-picker', 'val':'#000000', 'units':'', "cb":"set_css", 'el':[ ['.wrapper-addons', 'background-color'] ], },

  # 'font-size': { 'type':'slider', 'range':[8,36], 'val':'10', 'units':'px', "cb":"set_css", 'el':[ ['.sidebar-ul', 'font-size'] ], },
  def rebase_css(raw)
    @el_css = { :css => {}, :classes => {} }
    # byebug
    raw["root"].each do |key, value|
      # if ( (value['cb'] == 'set_css_class') && (value['val'] == true) )
      if ( value['cb'] == 'set_css_class' )

        negative = value['negative'].nil? ? false : value['negative']
        val = value['val']

        value['el'].each do |el|
          if ( (val==true && negative==false) || (val==false && negative==true) )
            @el_css[:classes][el[0]] ? @el_css[:classes][el[0]] << el[1] : @el_css[:classes][el[0]] = [el[1]]
          end
        end
      end
      if (value['cb'] == 'set_css')
        value['el'].each do |el|
          # byebug
          # puts 'found css rule ' + el[1] + ' for ' + el[0]
          @el_css[:css][el[0].strip.sub('.', '')] ? @el_css[:css][el[0].strip.sub('.', '')] << [ el[1], (value['val'].to_s + value['units']) ] : @el_css[:css][el[0].strip.sub('.', '')] = [ [ el[1], (value['val'].to_s + value['units']) ] ]
          # puts "#{@el_css[:css][el[0].strip.sub('.', '')]}"
        end
      end
    end
  end

  # POST	/sites	sites#create	create a new site
  def create
    template_id = params[:template_id]
    template_site = Site.find(template_id.to_i)
    new_site = template_site.deep_clone include: [ :images, ], except: [ :name, :site_type, :title ]
    new_site.save

    if request.xhr?
      render :json => {:redirect => edit_site_path(new_site.id) }, :status => 200
    else
      redirect_to :action => "edit", :id => new_site.id
    end
  end

  # /sites
  # display a list of all sites
  def index
  	puts '*'*50
  	puts 'index'
  	puts '*'*50
  end

  # GET	/sites/:id/edit	sites#edit	return an HTML form for editing a site
  def edit
    @edit = true
    render layout: "sites_edit"
  end

  # PATCH/PUT	/sites/:id	sites#update	update a specific site
  def update
    s = Site.find( params[:id] )
    s.data = params["data"]
    s.save
    render :nothing => true, :status => 200
  end

  # DELETE	/sites/:id	sites#destroy	delete a specific site
  def destroy
  	puts '*'*50
  	puts 'destroy'
  	puts '*'*50
  end

end

# class RecursiveOpenStruct
#   def render(param)
#     byebug
#   end
# end


