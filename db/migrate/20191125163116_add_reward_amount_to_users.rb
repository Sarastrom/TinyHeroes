class AddRewardAmountToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :reward_amount, :string
  end
end
