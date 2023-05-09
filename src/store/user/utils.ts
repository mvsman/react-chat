import { IUser, Status } from '../../schema/schema';

export interface UserState extends IUser {
  status: Status;
  errorSigninMessage?: string;
  errorRegistrationMessage?: string;
  userIsRegistered: boolean;
}
