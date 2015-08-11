class CreateSitesImages < ActiveRecord::Migration
  # def change
  #   create_join_table :sites, :images, column_options: {null: false} do |t|
  #     t.index [:site_id, :image_id]
  #     t.index [:image_id, :site_id]
  #   end
  # end

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

# class CreateJoinTablePersonCommunity < ActiveRecord::Migration
#   def change
#     create_join_table :people, :communities, column_options: {null: true} do |t|
#       # t.index [:person_id, :community_id]
#       # t.index [:community_id, :person_id]
#     end
#   end
# end

