class AddCreatorToMissions < ActiveRecord::Migration[5.2]
  def change
    add_reference :missions, :creator, references: :users, index: true

    # Just like the belongs_to contained class_name: :User, the foreign key
    # also needs a specific custom column name as :creator_id
    add_foreign_key :creators, :users, column: :creator_id
  end
end
