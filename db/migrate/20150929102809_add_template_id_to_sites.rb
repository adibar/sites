class AddTemplateIdToSites < ActiveRecord::Migration
  def change
    add_column :sites, :template_id, :integer
  end
end
