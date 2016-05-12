class PostTag < ActiveRecord::Base
	belongs_to :post
	belongs_to :taggable, polymorphic: true
	has_many :user_follows, foreign_key: "following_id", primary_key: "taggable_id"
	
end
