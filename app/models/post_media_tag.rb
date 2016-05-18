class PostMediaTag < ActiveRecord::Base
	mount_uploader :profile_picture, MediaFileUploader
	belongs_to :post
end
