if Rails.env === 'production' 
    Rails.application.config.session_store :cookie_store, key: 'f1api', domain: 'f1api-json-api'
  else
    Rails.application.config.session_store :cookie_store, key: '_f1api'
end