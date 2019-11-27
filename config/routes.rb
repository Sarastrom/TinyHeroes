Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :missions, only: [:new, :create, :index, :destroy, :update, :edit] do |variable|
  get 'profile', to: 'pages#profile'
  end
  resources :wish_list, only: [:new, :create, :destroy, :update, :edit, :index]

  get 'users/:id/wish_list', to: 'wish_list#index', as: "user_wish_list"

  #need to add a way to nest so we can get the children on the page
  get 'users/family', to: 'users#family'
end
