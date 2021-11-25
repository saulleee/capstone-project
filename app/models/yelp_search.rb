require "securerandom"

class YelpSearch
  API_KEY = ENV["YELP_KEY"]
  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"
  LIMIT = 3

  attr_reader :trips

  def initialize(trips)
    @trips = trips
  end

  def self.retrieve_results(*terms, location)
    places_array = []

    # the first set of search results
    response = yelp_request(terms[0], location)
    parsed_response = parse_request(response)
    places_array << parsed_response
    
    if terms.length > 1
      # the following set of search results, based off of the first set's coordinates
      sub_terms = terms.drop(1)
      sub_terms.each_with_index do |term, index|
        location = parsed_response[index]["location"]["display_address"].join(" ")
        radius = 500
        sort_by = "distance"

        sub_response = yelp_request(term, location, radius)
        sub_parsed_response = parse_request(sub_response)
        places_array << sub_parsed_response
      end
    end
    
    trips = zip(places_array)
    YelpSearch.new(trips)
  end
  
  def self.yelp_request(term, location, radius = nil, sort_by = "review_count")    
    url = "#{API_HOST}#{SEARCH_PATH}"
    params = {
      term: term,
      location: location,
      radius: radius,
      sort_by: sort_by,
      limit: LIMIT
    }
    response = HTTP.auth("Bearer #{API_KEY}").get(url, params: params)
  end

  def self.parse_request(response)
    parsed_response = JSON.parse(response.body)
    return parsed_response["businesses"]
  end

  def self.zip(places_array)
    trips = []
    temp = []

    if places_array.length > 1
      sub_arrays = places_array.drop(1)
      temp = places_array[0].zip(*sub_arrays)
      trip_id_generator(trips, temp)
    else
      places_array[0].each do |place|
        temp << [place]
        trip_id_generator(trips, temp)
      end
    end

    trips
    binding.pry
  end

  def self.trip_id_generator(trips, temp)
    temp.each do |i|
      trips << { id: SecureRandom.hex, trip: i}
    end
  end
end
