class UserFollow < ActiveRecord::Base
	belongs_to :follower, class_name: "User"
	belongs_to :following, polymorphic: :true
end
