class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :text
      t.integer :original_poster

      t.timestamps null: false
    end
  end
end
