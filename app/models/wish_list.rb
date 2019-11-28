class WishList < ApplicationRecord
  belongs_to :user
  scope :starts_with, ->(name) { where("name like ?", "#{name}%") }
  has_one_attached :photo
  has_many :likes
end
