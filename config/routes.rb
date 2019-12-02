Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }

  devise_scope :user do
    # post 'create_child', to: 'registrations#create_child', as: :create_child
  end

  post 'create_child', to: "users#create_child", as: :create_child
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :missions, only: [:new, :create, :index, :destroy, :update, :edit] do
    member do
      post 'mark_complete', to: 'missions#mark_as_completed', as: :mark_complete
      post 'mark_verify', to: 'missions#mark_as_verified', as: :mark_verify
    end
  end
  get 'profile', to: 'pages#profile'


  resources :likes, only: [ :new, :create ]
  resources :wish_list, only: [:new, :create, :destroy, :update, :edit, :index]

  get 'users/:id/wish_list', to: 'wish_list#index', as: "user_wish_list"

  #need to add a way to nest so we can get the children on the page
  get 'users/family', to: 'users#family'
  get 'profile', to: 'pages#profile'

end
