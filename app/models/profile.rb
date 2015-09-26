# == Schema Information
#
# Table name: profiles
#
#  id          :integer          not null, primary key
#  first_name  :string
#  family_name :string
#  language    :integer          default(0)
#  user_id     :integer
#  created_at  :datetime
#  updated_at  :datetime
#
# Indexes
#
#  index_profiles_on_user_id  (user_id)
#

class Profile < ActiveRecord::Base

	belongs_to :user

	LANGUAGE = Enum.new(:LANGUAGE, Profile, :en => 0, :he => 1)
  enum_column :language, LANGUAGE, scoped: true

  def full_name
  	self.first_name + ' ' + self.family_name
  end

end
