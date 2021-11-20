require "rails_helper"

feature "User signs up" do
  let!(:test_user) { FactoryBot.create(:user) }

  scenario "and is able to go to the sign up page" do
    visit '/'
    click_link "Sign In"
    click_link "Sign up"

    expect(page).to have_content("Sign Up")
  end

  scenario "and is able to sign up" do
    visit new_user_registration_path
    fill_in "Username", with: "test_user"
    fill_in "Email", with: "email@email.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"

    click_button "Sign Up"

    expect(page).to have_content("Welcome! You have signed up successfully.")
  end
  
  scenario "and is unable to sign with incomplete form fields" do
    visit new_user_registration_path
    click_button "Sign Up"

    expect(page).to have_content("Username can't be blank")
    expect(page).to have_content("Email can't be blank")
    expect(page).to have_content("Password can't be blank")
  end

  scenario "and is unable to sign up with a pre-existing email and username" do
    visit new_user_registration_path
    fill_in "Email", with: test_user.email
    fill_in "Username", with: test_user.username
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"

    click_button "Sign Up"

    expect(page).to have_content("Email has already been taken")
    expect(page).to have_content("Username has already been taken")
  end
end