require "securerandom"
require "set"

class YelpSearch
  API_KEY = ENV["YELP_KEY"]
  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"

  DEFAULT_LIMIT = 1
  DEFAULT_SORT_BY = ["rating"]
  # DEFAULT_SORT_BY = ["review_count", "best_match", "rating"]

  INITIAL_RESPONSE_LIMIT = 4
  
  SUB_RESPONSE_LIMIT = 3
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

    if paramsLocation.strip.empty?
      return YelpSearch.new(nil, "Please enter in a location 📍")
    end

    if paramsTerms.all? { |i| !i }
      return YelpSearch.new(nil, "Please enter in desired points of interest")
    end

    # first set of results
    initial_response = yelp_request(terms[0], paramsLocation, limit: INITIAL_RESPONSE_LIMIT)
    initial_parsed_response = parse_request(initial_response)

    # if yelp throws an error or if there just aren't a first set of results
    if initial_parsed_response.nil?
      return YelpSearch.new(nil, "Not enough points of interest to create a trip 😔")
    end

    # set MRH with first set's results
    main_results_hash = {}
    main_results_hash[terms[0]] = initial_parsed_response

    if terms.length > 1
      mrh_copy = retrieve_sub_results(terms, main_results_hash)
      main_results_hash.update(mrh_copy)
    end
    
    trips = create_trips(main_results_hash)

    # if somehow all the trips got wiped out
    if trips.empty?
      return YelpSearch.new(nil, "Not enough points of interest to create a trip 😔")
    end

    # final preparations of the trips to send to front end
    updated_trips_with_keys = update_keys(trips)
    main_trips = trip_id_generator(updated_trips_with_keys)
    
    return YelpSearch.new(main_trips, nil)
  end

  def self.create_trips(main_results_hash)
    mrh = main_results_hash
    number_of_places = mrh.values[0].length

    trips = []
    i = 0

    while i < number_of_places
      temp = []

      mrh.each do |term, results|             
        if results[i] == nil
          temp = []
          break
        end

        temp << results[i]
      end

      i += 1
      
      if !temp.empty?
        trips << temp
      end
    end

    return trips
  end

  def self.retrieve_sub_results(terms, main_results_hash)
    subterms = terms.drop(1)
    unique_results_array = []
    inital_results = main_results_hash.values[0]
    mrh_copy = main_results_hash

    subterms.each do |subterm|
      unique_results_array = []

      inital_results.each_with_index do |place, i|
        initial_location = place["location"]["display_address"].join(" ")        
        
        # results for the current term based on the location of the first place of current index
        subresponse = yelp_request(subterm, initial_location, limit: SUB_RESPONSE_LIMIT, radius: SUB_RESPONSE_RADIUS, sort_by: SUB_RESPONSE_SORT_BY.sample)
        subresults = parse_request(subresponse)        
        
        # create IDs in a set of each place of current index of each result
        id_values = set_ids(main_results_hash, i) 
        
        # add each unique place (or an empty place if none found) to main_results_hash at main_results_hash[term]
        # by comparing subresults and id_values
        unique_result_hash = unique_place(subterm, subresults, id_values)
        unique_results_array << unique_result_hash    
      end        
      
      mrh_copy[subterm] = []
      unique_results_array.each do |unique_result_hash|        
        mrh_copy[subterm] << unique_result_hash[subterm]
      end
    end        

    return mrh_copy
  end

  def self.unique_place(subterm, subresults, id_values)
    temp_results_hash = {}    

    subresults.each do |place|
      if !id_values.include?(place["id"])
        temp_results_hash[subterm] = place        
        break
      end
      temp_results_hash[subterm] =  nil
    end
    
    return temp_results_hash    
  end

  def self.set_ids(main_results_hash, index)    
    id_values = Set.new    
    
    main_results_hash.each do |term, results|
      if results[index] != nil
        id_values << results[index]["id"]
      end
    end

    return id_values
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
    
    if parsed_response["businesses"]
      return parsed_response["businesses"]
    else
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

    bools.each_with_index do |bool, index|
      if bool === true
        terms << preset_list[index]
      end
    end

    return terms
  end
end