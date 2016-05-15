class AddUserInfoToUsers < ActiveRecord::Migration
  def change
  	change_table :users do |t|

  		t.string :place_of_birth
  		t.string :current_residence
  		t.string :work
  		t.string :current_show
  		t.string :next_class
  		t.string :division

  	end

  end
end
