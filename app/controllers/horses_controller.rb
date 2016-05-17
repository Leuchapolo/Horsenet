class HorsesController < ApplicationController
	def show 
		horse = Horse.find_by(id: params[:id])
		response = {horse: horse, rider: horse.user}
  		render json: response
	end
end
