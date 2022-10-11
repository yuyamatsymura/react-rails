class CreateSchedules < ActiveRecord::Migration[6.1]
  def change
    create_table :schedules do |t|
      t.string :calender_id
      t.datetime :schedule_date
      t.string :content

      t.timestamps
    end
  end
end
