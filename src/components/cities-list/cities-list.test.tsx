import {render, screen} from '@testing-library/react';
import {CitiesList} from './cities-list.tsx';
import {City} from '../../types/city.ts';
import {it} from 'vitest';
import {withHistory} from '../../utils/mock-component.tsx';
import {CITY_LOCATIONS} from '../../const.ts';

describe('Component: cities-list', () => {
  const city: City = {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 10
    }
  };

  it('should render correctly', () => {
    render(withHistory(<CitiesList currentCity={city} clickLocationHandler={vi.fn()}/>));
    const citiesList = screen.getByTestId('cities-list');
    const citiesItems = screen.getAllByTestId('cities-item');
    expect(citiesList).toBeInTheDocument();
    expect(citiesItems.length).toBe(CITY_LOCATIONS.length);

    CITY_LOCATIONS.forEach((citiesItem) => {
      expect(screen.getByText(citiesItem.name)).toBeInTheDocument();
    });
  });
});
