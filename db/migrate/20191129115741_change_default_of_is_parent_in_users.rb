class ChangeDefaultOfIsParentInUsers < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :is_parent, :boolean, default: true
  end
end
