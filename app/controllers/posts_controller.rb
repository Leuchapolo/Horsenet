class PostsController < ApplicationController
	 def user_news
  		posts = Post.includes(:original_poster, post_tags: :user_follows).where(user_follows: {follower_id: current_user.id}).order("post_tags.created_at DESC")
  		
      
  		render json: createNewsResponse(posts)

  	end


    def user_posts
      user =  User.find_by(id: params[:id])
      
      unless user
        render json: {error: "Cannot Find User"}
      else
        render json: createNewsResponse(user.posts)
      end
    end

    def horse_posts
      horse = Horse.find_by(id: params[:id])
      unless horse
        render json: {error: "Cannot Find User"}
      else
        render json: createNewsResponse(horse.posts)
      end

    end

    def create 
      user = User.find_by(id: params[:original_poster_id]);
      unless user 
        render json: {error: "Could not find user"}
      else
        unless params[:text] == ""
          post = Post.new(text: params[:text], original_poster: user)
          pic_post_tag = post.post_media_tags.new
          unless params[:file] == "null"
            
            pic_post_tag.media_file = params[:file]
            pic_post_tag.save
          end

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
        else 
          render json: {error: "Text is empty"}
        end

          

      end
      
    

    end

    private

    def createNewsResponse(posts)

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
      response
    end

end
