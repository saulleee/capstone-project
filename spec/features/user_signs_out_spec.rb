require "rails_helper"

# feature "User signs out" do
# RSpec.describe "User signs outs", type: :feature do
# RSpec.feature "User signs outs", type: :feature do
# describe "User signs out" do
  let!(:test_user) { FactoryBot.create(:user) }

  scenario "and is able to sign out" do
  # it "and is able to sign out" do
    login_as(test_user)
    visit '/'  
    click_link "Sign Out"

    expect(page).to have_content("Sign In")
  end
end