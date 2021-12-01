require "securerandom"
require "set"

class YelpSearch
  API_KEY = ENV["YELP_KEY"]
  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"

  DEFAULT_LIMIT = 1
  DEFAULT_SORT_BY = ["rating"]
  # DEFAULT_SORT_BY = ["review_count", "best_match", "rating"]

  INITIAL_RESPONSE_LIMIT = 2
  
  SUB_RESPONSE_LIMIT = 2
  SUB_RESPONSE_RADIUS = 1000
  SUB_RESPONSE_SORT_BY = ["rating"]
  # SUB_RESPONSE_SORT_BY = ["review_count", "distance", "best_match", "rating"]

  attr_reader :trips

  def initialize(trips, error)
    @trips = trips
    @error = error
  end

  def self.retrieve_results(paramsTerms, paramsLocation)
    terms = terms(paramsTerms)

    # first set of results
    initial_response = yelp_request([terms[0]], paramsLocation, limit: INITIAL_RESPONSE_LIMIT)
    initial_parsed_response = parse_request(initial_response)

    # if yelp throws an error or if there just aren't a first set of results
    if initial_parsed_response.nil?
      updated_trips_with_ids = nil
      error = "Not enough points of interest to create a trip 😔"
    end

    # set MRH with first set's results
    main_results_hash = {}
    create_hash_from_results(terms, initial_parsed_response, main_results_hash)

    ############################################################

    if terms.length > 1
      create_hash_from_results(terms, main_results_hash)
      a = retrieve_sub_results(terms, main_results_hash)

    end

    ############################################################
    
    trips = create_trips_from_results(main_results_hash)

    # if somehow all the trips got wiped out
    if trips.nil?
      updated_trips_with_ids = nil
      error = "Not enough points of interest to create a trip 😔"
    end

    # final preparations of the trips to send to front end
    updated_trips_with_keys = update_keys(trips)
    updated_trips_with_ids = trip_id_generator(updated_trips_with_keys)
    
    YelpSearch.new(updated_trips_with_ids, error)
  end


  # BOOKMARK ###################################################
  def self.retrieve_sub_results(terms, main_results_hash)
    subterms = terms.drop(1)
    mrh = main_results_hash
    
    zipped_mrh = zip_to_make_trips(mrh)

    subterms.each do |term|
      mrh.values.first.each do |place|
        location = place["location"]["display_address"].join(" ")
        subreponse = yelp_request(term, location, limit: SUB_RESPONSE_LIMIT, radius: SUB_RESPONSE_RADIUS, sort_by: SUB_RESPONSE_SORT_BY.sample)
        ??? = parse_request(subreponse)
        
        id_values = Set.new
        
        zipped_mrh[index???].each do |key, value|
          id_values << zipped_mrh[index???]["id"]
        end







        response = yelp_request(term, location, limit: SUB_RESPONSE_LIMIT, radius: SUB_RESPONSE_RADIUS, sort_by: SUB_RESPONSE_SORT_BY.sample)
        all_search_results << parse_request(response)









    end
    
  end

  def self.zip_to_make_trips(main_results_hash)
    array_of_values = main_results_hash.values
    array_of_values.first, *array_of_values.last = array_of_values
    zipped_values = array_of_values.first.zip(*array_of_values.last)
    return zipped_values
  end
  
  def self.create_trips_from_results(results)
    terms = results.keys
    trips_array = []
    
    results.each do |term, places|  
      places.each do |place|
        temp_array = []
        if place
          temp_array << place
        end
        trips_array << temp_array
      end
    end
    
    return trips_array
  end

  def self.create_hash_from_results(terms, parsed_response, main_results_hash)
    terms.each do |term|
      main_results_hash[term] = parsed_response
    end
  end

  def self.trip_id_generator(trips)
    trips_with_ids = []
    
    trips.each do |i|
      trips_with_ids << { trip: { trip_id: SecureRandom.hex, points: i } }
    end
    
    return trips_with_ids
  end

  def self.yelp_request(term, location, limit: DEFAULT_LIMIT, radius: nil, sort_by: DEFAULT_SORT_BY.sample)    
    url = "#{API_HOST}#{SEARCH_PATH}"
    params = {
      term: term,
      location: location,
      limit: limit,
      radius: radius,
      sort_by: sort_by
    }
    response = HTTP.auth("Bearer #{API_KEY}").get(url, params: params)
    return response
  end
  
  def self.parse_request(response)
    parsed_response = JSON.parse(response.body)
    begin
      return parsed_response["businesses"]
    rescue
      return nil
    end
  end

  def self.update_keys(trips)
    updated_trips = trips.map do |trip|
      trip.each do |place|
        rename_key(place, "id", "yelp_id")
        delete_key(place, "alias", "is_closed", "coordinates", "transactions", "phone", "display_phone", "distance")
        place
      end
    end
    
    return updated_trips
  end

  def self.rename_key(obj, old_key, new_key)
    obj[new_key] = obj[old_key]
    obj.delete(old_key)
  end

  def self.delete_key(obj, *old_key)
    old_key.each do |key|
      obj.delete(key)
    end
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
        "attractions"
      ]
    else 
      bools.each_with_index do |bool, index|
        if bool === true
          terms << preset_list[index]
        end
      end
    end

    return terms
  end
end