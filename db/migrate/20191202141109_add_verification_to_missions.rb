class AddVerificationToMissions < ActiveRecord::Migration[5.2]
  def change
    add_column :missions, :verify, :boolean
  end
end
