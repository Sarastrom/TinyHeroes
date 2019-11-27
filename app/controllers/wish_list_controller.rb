class WishListController < ApplicationController
  def index
    if params[:query].present?
      sql_query = "wish_lists.title ILIKE :query"
      @wish_lists = WishList.where(sql_query, query: "%#{params[:query]}%")
    else
      @wish_lists = WishList.all
    end
  end

  def new
    @wish_list = WishList.new
  end

  def create
    @wish_list = WishList.new(params[:wish_list])
    @wish_list.save
  end

  def update
    @wish_list = WishList.find(params[:id])
    @wish_list.update(params[:wish_list])
  end

  def edit
    @wish_list = WishList.find(params[:id])
  end

  def destroy
    @wish_list = WishList.find(params[:id])
    @wish_list.destroy
  end

  private

  def wish_list_params
    params.require(:WishList).permit(:title, :amount, :photo)
  end
end
