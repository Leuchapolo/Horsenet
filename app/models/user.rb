class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :followers, through: :user_follows, class_name: "User" 
  has_many :followeds,  through: :user_follows , class_name: "User"

end
