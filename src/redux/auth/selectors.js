import { createSelector } from '@reduxjs/toolkit';

export const selectUser = state => state.auth.user;
export const selectUserName = state => state.auth.user.name;
export const selectUserPhoto = state => state.auth.user.avatar;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectToken = state => state.auth.token;
export const selectWaterRate = state => state.auth.user.dailyRateWater;
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
