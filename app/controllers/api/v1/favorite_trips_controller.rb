class Api::V1::FavoriteTripsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!, only: [:create]

  def create
    begin
      trip = Trip.new(trip_params)
      binding.pry
      # place = Place.new(trip_params.points[0])
      # trip.user = current_user
      # trip.place = place
      
    rescue => exception
      
    end
  end

  private

  def trip_params
    params.require(:trip).permit(:trip_id)
  end

  def points_params
    params.require(:trip).permit(points: [
      :id,
      :name,
      :image_url,
      :url,
      :review_count,
      :rating,
      :price,
      location: [display_address: []],
      categories: [:title]
    ])
  end
end
