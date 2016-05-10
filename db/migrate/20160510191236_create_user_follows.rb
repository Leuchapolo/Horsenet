class CreateUserFollows < ActiveRecord::Migration
  def change
    create_table :user_follows do |t|
      t.integer :follower
      t.integer :followed

      t.timestamps null: false
    end
  end
end
