class AddBaseTemplateIndicatorToSites < ActiveRecord::Migration
  def change
    add_column :sites, :site_type, :integer, :default => Site::SITE_TYPE.regular

    add_index :sites, :site_type
  end
end
