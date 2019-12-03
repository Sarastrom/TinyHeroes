class UsersController < ApplicationController
  def family
    @childrens = current_user.kids
    # @users = User.where(creator: current_user)#.or(Mission.where(user: current_user))
  end

  def create_child
    @user = User.new(create_child_params)
    @user.parent = current_user
    @user.save
    redirect_to missions_path
  end

  def create_child_params
    params.require(:user).permit(:first_name, :email, :password)
  end
end
