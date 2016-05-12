class PostsController < ApplicationController
	def user_news
  		posts = Post.find_by_sql("Select * from posts inner join post_tags on posts.id = post_tags.post_id inner join user_follows on post_tags.taggable_id = user_follows.following_id where user_follows.follower_id = #{current_user.id}")
  		render json: posts
  	end
end
