class CreateMissions < ActiveRecord::Migration[5.2]
  def change
    create_table :missions do |t|
      t.references :user, foreign_key: true
      t.boolean :completed
      t.string :name
      t.text :description
      t.integer :reward
      t.string :icon

      t.timestamps
    end
  end
end
