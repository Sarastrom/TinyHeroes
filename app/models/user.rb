class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :missions, dependent: :destroy
  has_many :created_missions, class_name: :Mission, foreign_key: :creator_id
  has_many :likes, dependent: :destroy
  belongs_to :parent, class_name: "User", foreign_key: :parent_id, optional: true
  has_many :children, class_name: "User", foreign_key: :parent_id

  def kids
    User.where(parent: self)
  end

  def receive_reward(amount)
    self.reward_amount += amount
    self.save
  end

  AVATAR_NAMES = ["giraffe", "lion", "monkey", "snake", "tiger"]
end
