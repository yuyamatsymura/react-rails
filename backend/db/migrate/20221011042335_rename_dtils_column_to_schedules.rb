class RenameDtilsColumnToSchedules < ActiveRecord::Migration[6.1]
  def change
    rename_column :schedules, :schedule_date, :start
    rename_column :schedules, :content, :title
  end
end
