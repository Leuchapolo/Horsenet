class AddTaggableToPostTags < ActiveRecord::Migration
  def change
  	change_table :post_tags do |t|

  		t.references :taggable, polymorphic: true, index: true
  	end
  end
end
