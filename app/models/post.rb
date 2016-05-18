class Post < ActiveRecord::Base
	has_many :users, through: :post_tags
	has_many :post_tags
	belongs_to :original_poster, class_name: "User", foreign_key: :original_poster
	has_many :post_media_tags
end
