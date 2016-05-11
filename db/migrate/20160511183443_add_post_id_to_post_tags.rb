class AddPostIdToPostTags < ActiveRecord::Migration
  def change
  	change_table :post_tags do |t|

  		t.integer :post_id
  	end
  end
end
