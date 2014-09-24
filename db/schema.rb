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

ActiveRecord::Schema.define(version: 20140924200508) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activity", force: true do |t|
    t.integer  "user_id"
    t.string   "type"
    t.integer  "hours"
    t.integer  "minutes"
    t.integer  "seconds"
    t.integer  "calories"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "activity", ["user_id"], name: "index_activity_on_user_id", using: :btree

  create_table "posts", force: true do |t|
    t.integer  "user_id"
    t.string   "workout_type"
    t.integer  "hours"
    t.integer  "minutes"
    t.integer  "seconds"
    t.integer  "calories"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "age"
    t.integer  "weight"
    t.integer  "height"
    t.string   "gender"
  end

end
