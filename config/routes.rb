Rails.application.routes.draw do
  
  get '/s3/direct_post', to: 's3#direct_post'
  resources :uploads
  resources :users, only: [:create, :show]

end
