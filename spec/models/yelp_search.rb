require "rails_helper"
require "pry"

RSpec.describe YelpSearch, type: :model do
  context "without a location" do
    it "returns an error message" do
      test_results = YelpSearch.retrieve_results(["term"], "")
      expect(test_results.error).to include("Please enter in a location 📍")
    end
  end

  context "without terms" do
    it "returns an error message" do
      test_results = YelpSearch.retrieve_results([], "Boston")
      expect(test_results.error).to include("Please enter in points of interest ✅")
    end
  end
end