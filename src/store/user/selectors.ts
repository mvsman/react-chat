import { RootState } from '../store';

export const getUsername = (state: RootState) => state.user.username;

export const getUserPassword = (state: RootState) => state.user.password;

export const getUserIsRegistered = (state: RootState) =>
  state.user.userIsRegistered;

export const getUserErrorMessage = (state: RootState) =>
  state.user.errorMessage;
