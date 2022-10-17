class CreateCalenders < ActiveRecord::Migration[6.1]
  def change
    create_table :calenders do |t|
      t.string :url

      t.timestamps
    end
  end
end
