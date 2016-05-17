class AddMediaFileToProfileMediaTags < ActiveRecord::Migration
  def change
    add_column :profile_media_tags, :media_file, :string
    change_table :profile_media_tags do |t|
    	t.references :mediable, polymorphic: true, index: true, name: 'tagged_profile'
    end
  end
end
