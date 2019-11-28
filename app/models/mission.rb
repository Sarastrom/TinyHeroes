class Mission < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :creator, class_name: :User, foreign_key: :creator_id

  MISSION_ICON = ["book", "washing", "dishes", "dogWalk",]
end
