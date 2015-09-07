class ChangeImageSitesImageIdToBigInt < ActiveRecord::Migration

  def up
    change_column :images_sites, :image_id, :integer, :limit => 8
  end

  def down
    change_column :images_sites, :image_id, :integer
  end
  
end
