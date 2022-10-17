class Api::V1::SchedulesController < ApplicationController
    def index
      calender = Calender.find_by(url: params[:calender_id])
        if calender.present?
          render json: Schedule.where(calender_id: params[:calender_id])
        else
          render json: { error: '400 error' }, status: 400
        end
    end
    
    def create
      schedule = Schedule.new(schedule_params)
      if schedule.save
        render json: schedule
      else
        render json: schedule.erros, status: 422
      end
    end

    def update
      schedule = Schedule.find(params[:id])
      if schedule.update(schedule_params)
        render json: schedule
      else
        render json: schedule.errors, status: 422
      end
    end

    def destroy
      schedule = Schedule.find(params[:id])
      schedule.destroy
      render json: schedule
    end
    
    private
      def schedule_params
        params.require(:schedule).permit(:calender_id, :start, :end, :title)
      end
end
