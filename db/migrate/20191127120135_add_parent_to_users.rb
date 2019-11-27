class AddParentToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :parent_id, :integer
  end
end
