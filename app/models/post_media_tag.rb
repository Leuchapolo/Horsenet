class PostMediaTag < ActiveRecord::Base
	mount_uploader :media_file, MediaFileUploader
	belongs_to :post
end
