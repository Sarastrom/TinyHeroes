class LikesController < ApplicationController
  def new
    @like = Like.new
  end

  def create
    @like = Like.new(like_params)
    @wish_list = WishList.find(params[:like][:wish_list_id])
    if @wish_list.amount.to_i > current_user.reward_amount.to_i
      flash[:notice] = "You do not have enough coins"
      redirect_to missions_path
      return
    end
    @like.wish_list = @wish_list
    @like.user = current_user
    current_user.reward_amount = current_user.reward_amount.to_i - @wish_list.amount.to_i
    current_user.save
    @like.save
    redirect_to request.referrer
  end

  private

  def like_params
    params.require(:like).permit(:user_id, :wish_list_id)
  end
end
