class FavoriteTripsController < ApplicationController
  def destroy
    @user = User.find(params[:id])
    @user.trips.find_by(trip_id: params[:trip_id]).delete
    redirect_to @user, notice: "Succesfully unfavorited"
  end
end
