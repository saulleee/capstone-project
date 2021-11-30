class Trip < ApplicationRecord
  validates :trip_id, presence: true, uniqueness: true

  has_many :favorite_trips
  has_many :users, through: :favorite_trips

  has_many :points
  has_many :places, through: :points
end