class AddTypeToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :is_parent, :boolean, null: false, default: false
  end
end
