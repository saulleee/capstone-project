feature "rails_helper"

feature "User visits user show page" do
  let!(:test_user) { FactoryBot.create(:user) }

  scenario "and is able to visit their show page" do
    visit user_path(test_user)
    
    expect(page).to have_css("img[src*='default_photo.jpeg']")
    expect(page).to have_content(test_user.email)
    expect(page).to have_content(test_user.username)
    expect(page).to have_content("Edit Account Information")
    # expect(page).to have_content("Your Favorites")
  end

  scenario "and is able to edit their favorite trips"
end