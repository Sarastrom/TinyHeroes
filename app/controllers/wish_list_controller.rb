class WishListController < ApplicationController
  def index
    @wish_lists = Wish_list.all
  end

  def new
    @wish_list = Wish_list.new
  end

  def create
    @wish_list = Wish_list.new(params[:wish_list])
    @wish_list.save
  end

  def update
    @wish_list = Wish_list.find(params[:id])
    @wish_list.update(params[:wish_list])
  end

  def edit
    @wish_list = Wish_list.find(params[:id])
  end

  def destroy
    @wish_list = Wish_list.find(params[:id])
    @wish_list.destroy
  end

  private

  def wish_list_params
    params.require(:Wish_list).permit(:image, :title, :amount)
  end
end
