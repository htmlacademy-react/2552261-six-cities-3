import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CityProcess} from '../../types/city-process.ts';
import {CITY_LOCATIONS, DEFAULT_CITY, NameSpace} from '../../const.ts';
import {City} from '../../types/city.ts';

const initialState: CityProcess = {
  city: DEFAULT_CITY
};

export const cityProcess = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City | undefined>) => {
      state.city = CITY_LOCATIONS.find((city) => city.name === action.payload?.name);
    },
    resetCity: (state) => {
      state.city = DEFAULT_CITY;
    }
  }
});

export const {changeCity, resetCity} = cityProcess.actions;
