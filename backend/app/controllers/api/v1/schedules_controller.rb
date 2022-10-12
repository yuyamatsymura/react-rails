class Api::V1::SchedulesController < ApplicationController
    def show
        render json: Schedule.where(calender_id: params[:id])
    end
    
      def create
        schedule = Schedule.new(schedule_params)
        if schedule.save
          render json: schedule
        else
          render json: schedule.erros, status: 422
        end
      end
    
      private
        def schedule_params
          params.require(:schedule).permit(:calender_id, :start, :end, :title)
        end
end
