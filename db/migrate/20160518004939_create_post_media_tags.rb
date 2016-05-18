class CreatePostMediaTags < ActiveRecord::Migration
  def change
    create_table :post_media_tags do |t|
      t.integer :post_id
      t.string :media_file

      t.timestamps null: false
    end
  end
end
