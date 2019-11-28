Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }
  root to: 'pages#home'

  devise_scope :user do
    post 'create_child', to: 'registrations#create_child', as: :create_child
  end
  # get "/sign_up", to: "devise/registrations#new", as: "users_family_path" # custom path to sign_up/registration

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :missions, only: [:new, :create, :index, :destroy, :update, :edit] do |variable|
  get 'profile', to: 'pages#profile'
  end
  resources :wish_list, only: [:new, :create, :destroy, :update, :edit, :index]

  get 'users/:id/wish_list', to: 'wish_list#index', as: "user_wish_list"

  #need to add a way to nest so we can get the children on the page
  get 'users/family', to: 'users#family'
  get 'profile', to: 'pages#profile'
  resources :likes, only: [ :new, :create ]
end
