class CreatePlaces < ActiveRecord::Migration[6.1]
  def change
    create_table :places do |t|
      t.jsonb :categories, null: false
      t.string :yelp_id, null: false
      t.string :image_url, null: false
      t.jsonb :location, null: false
      t.string :name, null: false
      t.string :price, null: false
      t.integer :rating, null: false
      t.integer :review_count, null: false
      t.string :url, null: false

      t.timestamps
    end
  end
end
