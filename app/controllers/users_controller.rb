class UsersController < ApplicationController
  def family
    @childrens = current_user.kids
    # @users = User.where(creator: current_user)#.or(Mission.where(user: current_user))
  end
end
