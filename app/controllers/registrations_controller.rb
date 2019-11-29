class RegistrationsController < Devise::RegistrationsController

  # def new
  #   @user = User.new
  # end

  # def create_child
  #   @user = User.new(create_child_params)
  #   @user.parent = current_user
  #   @user.save
  #   raise
  #   redirect_to users_family_path
  # end

  protected

  def after_sign_up_path_for(resource)
    users_family_path
  end

  def create_child_params
    params.permit(:first_name, :email, :password)
  end
end
