class AddProfilePictureToHorses < ActiveRecord::Migration
  def change
    add_column :horses, :profile_picture, :string
  end
end
