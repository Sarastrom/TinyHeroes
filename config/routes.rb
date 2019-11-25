Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :missions, only: [:new, :create, :index, :destroy, :update, :edit]
  resources :wish_lists, only: [:new, :create, :index, :destroy, :update, :edit]

end
