require "rails_helper"

feature "Sign Out" do
  let!(:test_user) { FactoryBot.create(:user) }

  scenario "User signs out" do
    login_as(test_user)
    visit '/'  
    click_link "Sign Out"

    expect(page).to have_content("Signed out successfully.")
  end
end