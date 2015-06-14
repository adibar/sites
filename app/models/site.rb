# == Schema Information
#
# Table name: sites
#
#  id         :integer          not null, primary key
#  created_at :datetime
#  updated_at :datetime
#  data       :jsonb
#

class Site < ActiveRecord::Base

  has_many :images

  def self.seperate_widgets_from_pages(site_id)
  	d = Site.find(site_id).dup
  	
  	d.data["widgets"] = {} # create site widgets

  	d.data["pages"].each do |key, page| #each page
  	  lpage = {} #page is no longer an array

  	  lpage["css"] = {}	
  	  # d.data["pages"][key]["css"] = {} #create page scope css
  	  lpage["widgets"] = []
  	  #d.data["pages"][key]["widgets"] = [] #list of all widgets

  	  page.each do |widget| #all widgets in page
  	  	begin	
   		  widget["name"] = rand(36**5).to_s(36)
		end while d.data["widgets"][widget["name"]] #find non existing name unique
  	  	d.data["widgets"][widget["name"]] = widget #add to widgets hash
  	  	lpage["widgets"] << widget["name"] #add name to list of page widgets	
  	  end
  	  d.data["pages"][key] = lpage
    end
  	
  	d.save
  end

end
