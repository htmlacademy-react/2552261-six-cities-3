import {createAction} from '@reduxjs/toolkit';
import {City} from '../types/city.ts';
import {OfferPreview, OffersPreview} from '../types/offers.ts';

export const changeCity = createAction<City | undefined>('city/changeCity');
export const resetCity = createAction('city/resetCity');
export const fillOffersList = createAction<OffersPreview>('offers/fillOffersList');
export const changeFavoriteStatus = createAction<OfferPreview>('offers/changeFavoriteStatus');
export const loadOffers = createAction<OffersPreview>('offers/loadOffers');
