class Post < ActiveRecord::Base
	has_many :users, through: :post_tags
	has_many :post_tags

end
