Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'schedules/:calender_id', to: 'schedules#index'
      post 'schedules/:calender_id', to: 'schedules#create'
      patch 'schedules/:calender_id/:id', to: 'schedules#update'
      delete 'schedules/:calender_id/:id', to: 'schedules#destroy'
    end
  end
end