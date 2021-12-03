class CreatePlaces < ActiveRecord::Migration[6.1]
  def change
    create_table :places do |t|
      t.string :yelp_id, null: false
      t.jsonb :categories
      t.string :image_url
      t.jsonb :location
      t.string :name
      t.string :price
      t.integer :rating
      t.integer :review_count
      t.string :url

      t.timestamps
    end
  end
end
