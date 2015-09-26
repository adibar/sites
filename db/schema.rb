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

ActiveRecord::Schema.define(version: 20150923182809) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "images", id: :bigserial, force: :cascade do |t|
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

  create_table "images_sites", id: false, force: :cascade do |t|
    t.integer "site_id",            null: false
    t.integer "image_id", limit: 8, null: false
  end

  add_index "images_sites", ["image_id", "site_id"], name: "index_images_sites_on_image_id_and_site_id", unique: true, using: :btree
  add_index "images_sites", ["site_id", "image_id"], name: "index_images_sites_on_site_id_and_image_id", unique: true, using: :btree

  create_table "profiles", force: :cascade do |t|
    t.string   "first_name"
    t.string   "family_name"
    t.integer  "language",    default: 0
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "profiles", ["user_id"], name: "index_profiles_on_user_id", using: :btree

  create_table "sites", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.jsonb    "data"
    t.string   "name"
    t.integer  "site_type",  default: 2
    t.string   "title"
    t.integer  "user_id"
  end

  add_index "sites", ["name"], name: "index_sites_on_name", unique: true, using: :btree
  add_index "sites", ["site_type"], name: "index_sites_on_site_type", using: :btree
  add_index "sites", ["user_id"], name: "index_sites_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
