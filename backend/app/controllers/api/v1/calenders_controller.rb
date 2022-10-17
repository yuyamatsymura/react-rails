require 'securerandom'

class Api::V1::CalendersController < ApplicationController
    def create
        calender = Calender.new(url: SecureRandom.uuid)
        if calender.save
          render json: calender
        else
          render json: calender.erros, status: 422
        end
    end
end
