# == Schema Information
#
# Table name: sites
#
#  id          :integer          not null, primary key
#  created_at  :datetime
#  updated_at  :datetime
#  data        :jsonb
#  name        :string
#  site_type   :integer          default(2)
#  title       :string
#  user_id     :integer
#  template_id :integer
#
# Indexes
#
#  index_sites_on_name       (name) UNIQUE
#  index_sites_on_site_type  (site_type)
#  index_sites_on_user_id    (user_id)
#

class Site < ActiveRecord::Base


  # enum :SITE_TYPE, :base_template => 0, :template => 1, :regular => 2
  SITE_TYPE = Enum.new(:SITE_TYPE, Site, :base_template => 0, :template => 1, :regular => 2)
  enum_column :site_type, SITE_TYPE, scoped: true

  # has_many :images
  has_and_belongs_to_many :images, -> { uniq }
  belongs_to :user

  # attr_accessor (:template_id)

  # before_create :build_site

  def initialize(args = nil)

    super

    template_id = args[:template_id]
    if template_id

      template_site = Site.find(template_id.to_i)

      obj = template_site.deep_clone include: [ :images, ], except: [ :name, :site_type, :title ]

      self.images = obj.images
      self.data = obj.data

    else
      super
    end
  end

  # def build_site
  #   puts "site build_site with #{template_id}"
  #   puts "site build_site with #{template_id}"
  #   puts "site build_site with #{template_id}"
  #   puts "site build_site with #{template_id}"
  #   puts "site build_site with #{template_id}"

  #   # template_site = Site.find(template_id.to_i)
  #   # self = template_site.deep_clone include: [ :images, ], except: [ :name, :site_type, :title ]
  #   # byebug
  # end

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

  def self.create_new_template
    template_site = Site.find( self.base_template.first.id )
    new_site = template_site.deep_clone include: [ :images, ], except: :name
    new_site.site_type = SITE_TYPE::template
    new_site.save
    return new_site.id
  end

  def as_json(options={})
    site_json = {
      :site   => super,
      :images => hashed_images
    }

    site_json
  end

  def hashed_images
    Hash[ images.as_json.map{ |i| [ i[:id], i.except(:id) ] } ]
  end

  def self.seeds_data
    data = { :sites => {} }
    sites = Site.where{ (site_type == Site::SITE_TYPE.base_template) | (site_type == Site::SITE_TYPE.template) }
    sites.each do |s|
      d = s.seed_data
      data[:sites][d.keys.first] = d.values.first
    end
    data
  end

  def seed_data
    site_data = self.data ? self.data : {}
    data = { name => {
        :site => {
          :title  => self.title,
          :data   => JSON.generate( site_data ),
          :type   => self.site_type,
        },
        # :images => images.map(&:id)
        :images => images.map{ |i| { :id => i.id, :name => i.name ? i.name : File.basename(i.get_path(:big)[:absolute]) } }
      }
    }
    data
  end

  def self.seed_create_sites_yml
    load "#{Rails.root}/db/seeds_helper.rb"
    super # calls function as in seeds.rb
  end

end
