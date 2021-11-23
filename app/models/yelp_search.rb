class YelpSearch
  API_KEY = ENV["YELP_KEY"]
  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"
  LIMIT = 5

  def self.retrieve_results(location)
    cafe_response = yelp_request("cafe", location)
    parsed_cafe_response = parse_request(cafe_response)
    
    bar_response = yelp_request("bar", location)
    parsed_bar_response = parse_request(bar_response)

    trips = trips_array(parsed_cafe_response, parsed_bar_response)
  end

  def self.yelp_request(term, location)    
    url = "#{API_HOST}#{SEARCH_PATH}"
    params = {
      term: term,
      location: location,
      limit: LIMIT
    }
    response = HTTP.auth("Bearer #{API_KEY}").get(url, params: params)
  end

  def self.parse_request(response)
    businesses = JSON.parse(response.body)
    return businesses["businesses"]
  end

  def self.trips_array(parsed_response_a, parsed_response_b)
    trips_array = parsed_response_a.map do |place|
      i = parsed_response_a.find_index(place)
      subarr = []
      subarr << place["name"]
      subarr << parsed_response_b[i]["name"]
    end

    trips_array
  end
end