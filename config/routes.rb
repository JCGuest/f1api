Rails.application.routes.draw do
  # S3 bucket upload handler
  get '/s3/direct_post', to: 's3#direct_post'
  resources :uploads

  # Users
  post "users/", to: ""
  

end
