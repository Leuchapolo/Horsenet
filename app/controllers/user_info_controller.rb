class UserInfoController < ApplicationController
  def show_public_info
  	user = User.find_by(id: params[:id])
  	response = {user: user, horses: user.horses}
  	render json: response
  end
end
