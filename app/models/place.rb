class Place < ApplicationRecord
  validates :categories, :yelp_id, :image_url, :location, :name, :price, :rating, :review_count, :url, presence: true

  has_many :points
  has_many :trips, through: :points
end