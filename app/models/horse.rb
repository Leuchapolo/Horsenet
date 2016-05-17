class Horse < ActiveRecord::Base
	belongs_to :user
	has_many :post_tags, as: :taggable
  	has_many :posts, through: :post_tags

  	mount_uploader :profile_picture, MediaFileUploader

  	has_many :user_followers, class_name: "UserFollow", foreign_key: "following_id"
  	has_many :followers, class_name: "User" , through: :user_followers

end
