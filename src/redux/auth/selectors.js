import { createSelector } from '@reduxjs/toolkit';

export const selectUser = state => state.auth.user;
export const selectUserName = state => state.auth.user.name;
export const selectUserPhoto = state => state.auth.user.avatar;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectToken = state => state.auth.token;
export const selectAuthErrorMessage = state => state.auth.errorMessage;
export const selectAuthSuccessMessage = state => state.auth.successMessage;
export const selectIsLoading = state => state.auth.isLoading;
export const selectWaterRate = state => state.auth.user.dailyRateWater;
export const selectIsLoadingPhoto = state => state.auth.isLoadingPhoto;
export const selectIsNewUser = state => state.auth.isNewUser;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectIsAuthenticated = state => {
  const token = selectToken(state);
  const isLoggedIn = selectIsLoggedIn(state);
  return !!token && isLoggedIn;
};

export const selectWaterRateInMilliliters = createSelector(
  [selectWaterRate],
  dailyRateWater => (dailyRateWater ? dailyRateWater * 1000 : 0),
);
