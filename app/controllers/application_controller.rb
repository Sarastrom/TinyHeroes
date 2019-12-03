class ApplicationController < ActionController::Base

  before_action :authenticate_user!

  before_action :configure_permitted_parameters, if: :devise_controller?

  def default_url_options
    { host: ENV["tinyheroes.uk"] || "localhost:3000" }
  end

  def after_sign_in_path_for(resource)
    missions_path
  end
     protected

      def configure_permitted_parameters
           devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:email, :password, :first_name, :last_name, :avatar)}

           devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:email, :password, :first_name, :last_name, :avatar)}
      end
end
