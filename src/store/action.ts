import {createAction} from '@reduxjs/toolkit';
import {City} from '../types/city.ts';
import {Offer, Offers} from '../types/offers.ts';

export const changeCity = createAction<City | undefined>('city/changeCity');
export const resetCity = createAction('city/resetCity');
export const fillOffersList = createAction<Offers>('offers/fillOffersList');
export const changeFavoriteStatus = createAction<Offer>('offers/changeFavoriteStatus');

