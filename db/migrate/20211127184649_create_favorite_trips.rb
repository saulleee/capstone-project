class CreateFavoriteTrips < ActiveRecord::Migration[6.1]
  def change
    create_table :favorite_trips do |t|
      t.belongs_to :user, null: false
      t.belongs_to :trip, null: false

      t.timestamps
    end
  end
end
