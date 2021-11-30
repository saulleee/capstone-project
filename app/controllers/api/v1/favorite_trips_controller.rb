class Api::V1::FavoriteTripsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!, only: [:create]

  def create
    trip = Trip.new(trip_params)
    points_params[:points].each do |point|
      if Place.where(yelp_id: point[:yelp_id])
        trip.places << Place.where(yelp_id: point[:yelp_id])
      else
        trip.places << Place.create(point)
      end
    end

    # begin
    #   # place = Place.new(trip_params.points[0])
    #   # trip.user = current_user
    #   # trip.place = place
      
    # rescue => exception
      
    # end
  end

  private

  def trip_params
    params.require(:trip).permit(:trip_id)
  end

  def points_params
    params.require(:trip).permit(points: [
      :yelp_id,
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
