class Api::V1::YelpController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def search
    response = YelpSearch.retrieve_results(params[:location])
    render json: response.trips
  end
end