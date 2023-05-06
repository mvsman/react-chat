import { IUser, Status } from '../../schema/schema';

export interface UserState extends IUser {
  status: Status;
  errorMessage?: string;
  userIsRegistered: boolean;
}
