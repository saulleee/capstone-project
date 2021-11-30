class Trip < ApplicationRecord
  validates :trip_id, presence: true, uniqueness: true

  has_many :favorites
  has_many :users, through: :favorites

  has_many :points
  has_many :places, through: :points
end