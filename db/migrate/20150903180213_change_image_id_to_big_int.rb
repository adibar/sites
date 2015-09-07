class ChangeImageIdToBigInt < ActiveRecord::Migration

  def up
    change_column :images, :id, :integer, :limit => 8
  end

  def down
    change_column :image, :id, :integer
  end

end
