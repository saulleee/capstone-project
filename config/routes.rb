Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:show]

  root "homes#index"

  get '/', to: "homes#index"
  get "/trips/:id", to: "homes#index"
  get "/about", to: "about#index"

  namespace :api do
    namespace :v1 do
      post "yelp/search", to: "yelp#search"
    end
  end
end
