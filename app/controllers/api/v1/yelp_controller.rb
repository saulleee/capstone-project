class Api::V1::YelpController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def search
    response = YelpSearch.retrieve_results(params[:location])
    render json: response
  end
end



# trying to check the following returns in tests?

# JSON.parse(response.body)["businesses"].size
# 5

# response.status
# 200

# Processing by Api::V1::YelpController#search as JSON
#   Parameters: {"location"=>"boston", "yelp"=>{"location"=>"boston"}}
# :::::::::::::::::::::::::::::::::::::::::
# {"location"=>"boston", "controller"=>"api/v1/yelp", "action"=>"search", "yelp"=>{"location"=>"boston"}}
# :::::::::::::::::::::::::::::::::::::::::