import { RootState } from '../store';

export const getUserIsRegistered = (state: RootState) =>
  state.user.userIsRegistered;

export const getUserErrorSigninMessage = (state: RootState) =>
  state.user.errorSigninMessage;

export const getUserErrorRegistrationMessage = (state: RootState) =>
  state.user.errorRegistrationMessage;
