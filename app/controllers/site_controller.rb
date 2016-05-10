class SiteController < ApplicationController
  def index
  	@current_user = current_user.id;
  	render 'index'
  end
end
