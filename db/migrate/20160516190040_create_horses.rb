class CreateHorses < ActiveRecord::Migration
  def change
    create_table :horses do |t|
      t.string :name
      t.integer :user_id
      t.integer :birth_year
      t.string :specialty

      t.timestamps null: false
    end
  end
end
