# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150806101540) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "images", force: :cascade do |t|
    t.string   "title"
    t.string   "text"
    t.string   "path_big"
    t.string   "path_medium"
    t.string   "path_small"
    t.integer  "width_big"
    t.integer  "width_medium"
    t.integer  "width_small"
    t.integer  "height_big"
    t.integer  "height_medium"
    t.integer  "height_small"
    t.integer  "site_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
  end

  add_index "images", ["site_id"], name: "index_images_on_site_id", using: :btree

  create_table "sites", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.jsonb    "data"
    t.string   "name"
    t.integer  "site_type",  default: 2
    t.string   "title"
  end

  add_index "sites", ["name"], name: "index_sites_on_name", unique: true, using: :btree
  add_index "sites", ["site_type"], name: "index_sites_on_site_type", using: :btree

end
