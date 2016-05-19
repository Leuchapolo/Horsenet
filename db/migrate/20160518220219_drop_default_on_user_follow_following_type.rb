class DropDefaultOnUserFollowFollowingType < ActiveRecord::Migration
  def change
  	change_column_default(:user_follows, :following_type, nil)
  end
end
