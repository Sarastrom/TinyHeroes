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
  
  AVATAR_NAMES = ["003-dinosaur.png", "034-chimera.png", "035-elf.png", "narwhal.png", "wizard.png", "valkyrie.png", "unicorn.png", "robot.png", "pirate.png", "pegasus.png", "hydra.png", "043-frankenstein.png", "ghost.png", "008-mushroom.png", "028-mermaid.png"]
end
