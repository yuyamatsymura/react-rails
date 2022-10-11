class AddEndToSchedules < ActiveRecord::Migration[6.1]
  def change
    add_column :schedules, :end, :datetime
  end
end
