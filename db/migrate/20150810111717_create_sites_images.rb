class CreateSitesImages < ActiveRecord::Migration

  def self.up
    create_table :images_sites, :id => false do |t|
      t.integer :site_id, null: false
      t.integer :image_id, null: false
    end

    add_index :images_sites, [:site_id, :image_id], :unique => true
    add_index :images_sites, [:image_id, :site_id], :unique => true
  
    self.migrate_into_joined_table
  end

  def self.down
    drop_table :images_sites
  end

  def self.migrate_into_joined_table
    Site.all.each do |s|
      images = Image.where{ site_id == my{s.id} }
      s.images << images
    end
  end

end


