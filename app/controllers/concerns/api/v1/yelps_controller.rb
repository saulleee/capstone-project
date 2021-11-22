class Api::V1::YelpsController < ApplicationController
  API_KEY = ENV["YELP_KEY"]
  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"

  def search
    term = "food"
    location = params[:location]

    url = "#{API_HOST}#{SEARCH_PATH}"
    
    params = {
      term: term,
      location: location,
      limit: 4
    }
  
    response = HTTP.auth("Bearer #{API_KEY}").get(url, params: params)
    render json: JSON.parse(response.body)
  end
end