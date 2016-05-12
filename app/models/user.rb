class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # If user is the following_id, that is the list of the followers
  has_many :user_followers, class_name: "UserFollow", foreign_key: "following_id"
  # If user is the follower_id, that is the list of the follow_ings_
  has_many :user_followings, class_name: "UserFollow", foreign_key: "follower_id"


  has_many :followers, class_name: "User" , through: :user_followers
  has_many :followings, class_name: "User" ,  through: :user_followings 

  has_many :post_tags, as: :taggable
  has_many :posts, through: :post_tags
  #The following post tags is messed up because  
  #SELECT "post_tags".* FROM "post_tags" INNER JOIN "user_follows" 
  
  #ON "post_tags"."id" = "user_follows"."following_id"
  #This ^^^^^^^^^^^^^^^ needs to be post_tags.taggable_id
  #...
  #...
  # WHERE "user_follows"."follower_id" = $1  [["follower_id", 2]]
  
  has_many :following_post_tags, class_name: "PostTag", through: :user_followings, source: "following", foreign_key: "taggable_id", as: :taggable
  has_many :following_posts, class_name: "Post", source: "post", through: :following_post_tags, foreign_key: "post_id"
  

end
