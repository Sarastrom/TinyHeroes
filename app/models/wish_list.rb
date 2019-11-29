class WishList < ApplicationRecord
  belongs_to :user
  scope :starts_with, ->(name) { where("name like ?", "#{name}%") }
  has_one_attached :image
  has_many :likes, dependent: :destroy

  def children_who_liked
    list = likes.map do |like|
      like.user.first_name
    end
    if list.empty?
      return "No likes yet 😢"
    else
      return "Like by #{list.uniq.to_sentence}"
    end
  end
end
