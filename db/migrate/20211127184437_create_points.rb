class CreatePoints < ActiveRecord::Migration[6.1]
  def change
    create_table :points do |t|
      t.belongs_to :trip, null: false
      t.belongs_to :place, null: false

      t.timestamps
    end
  end
end
