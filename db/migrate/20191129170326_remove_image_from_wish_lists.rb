class RemoveImageFromWishLists < ActiveRecord::Migration[5.2]
  def change
    remove_column :wish_lists, :image, :string
  end
end
