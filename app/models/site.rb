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
end
