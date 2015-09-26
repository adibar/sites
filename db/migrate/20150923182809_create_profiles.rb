class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|

    	t.string	:first_name
    	t.string  :family_name

    	t.integer :language, :default => Profile::LANGUAGE.en
    	t.integer :user_id

      t.timestamps

      t.index :user_id
    end
  end
end
