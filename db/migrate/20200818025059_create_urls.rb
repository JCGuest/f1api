class CreateUrls < ActiveRecord::Migration[5.2]
  def change
    create_table :urls do |t|
      t.references :user
      t.string :type

      t.timestamps
    end
  end
end
