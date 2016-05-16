class AddPolymorphicToUserFollows < ActiveRecord::Migration
  def change
  	add_column :user_follows, :following_type, :string, default: "User"
  	add_index :user_follows, :following_id
  end
end
