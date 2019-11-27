class MissionsController < ApplicationController
  def index
    @missions = Mission.where(creator: current_user).or(Mission.where(user: current_user))
  end

  def new
    @mission = Mission.new
  end

  def create
    @mission = Mission.new(mission_params)
    @mission.creator = current_user
    @mission.save
    redirect_to missions_path
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
