class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # If user is the following_id, that is the list of the followers
  has_many :user_followers, class_name: "UserFollow", foreign_key: "following_id"
  # If user is the follower_id, that is the list of the follow_ings_
  

  has_many :horses

  has_many :followers,  through: :user_followers
  has_many :followings, as: :following, class_name: "UserFollow", foreign_key: "follower_id"

  has_many :post_tags, as: :taggable
  has_many :posts, through: :post_tags
  

end
