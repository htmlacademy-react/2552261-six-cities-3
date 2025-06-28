import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {render, screen} from '@testing-library/react';
import NotFoundScreen from './not-found-screen.tsx';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<NotFoundScreen/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
