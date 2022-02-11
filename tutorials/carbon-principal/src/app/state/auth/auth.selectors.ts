import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducers";

export const AUTH_STATE_FEATURE = "auth"
export const selectAuthState = createFeatureSelector<AuthState>(AUTH_STATE_FEATURE)

export const getLoginState = createSelector(
  selectAuthState,
  state => {
    return state.isLoggedin;
  }
);

