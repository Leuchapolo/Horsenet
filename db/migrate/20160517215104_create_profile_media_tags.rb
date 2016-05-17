class CreateProfileMediaTags < ActiveRecord::Migration
  def change
    create_table :profile_media_tags do |t|

      t.timestamps null: false
    end
  end
end
