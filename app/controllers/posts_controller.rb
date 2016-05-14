class PostsController < ApplicationController
	def user_news
  		posts = Post.includes(:original_poster, post_tags: :user_follows).where(user_follows: {follower_id: current_user.id})
  		response = []
  		posts.each do |post|
  			hash = {post: post,
  	  				post_tags: {
                tagged_objects: post.post_tags.map(&:taggable),
                post_tags: post.post_tags
              }

  			}
  			response << hash
  		end
      
  		render json: response

  	end

    def create 
      

    end

end
