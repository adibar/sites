# == Schema Information
#
# Table name: images
#
#  id            :integer          not null, primary key
#  title         :string
#  text          :string
#  path_big      :string
#  path_medium   :string
#  path_small    :string
#  width_big     :integer
#  width_medium  :integer
#  width_small   :integer
#  height_big    :integer
#  height_medium :integer
#  height_small  :integer
#  site_id       :integer
#  created_at    :datetime
#  updated_at    :datetime
#
# Indexes
#
#  index_images_on_site_id  (site_id)
#

class Image < ActiveRecord::Base
  
  belongs_to :site

  def self.image_url(path)
  	File.join( '/uploads', path) 
  end

  def as_json options={}
  	{
  		:id 	=> id,
  		:thumb 	=> self.class.image_url(path_small),
  		:image  => self.class.image_url(path_big),
  		:txt    => text ? text : '',
  		:title  => title ? title : '',
  	}
  end
end
