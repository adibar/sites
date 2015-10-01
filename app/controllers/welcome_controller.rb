class WelcomeController < ApplicationController

  before_action :redirect_loggedin, :unless =>  :path_required?

	def index

	end

  def path_required?()
    request.path.downcase.include? self.controller_name.downcase
  end

end