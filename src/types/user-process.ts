import {AuthorizationStatus} from '../const.ts';
import {User} from './user.ts';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: User | undefined;
};
