require 'handlebars'

class SitesController < ApplicationController

  before_filter :allow_iframe_requests, only: [:show]

  helper_method :current_site

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
  	puts '*'*50
  	puts 'new'
  	puts '*'*50
  end

  # /sites/:id display a specific site
  def show
  	# byebug
  	respond_to do |format|
  	  
  	  @site = Site.last.data
      
      format.js do
  	  	render :json => @site 
  	  end
    	  
    	# format.html 	{ render :nothing => true, :status => 200 }
    	format.html do 
    	   	
    	  @edit = false
  
        handlebars = Handlebars::Context.new    

        handlebars.register_helper(:get_css) do |context, selectors|
          str = ''
          # byebug
          @el_css[:css][selectors].nil_or.each do |val| 
            str += val[0] + ':' + val[1] + ';'
          end
          puts str + ' for ' + selectors
          str
        end

        handlebars.register_helper(:get_class) do |context, selectors|
          # byebug
          puts "get_class"
          'yellow'
        end

        handlebars.register_helper(:to_text) do |context, html|
          html.gsub(/<\/?[^>]*>/, '').gsub(/\n\n+/, "\n").gsub(/^\n|\n$/, '')
        end

        rebase_css( @site["menu"]["css"] )
        
        if (@site["menu"]["type"] == "Top Menu")
    		  side_menu_template = File.read(Rails.public_path.to_s + '/handlebars_templates/top-menu.html')  	  	
        else
          side_menu_template = File.read(Rails.public_path.to_s + '/handlebars_templates/side-menu.html')       
        end  

    		template = handlebars.compile(side_menu_template)
    		@menu = template.call(:edit => @edit, :data => @site["menu"]).html_safe

        #byebug
        index = params[:route] ? 
                  @site["pages"].keys.map(&:strip).map(&:downcase).find_index( params[:route].nil_or.downcase.nil_or.strip ) : 0

    		(render :file => 'public/404.html', :status => :not_found, :layout => false and return) unless index

        @page_name = params[:route] ? @site["pages"].keys[index] : @site["menu"]["pages"][index][0]["name"]
    		
        # @page = params[:route] ? @site["pages"][ @site["pages"].keys[index] ] : 
        #                            @site["pages"][@site["menu"]["pages"][index][0]["name"]]
        @page = @site["pages"][@page_name]

    		@elements = []
    		@page["widgets"].each do |el_name|
          # byebug
          el = @site["widgets"][el_name]
  		  
          rebase_css( el["css"] )
          # byebug  
          
          case el['widget_name']
    		  when 'general-txt'
    			  side_menu_template = File.read(Rails.public_path.to_s + '/handlebars_templates/froala-txt.html')
            template = handlebars.compile(side_menu_template)
            @elements << (template.call(:data => el["data"]).html_safe)
    		  when 'multi-elements'
            slick_gallery_template = File.read(Rails.public_path.to_s + '/handlebars_templates/multi-elements.html')       
            
            # *** PARTIAL ***
            # TODO - read the handlebars github to load only once (with missing partials??? else ??? maybe during rails initialization ???)
            handlebars.register_partial('single-element', File.read(Rails.public_path.to_s + '/handlebars_templates/partials/single-element.html') )

            template = handlebars.compile(slick_gallery_template)

            @elements << (template.call(:data => el).html_safe)            
          when 'slick-gallery'
    		  	slick_gallery_template = File.read(Rails.public_path.to_s + '/handlebars_templates/slick-gallery.html')  	  	
    		  	template = handlebars.compile(slick_gallery_template)
    		  	@elements << (template.call(:data => el["data"]).html_safe)
    		  when 'flow-gallery'
    		  	image_flow_gallery_template = File.read(Rails.public_path.to_s + '/handlebars_templates/image-flow-gallery.html')  	  	
    		  	template = handlebars.compile(image_flow_gallery_template)
    		  	@elements << (template.call(:data => el["data"]).html_safe)	
          when 'full-width-gallery'
            image_flow_gallery_template = File.read(Rails.public_path.to_s + '/handlebars_templates/full-width-gallery.html')       
            template = handlebars.compile(image_flow_gallery_template)
            @elements << (template.call(:data => el).html_safe)           
          when 'masonary-gallery'
            masonry_gallery_template = File.read(Rails.public_path.to_s + '/handlebars_templates/masonry-gallery.html')       
            template = handlebars.compile(masonry_gallery_template)
            @elements << (template.call(:data => el["data"]).html_safe) 
    		  when 'square-gallery'
            square_gallery_template = File.read(Rails.public_path.to_s + '/handlebars_templates/square-gallery.html')       
            template = handlebars.compile(square_gallery_template)
            @elements << (template.call(:data => el["data"]).html_safe) 
          when 'contact'
            contact_template = File.read(Rails.public_path.to_s + '/handlebars_templates/contact.html')       
            template = handlebars.compile(contact_template)
            # byebug
            # @elements << (template.call(:data => el["data"], :css => el["css"]).html_safe)     
            @elements << (template.call( :data => el ).html_safe)     
            # byebug    
          end
    		end

        if ( next_prev = next_prev_page(@page_name) )
          np_template = File.read(Rails.public_path.to_s + '/handlebars_templates/next_prev.html')       
          template = handlebars.compile(np_template)
          @elements << (template.call( { :next => next_prev["next"], :prev => next_prev["prev"] } ).html_safe) 
        end

  		  #render :text => @menu, :status => 200
  		  # byebug
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
      if ( (value['cb'] == 'set_css_class') && (value['val'] == true) )
        value['el'].each do |el|
          @el_css[:classes][el[0]] ? @el_css[:classes][el[0]] << el[1] : @el_css[:classes][el[0]] = [el[1]]
        end    
      end
      if (value['cb'] == 'set_css')
        value['el'].each do |el|
          # byebug
          puts 'found css rule ' + el[1] + ' for ' + el[0]
          @el_css[:css][el[0].strip.sub('.', '')] ? @el_css[:css][el[0].strip.sub('.', '')] << [ el[1], (value['val'] + value['units']) ] : @el_css[:css][el[0].strip.sub('.', '')] = [ [ el[1], (value['val'] + value['units']) ] ]
          puts "#{@el_css[:css][el[0].strip.sub('.', '')]}"
        end
      end      
    end
  end

  # POST	/sites	sites#create	create a new site
  def create
  	Site.create! if Site.first.nil?
   	s = Site.last
    s.data = params["data"]
   	s.save
   	render :nothing => true, :status => 200
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
  	puts '*'*50
  	puts 'edit'
  	puts '*'*50

    @edit = true
    render layout: "sites_edit" 
  end

  # PATCH/PUT	/sites/:id	sites#update	update a specific site
  def update
  	puts '*'*50
  	puts 'edit'
  	puts '*'*50
  end

  # DELETE	/sites/:id	sites#destroy	delete a specific site  
  def destroy
  	puts '*'*50
  	puts 'destroy'
  	puts '*'*50
  end

end