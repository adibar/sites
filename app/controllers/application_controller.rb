class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  before_filter :update_language, :set_locale

  helper_method :current_profile, :current_language


  def current_profile
  	current_user.nil_or.profile
  end

	def current_language

    if current_profile.nil_or.language #can't use nil_or for language
      lang = params[:language] || current_profile.nil_or.language.nil_or.name.to_s || cookies[:language] || 'en'
    else
      lang = params[:language] || cookies[:language] || 'en'
    end

    lang
	end

  def update_language
  	if params[:language]

  		current_profile.nil_or.update_attributes(language: params[:language] )

  		# redirect_to root_path
  		redirect_to request.path # remove the language get parameter
  	end
  end

  def set_locale
    lang = current_language

    I18n.locale = lang
    # I18n.fallbacks[ I18n.locale ] = [ [lang, locale_suffix].compact.join('-'), lang, ['en', locale_suffix].compact.join('-'), 'en' ]
  end


end
