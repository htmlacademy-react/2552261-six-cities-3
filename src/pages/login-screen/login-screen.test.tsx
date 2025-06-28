import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginScreen from './login-screen.tsx';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {AuthorizationStatus} from '../../const.ts';
import {makeUser} from '../../utils/mocks.ts';


describe('Component: LoginScreen', () => {
  it('should render correctly', () => {
    const signInText = 'Sign in';
    const loginText = 'Email';
    const passwordText = 'Password';
    const { withStoreComponent } = withStore(<LoginScreen />, {PAGE: {isPrivatePage: false}, USER: {authorizationStatus: AuthorizationStatus.NoAuth, user: makeUser()}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(signInText, { selector: 'h1' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(loginText));
    expect(screen.getByPlaceholderText(passwordText));
  });

  it('should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'keks';
    const expectedPasswordValue = '123456';
    const { withStoreComponent } = withStore(<LoginScreen />, {PAGE: {isPrivatePage: false}, USER: {authorizationStatus: AuthorizationStatus.NoAuth, user: makeUser()}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
