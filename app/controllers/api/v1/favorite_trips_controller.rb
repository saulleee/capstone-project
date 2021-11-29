class Api::V1::FavoriteTripsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!, only: [:create]

  def create
    trip = Trip.new(trip_params)
    binding.pry
  end

  private

  def trip_params
    params.require(:trip).permit(:id, points_attributes: [
      :id, 
      :alias, 
      :name, 
      :image_url, 
      :is_closed, 
      :url, 
      :review_count,
      :rating, 
      :price, 
      :phone, 
      :display_phone, 
      :distance
    ])
  end
end

# params.require(:trip).permit(      :categories => [:alias, :title], )
# :location => [], 
# coordinates: [], 
# transactions: [], 

# <ActionController::Parameters {
#   "trip"=>{
#     "id"=>"ad84147f196d6157719e408b1e59a625", 
#     "points"=>[{
#       "id"=>"367aDatN4B0UNT4hNPMqPQ", 
#       "alias"=>"the-beehive-boston", 
#       "name"=>"The Beehive", 
#       "image_url"=>"https://s3-media2.fl.yelpcdn.com/bphoto/fgvt02KslCL5FyWyidIPpA/o.jpg", 
#       "is_closed"=>false, 
#       "url"=>"https://www.yelp.com/biz/the-beehive-boston?adjust_creative=qtp4jRwaKawnCkZ_Nq8FfQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qtp4jRwaKawnCkZ_Nq8FfQ", 
#       "review_count"=>2245, 
#       "categories"=>[{"alias"=>"tradamerican", "title"=>"American (Traditional)"}, {"alias"=>"breakfast_brunch", "title"=>"Breakfast & Brunch"}, {"alias"=>"bars", "title"=>"Bars"}], 
#       "rating"=>3.5, 
#       "coordinates"=>{"latitude"=>42.344493, "longitude"=>-71.071497}, 
#       "transactions"=>["delivery", "pickup"], 
#       "price"=>"$$", 
#       "location"=>{"address1"=>"541 Tremont St", "address2"=>"", "address3"=>"", "city"=>"Boston", "zip_code"=>"02116", "country"=>"US", "state"=>"MA", "display_address"=>["541 Tremont St", "Boston, MA 02116"]}, 
#       "phone"=>"+16174230069", 
#       "display_phone"=>"(617) 423-0069", 
#       "distance"=>372.9407627004676}
#     ]},
# 
#   "controller"=>"api/v1/favorite_trips", 
#   "action"=>"create", 
#   "trip_id"=>"ad84147f196d6157719e408b1e59a625", 
#   "favorite_trip"=>{} # compare this line to the note/code below
# } permitted: false>



# this happens when i set the body as `JSON.stringify(trip.trip)` (where the trip ID is explicitly a key)

# <ActionController::Parameters #
# {"id"=>"e05cc8fad250d377482c2f0c0d3d53e6", 
# "points"=>[{"id"=>"367aDatN4B0UNT4hNPMqPQ", "alias"=>"the-beehive-boston", "name"=>"The Beehive", "image_url"=>"https://s3-media2.fl.yelpcdn.com/bphoto/fgvt02KslCL5FyWyidIPpA/o.jpg", "is_closed"=>false, "url"=>"https://www.yelp.com/biz/the-beehive-boston?adjust_creative=qtp4jRwaKawnCkZ_Nq8FfQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qtp4jRwaKawnCkZ_Nq8FfQ", "review_count"=>2245, "categories"=>[{"alias"=>"tradamerican", "title"=>"American (Traditional)"}, {"alias"=>"breakfast_brunch", "title"=>"Breakfast & Brunch"}, {"alias"=>"bars", "title"=>"Bars"}], "rating"=>3.5, "coordinates"=>{"latitude"=>42.344493, "longitude"=>-71.071497}, "transactions"=>["delivery", "pickup"], "price"=>"$$", "location"=>{"address1"=>"541 Tremont St", "address2"=>"", "address3"=>"", "city"=>"Boston", "zip_code"=>"02116", "country"=>"US", "state"=>"MA", "display_address"=>["541 Tremont St", "Boston, MA 02116"]}, "phone"=>"+16174230069", "display_phone"=>"(617) 423-0069", "distance"=>372.9407627004676}], 
# 
# "controller"=>"api/v1/favorite_trips", 
# "action"=>"create", 
# "trip_id"=>"e05cc8fad250d377482c2f0c0d3d53e6", 
# "favorite_trip"=>{"id"=>"e05cc8fad250d377482c2f0c0d3d53e6"}} 
# permitted: false>