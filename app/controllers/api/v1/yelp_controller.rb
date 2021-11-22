class Api::V1::YelpController < ApplicationController
  API_KEY = ENV["YELP_KEY"]
  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"

  def search
    term = "food"
    location = params[:location]
    limit = 5

    url = "#{API_HOST}#{SEARCH_PATH}"
    
    params = {
      term: term,
      location: location,
      limit: limit
    }
  
    response = HTTP.auth("Bearer #{API_KEY}").get(url, params: params)
    render json: JSON.parse(response.body)
  end
end