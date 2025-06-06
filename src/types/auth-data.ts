import {NavigateFunction} from 'react-router-dom';

export type AuthData = {
  email: string;
  password: string;
  navigate: NavigateFunction;
}
