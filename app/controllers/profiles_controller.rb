class ProfilesController < ApplicationController
  def show
  	@current_user = current_user
  	@current_profile = params[:id]
  	render 'show'
  end
end
