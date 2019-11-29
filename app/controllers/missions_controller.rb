class MissionsController < ApplicationController
  def index
    @missions = Mission.where(creator: current_user).or(Mission.where(user: current_user))
    @favourites = []
  end

  def new
    @mission = Mission.new
  end

  def create
    @mission = Mission.new(mission_params)
    @mission.creator = current_user
    if @mission.save
      redirect_to missions_path
    else
      redirect_to missions_path, notice: @mission.errors.full_messages.join(', ')
    end
  end

  def update
    @misson = Mission.find(params[:id])
    @mission.update(params[:mission])
  end

  def edit
    @misson = Mission.find(params[:id])
  end

  def delete
    @misson = Mission.find(params[:id])
    @misson.destroy
  end

  private

  def mission_params
    params.require(:mission).permit(:completed, :name, :description, :reward, :icon)
  end
end
