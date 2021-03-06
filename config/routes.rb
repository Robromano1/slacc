Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  namespace :api, defaults: { format: :json } do
    # resources :dms, only: [:index, :show, :create]

    resources :users, only: [:create, :show] do
      resources :dms, only: [:index, :create] 
      # get 'get_dm', to: 'dms#get_dm'
    end
    resources :dms do
      resources :messages, only: [:create]
    end
    resource :session, only: [:create, :destroy]
    resources :channels, only: [:index, :create, :show, :update, :destroy] do
      resources :messages, only: [:create]
      # resources :users, only: [:index]
      get 'leave_channel', to: 'channel_members#destroy'
      get 'add_channel', to: 'channels#add_channel'
    end
    resources :messages, only: [:show, :update, :destroy, :index]
    resources :users, only: [:index]

    get 'get_users', to: 'users#get_users'
    get 'session/verify_email', to: 'sessions#verify_email'

  end

  root to: 'static_pages#root'

  mount ActionCable.server, at: '/cable'
  
end
