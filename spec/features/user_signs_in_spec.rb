require "rails_helper"

feature "Sign In" do
  let!(:test_user) { FactoryBot.create(:user) }

  scenario "User signs in" do
    visit '/'
    click_on "Sign In"
    fill_in "Email", with: test_user.email
    fill_in "Password", with: test_user.password
    click_button "Sign In"
  
    expect(page).to have_content("Signed in successfully.")
  end

  scenario "User is unable to sign in with incorrect info" do
    visit '/'
    click_link "Sign In"
    click_button "Sign In"

    expect(page).to have_content("Invalid Email or password.")
  end
end