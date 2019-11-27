class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :missions
  has_many :created_missions, class_name: :Mission, foreign_key: :creator_id
  belongs_to :parent, class_name: "User", foreign_key: :parent_id, optional: true

  def kids
    User.where(parent: self)
  end

  AVATAR_NAMES = ["giraffe", "lion", "monkey", "snake", "tiger"]
end
