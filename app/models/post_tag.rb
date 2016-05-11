class PostTag < ActiveRecord::Base
	belongs_to :post
	belongs_to :taggable, polymorphic: true
end
