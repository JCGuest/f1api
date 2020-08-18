Rails.application.routes.draw do

  # S3 bucket upload handler
  get '/s3/direct_post', to: 's3#direct_post'
  post '/uploads', to: 'uploads#create'

  # Users
  resources :users, only: [:create, :show] do 
    resources :urls, only: [:create, :index]
  end

  # Session
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#logged_in?' 

end
