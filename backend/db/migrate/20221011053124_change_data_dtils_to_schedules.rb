class ChangeDataDtilsToSchedules < ActiveRecord::Migration[6.1]
  def change
    change_column :schedules, :start, :date
    change_column :schedules, :end, :date
  end
end
