class Api::V1::FavoriteTripsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!, only: [:create]

  def create
    if Trip.find_by(trip_id: trip_params[:trip_id])
      current_user.trips.find_by(trip_id: trip_params[:trip_id]).delete
      render json: { message: "Successfully unfavorited" }
    else
      trip = Trip.new(trip_params)
      
      points_params[:points].each do |point|
        if Place.find_by(yelp_id: point[:yelp_id])
          trip.places << Place.find_by(yelp_id: point[:yelp_id])
        else
          temp = Place.new(point)
          if temp.save
            trip.places << temp
          end
        end
      end
      
      if trip.save
        current_user.trips << trip
        render json: { message: "Sucessfully favorited" }
      else
        render json: { message: "Something went wrong" }
      end
    end
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
