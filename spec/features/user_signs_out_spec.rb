require "rails_helper"

feature "User signs out" do
  let!(:test_user) { FactoryBot.create(:user) }

  scenario "and is able to sign out" do
    login_as(test_user)
    visit '/'  
    click_link "Sign Out"

    expect(page).to have_content("Signed out successfully.")
  end
end