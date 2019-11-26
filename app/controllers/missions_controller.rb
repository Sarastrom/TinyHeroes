class MissionsController < ApplicationController
  def index
    @missions = Mission.all
  end

  def new
    @mission = Mission.new
  end

  def create
    @misson = Mission.new(params[:misson])
    @mission.save
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
