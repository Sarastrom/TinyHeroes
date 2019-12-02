class Mission < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :creator, class_name: :User, foreign_key: :creator_id

  MISSION_ICON = ["open-book", "laundryright", "wash", "dog", "tech", "sport", "vacuum", "cleaning"]

  def mark_completed
    self.completed = true
    self.save
  end

  def mark_verified
    self.verify = true
    self.save
  end
end
