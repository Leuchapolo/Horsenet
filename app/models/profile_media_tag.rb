class ProfileMediaTag < ActiveRecord::Base
	mount_uploader :media_file, MediaFileUploader
	belongs_to :mediable, polymorphic: true
end
