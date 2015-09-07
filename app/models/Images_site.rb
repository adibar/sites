# == Schema Information
#
# Table name: images_sites
#
#  site_id  :integer          not null
#  image_id :integer          not null
#
# Indexes
#
#  index_images_sites_on_image_id_and_site_id  (image_id,site_id) UNIQUE
#  index_images_sites_on_site_id_and_image_id  (site_id,image_id) UNIQUE
#

class ImagesSite < ActiveRecord::Base

end
