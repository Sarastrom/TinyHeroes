class MissionsController < ApplicationController
  def index
    @missions = Mission.where(creator: current_user).or(Mission.where(user: current_user)).where(completed: true).order(updated_at: :desc)
    @not_completed_missions = Mission.where(creator: current_user).or(Mission.where(user: current_user)).where(completed: false).order(updated_at: :desc)
    @favourites = []
  end

  def new
    @mission = Mission.new
  end

  def create
    @mission = Mission.new(mission_params)
    @mission.completed = false
    @mission.creator = current_user
    if @mission.save
      redirect_to missions_path
    else
      redirect_to missions_path, notice: @mission.errors.full_messages.join(', ')
    end
  end

  def update
    @mission = Mission.find(params[:id])
    @mission.update(params[:mission])
  end

  def edit
    @mission = Mission.find(params[:id])
  end

  def delete
    @mission = Mission.find(params[:id])
    @mission.destroy
  end

  def mark_as_completed
    @mission = Mission.find(params[:id])
    @mission.mark_completed
    redirect_to missions_path
  end

  def mark_as_verified
    @mission = Mission.find(params[:id])
    @mission.mark_verified
    @mission.user.receive_reward(@mission.reward)
    redirect_to missions_path, notice: "You just awarded #{@mission.reward} coins"
  end

  private

  def mission_params
    params.require(:mission).permit(:completed, :name, :description, :reward, :icon, :user_id)
  end
end
