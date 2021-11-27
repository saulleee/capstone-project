require "securerandom"

class YelpSearch
  API_KEY = ENV["YELP_KEY"]
  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"

  DEFAULT_LIMIT = 1
  DEFAULT_SORT_BY = "review_count"

  RESPONSE_LIMIT = 5
  
  SUB_RESPONSE_LIMIT = 5
  SUB_RESPONSE_RADIUS = 1000
  SUB_RESPONSE_SORT_BY = "review_count"

  attr_reader :trips

  def initialize(trips)
    @trips = trips
  end

  def self.retrieve_results(paramsTerms, paramsLocation)
    terms = terms(paramsTerms)
    places_array = []

    # the first set of search results
    response = yelp_request(terms[0], paramsLocation, limit: RESPONSE_LIMIT)
    parsed_response = parse_request(response)
    places_array << parsed_response
    
    if terms.length > 1
      sub_terms = terms.drop(1)
      sub_terms.each do |term|
        temp = []
        parsed_response.each_with_index do |place, index|
          # location is set just to the FIRST POINT'S location
          location = place["location"]["display_address"].join(" ")
          sub_response = yelp_request(term, location, limit: SUB_RESPONSE_LIMIT, radius: SUB_RESPONSE_RADIUS, sort_by: SUB_RESPONSE_SORT_BY)
          
          array_of_trips = zip(places_array)
          array_of_places = parse_request(sub_response)
                    
          # returns each trip with unique points compared to its SPECIFIC trip
          array_of_places.each do |place|
            id_exists_bool = array_of_trips[index].any? { |point| point["id"] == place["id"] }
            
            if id_exists_bool == false
              temp << place
              break
            end
          end
        end
        
        places_array << temp
      end
    end

    trips = zip(places_array)
    trips_with_ids = trip_id_generator(trips)
    YelpSearch.new(trips_with_ids)
  end
  
  def self.yelp_request(term, location, limit: DEFAULT_LIMIT, radius: nil, sort_by: DEFAULT_SORT_BY)    
    url = "#{API_HOST}#{SEARCH_PATH}"
    params = {
      term: term,
      location: location,
      limit: limit,
      radius: radius,
      sort_by: sort_by
    }
    response = HTTP.auth("Bearer #{API_KEY}").get(url, params: params)
  end
  
  def self.parse_request(response)
    parsed_response = JSON.parse(response.body)
    return parsed_response["businesses"]
  end
  
  def self.zip(places_array)
    trips = []
    
    if places_array.length > 1
      sub_arrays = places_array.drop(1)
      trips = places_array[0].zip(*sub_arrays)
    else
      places_array[0].each do |place|
        trips << [place]
      end
    end
    
    trips
  end
  
  def self.trip_id_generator(trips)
    trips_with_ids = []
    
    trips.each do |i|
      trips_with_ids << { id: SecureRandom.hex, trip: i }
    end
    
    trips_with_ids
  end

  def self.terms(bools)
    preset_list = [ 
      "breakfast",
      "brunch",
      "lunch",
      "cafe",
      "attractions",
      "dinner",
      "dessert",
      "bar",
      "nightlife"
    ]
    terms = []

    if !bools.any?(true)
      terms = [
        "cafe",
        "attractions",
        "dinner",
        "dessert",
        "bar",
      ]
    else 
      bools.each_with_index do |bool, index|
        if bool === true
          terms << preset_list[index]
        end
      end
    end

    terms
  end
end











############################### ADD THIS CODE UNDER LINE 30 ###############################

# if terms.length > 1
#   sub_terms = terms.drop(1)
#   sub_terms.each do |term|
#     temp = []
#     parsed_response.each_with_index do |place, index|
#       # location is set just to the FIRST POINT'S location
#       location = place["location"]["display_address"].join(" ")
#       sub_response = yelp_request(term, location, limit: SUB_RESPONSE_LIMIT, radius: SUB_RESPONSE_RADIUS, sort_by: SUB_RESPONSE_SORT_BY)
      
#       array_of_trips = zip(places_array)
#       array_of_places = parse_request(sub_response)
                
#       # returns each trip with unique points compared to its SPECIFIC trip
#       array_of_places.each do |place|
#         id_exists_bool = array_of_trips[index].any? { |point| point["id"] == place["id"] }
        
#         if id_exists_bool == false
#           temp << place
#           break
#         end
#       end
#     end
    
#     places_array << temp
#   end
# end
    
# different version with different logic
# if terms.length > 1
#   sub_terms = terms.drop(1)
#   sub_terms.each_with_index do |term, index|
#     temp = []
#     places_array[index].each do |place|
#       # location is set to the PREVIOUS POINT'S location
#       location = place["location"]["display_address"].join(" ")
      
#       sub_response = yelp_request(term, location, limit: SUB_RESPONSE_LIMIT, radius: SUB_RESPONSE_RADIUS, sort_by: SUB_RESPONSE_SORT_BY)

#       array_of_places = parse_request(sub_response)
      
#       # returns each trip with unique points compared to ALL trips
#       # bug though, when search_limit gets to ~5
#       array_of_places.each do |place|
#         id_exists_counter = 0
#         places_array.each do |b|
#           id_exists_bool = b.any? { |c| c["id"] == a["id"] }
#           if id_exists_bool == true
#             id_exists_counter += 1
#           end
#         end
#         if id_exists_counter == 0
#           temp << place
#           break
#         end
#       end
#     end
    
#     places_array << temp
#   end
# end

# v2 of above
# if terms.length > 1
#   sub_terms = terms.drop(1)
#   sub_terms.each do |term|
#     temp = []
#     places_array.last.each do |place|
#       # location is set to the PREVIOUS POINT'S location
#       location = place["location"]["display_address"].join(" ")
      
#       sub_response = yelp_request(term, location, limit: SUB_RESPONSE_LIMIT, radius: SUB_RESPONSE_RADIUS, sort_by: SUB_RESPONSE_SORT_BY)

#       array_of_places = parse_request(sub_response)

#       # returns each trip with unique points compared to ALL trips
#       array_of_places.each do |a|
#         places_array.each do |b|
#           id_exists_bool = b.any? { |c| c["id"] == a["id"] }
#           if id_exists_bool == false 
#             temp << a
#           end
#         end
#       end
#     end
    
#     places_array << temp
#   end
# end