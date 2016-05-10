class FixUserFollowsColumns < ActiveRecord::Migration
  def change
    rename_column :user_follows, :followed, :followed_id
    rename_column :user_follows, :follower, :follower_id
  
  end
end
