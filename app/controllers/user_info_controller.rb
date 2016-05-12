class UserInfoController < ApplicationController
  def show_public_info
  	user_info = User.find_by(id: params[:id])
  	render json: user_info
  end
end
