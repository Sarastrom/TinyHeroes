class Mission < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :creator, class_name: :User, foreign_key: :creator_id

  MISSION_ICON = ["open-book.png", "laundryright.png", "wash.png", "dog.png", "tech.png", "sport.png", "vacuum.png", "cleaning.png"]

  def mark_completed
    self.completed = true
    self.save
  end

  def mark_verified
    self.verify = true
    self.save
  end
end
