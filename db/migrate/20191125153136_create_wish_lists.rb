class CreateWishLists < ActiveRecord::Migration[5.2]
  def change
    create_table :wish_lists do |t|
      t.references :user, foreign_key: true
      t.string :image
      t.string :title
      t.integer :amount

      t.timestamps
    end
  end
end
