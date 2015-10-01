class Users::RegistrationsController < Devise::RegistrationsController
  # clear_respond_to #do not allow respond to html
  layout false
  respond_to :json

  # before_filter :configure_sign_up_params, only: [:create]
  # before_filter :configure_account_update_params, only: [:update]

  def sign_up_params
    devise_parameter_sanitizer.sanitize(:sign_up)
    params.require(:user).permit(:email, :password, :password_confirmation,
                                  profile_attributes: [:first_name, :family_name],
                                  sites_attributes:   [:name, :template_id]
                                  )
  end

  # GET /resource/sign_up
  def new
     super
  end

  # POST /resource
  def create
    ret = super
    ret
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.for(:sign_up) << :attribute
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.for(:account_update) << :attribute
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
