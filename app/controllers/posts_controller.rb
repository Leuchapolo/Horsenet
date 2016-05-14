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
      user = User.find_by(id: params[:original_poster_id].to_i);
      unless user 
        render json: {error: "Could not find user"}
      else

        post = Post.new(text: params[:text], original_poster: user)
        post.save
        unless post.errors.messages == {}
          #print error
          render json: {error: post.errors.messages}
        else 
          tag = user.post_tags.new(post_id: post.id)
          tag.save 
          unless tag.errors.messages == {}
            render json: {error: tag.errors.messages}
          else
            render json: {post: post}
          end
        end
          

      end
      
    

    end

end
