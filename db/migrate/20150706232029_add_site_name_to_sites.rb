class AddSiteNameToSites < ActiveRecord::Migration
  def change

    add_column :sites, :name, :string

    add_index :sites, :name, :unique => true
  end
end
