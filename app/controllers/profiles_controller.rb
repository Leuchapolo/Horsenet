class ProfilesController < ApplicationController
  def show
  	@current_user = current_user
  	@current_profile = params[:id]
  	if params[:type].capitalize.to_s == "User"
  		@current_profile_info = User.find_by(id: params[:id])
  	else
  		@current_profile_info = Horse.find_by(id: params[:id])
  	end
  	@current_profile_type = params[:type].capitalize.to_s
  	render 'show'
  end
end
