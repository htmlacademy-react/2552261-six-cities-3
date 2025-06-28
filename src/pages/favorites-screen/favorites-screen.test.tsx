import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {render, screen} from '@testing-library/react';
import FavoritesScreen from './favorites-screen.tsx';
import {makeFakeStoreLogin} from '../../utils/mocks.ts';


describe('Component: FavoritesScreen', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<FavoritesScreen/>, makeFakeStoreLogin);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
  });
});
