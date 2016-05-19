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

ActiveRecord::Schema.define(version: 20160518220219) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "horses", force: :cascade do |t|
    t.string   "name"
    t.integer  "user_id"
    t.integer  "birth_year"
    t.string   "specialty"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "profile_picture"
  end

  create_table "post_media_tags", force: :cascade do |t|
    t.integer  "post_id"
    t.string   "media_file"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "post_tags", force: :cascade do |t|
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "post_id"
  end

  add_index "post_tags", ["taggable_type", "taggable_id"], name: "index_post_tags_on_taggable_type_and_taggable_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.string   "text"
    t.integer  "original_poster"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "profile_media_tags", force: :cascade do |t|
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "media_file"
    t.integer  "mediable_id"
    t.string   "mediable_type"
  end

  add_index "profile_media_tags", ["mediable_type", "mediable_id"], name: "index_profile_media_tags_on_mediable_type_and_mediable_id", using: :btree

  create_table "user_follows", force: :cascade do |t|
    t.integer  "follower_id"
    t.integer  "following_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "following_type"
  end

  add_index "user_follows", ["following_id"], name: "index_user_follows_on_following_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                      default: "", null: false
    t.string   "encrypted_password",         default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",              default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "name"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "place_of_birth"
    t.string   "current_place_of_residence"
    t.string   "work"
    t.string   "current_show"
    t.string   "next_class"
    t.string   "specialization"
    t.string   "bio"
    t.string   "profile_picture"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
