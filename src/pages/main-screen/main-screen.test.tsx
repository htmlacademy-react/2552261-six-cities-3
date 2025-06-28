import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {withHistory, withStore} from '../../utils/mock-component';
import {extractActionsTypes, makeFakeStoreLogin} from '../../utils/mocks';
import MainScreen from './main-screen.tsx';
import {changeCity} from '../../store/city-process/city-process.ts';
import {changePageStatus} from '../../store/pages-process/page-process.ts';
import {changeFavoriteStatus, logoutAction} from '../../store/api-actions.ts';
import {APIRoute, AppRoute} from '../../const.ts';

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<MainScreen />, makeFakeStoreLogin);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('cities-list')).toBeInTheDocument();
  });

  it('should dispatch "changeCity" when user clicked locations list element', async () => {
    const { withStoreComponent, mockStore } = withStore(<MainScreen />, makeFakeStoreLogin);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const links = screen.getAllByTestId('locations-item-link');
    const randomIndex = Math.floor(Math.random() * links.length);
    await userEvent.click(links[randomIndex]);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      changePageStatus.type, changeCity.type
    ]);

  });

  it('should dispatch "changeFavoriteStatus" when user clicked bookmark-button', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<MainScreen />, makeFakeStoreLogin);
    const preparedComponent = withHistory(withStoreComponent);
    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/1/0`).reply(200, []);

    render(preparedComponent);
    const buttons = screen.getAllByTestId('bookmark-button');
    const randomIndex = Math.floor(Math.random() * buttons.length);
    await userEvent.click(buttons[randomIndex]);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      changePageStatus.type, changeFavoriteStatus.pending.type, changeFavoriteStatus.fulfilled.type
    ]);
  });

  it('should dispatch "logout" when user clicked logout-button', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<MainScreen />, makeFakeStoreLogin);
    const preparedComponent = withHistory(withStoreComponent);
    mockAxiosAdapter.onDelete(AppRoute.Logout).reply(204, []);

    render(preparedComponent);
    const link = screen.getByTestId('header-nav-link');
    await userEvent.click(link);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      changePageStatus.type, logoutAction.pending.type, logoutAction.fulfilled.type
    ]);
  });
});
