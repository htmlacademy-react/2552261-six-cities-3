import {render, screen} from '@testing-library/react';
import {createMemoryHistory, MemoryHistory} from 'history';
import {AppRoute} from '../../const';
import App from './app';
import {withHistory, withStore} from '../../utils/mock-component';
import {makeFakeStoreLogin, makeFakeStoreNoLogin} from '../../utils/mocks';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainScreen" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStoreLogin);
    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    expect(screen.getByTestId('cities-list')).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStoreNoLogin);
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    const signInText = 'Sign in';
    const loginText = 'Email';
    const passwordText = 'Password';

    expect(screen.getByText(signInText, { selector: 'h1' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(loginText));
    expect(screen.getByPlaceholderText(passwordText));
  });

  it('should render "NoFoundScreen" when user navigate to unknown route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStoreNoLogin);
    mockHistory.push('/unknown-route');

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

  it('should render "FavoritesScreen" when user navigate to "/favorites', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStoreLogin);
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
  });
});
