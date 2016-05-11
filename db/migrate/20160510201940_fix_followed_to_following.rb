class FixFollowedToFollowing < ActiveRecord::Migration
  def change
  	rename_column :user_follows, :followed_id, :following_id
  end
end
