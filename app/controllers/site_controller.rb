class SiteController < ApplicationController
  def index
  	unless current_user
  		redirect_to '/users/sign_in'
  	else
  		@current_user = current_user.id
  		render 'index'
  	end
  end
end
