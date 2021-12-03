class Place < ApplicationRecord
  validates :yelp_id, presence: true
  validates :yelp_id, uniqueness: true

  has_many :points
  has_many :trips, through: :points
end