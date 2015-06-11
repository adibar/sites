class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      
      t.string :title
      t.string :text

      t.string :path_big
      t.string :path_medium
      t.string :path_small

      t.integer :width_big
      t.integer :width_medium
      t.integer :width_small

      t.integer :height_big
      t.integer :height_medium
      t.integer :height_small

      t.integer :site_id

      t.timestamps

      t.index :site_id

    end
  end
end
