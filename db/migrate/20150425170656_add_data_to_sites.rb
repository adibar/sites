class AddDataToSites < ActiveRecord::Migration
  def change
  	add_column :sites, :data, :jsonb
  end
end
