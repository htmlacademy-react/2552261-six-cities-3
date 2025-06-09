import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {getToken} from './token.ts';
import {Offer, OffersPreview} from '../types/offers.ts';
import {AppRoute} from '../const.ts';
import {Reviews} from "../types/reviews.ts";

const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if(token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    });

  return api;
};

const api = createAPI();

export const getOfferById = async (id: string | undefined) => {
  const {data} = await api.get<Offer>(`${AppRoute.Offers}/${id}`);
  return data;
};

export const getComments = async (id: string | undefined) => {
  const {data} = await api.get<Reviews>(`${AppRoute.Comments}/${id}`);
  return data;
};

export const getNearbyOffers = async (id: string | undefined) => {
  const {data} = await api.get<OffersPreview>(`${AppRoute.Offers}/${id}/nearby`);
  return data;
};

