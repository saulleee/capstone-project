class YelpSearch
  API_KEY = ENV["YELP_KEY"]
  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"
  LIMIT = 3

  attr_reader :trips

  def initialize(trips)
    @trips = trips
  end

  def self.retrieve_results(location)
    yelp_response = yelp_request("cafe", location)
    parsed_response = parse_request(yelp_response)
    YelpSearch.new(parsed_response)
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
end