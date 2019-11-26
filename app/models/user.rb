class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :missions
  has_many :created_missions, class_name: :Mission, foreign_key: :creator_id

  AVATAR_NAMES = ["giraffe", "lion", "monkey", "snake", "tiger"]
end
