class RoomsController  < ApplicationController	
	
  def index
		render :nothing => true, :status => 200
	end

	def search
		if request.post?
      render :nothing => true, :status => 400
    else
      # render :nothing => true, :status => 200
      # render template: "rooms/_search", layout: false
      render template: "rooms/_search", layout: "sites"
    end
	end

end