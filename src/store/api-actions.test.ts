import {describe, expect, it} from 'vitest';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../services/api.ts';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../types/state.ts';
import {Action} from 'redux';
import {AppThunkDispatch, extractActionsTypes, makeOffers} from '../utils/mocks.ts';
import {AppRoute, NameSpace} from '../const.ts';
import {checkAuthorization, fetchOffersAction} from './api-actions.ts';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({[NameSpace.Offers]: {offers: []}});
  });

  describe('checkAuthorization', () => {
    it('should dispatch "checkAuthorization.pending" and "checkAuthorization.fulfilled" with thunk "checkAuthorization', async () => {
      mockAxiosAdapter.onGet(AppRoute.Login).reply(200);

      await store.dispatch(checkAuthorization());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([checkAuthorization.pending.type, checkAuthorization.fulfilled.type]);
    });

    it('should dispatch "checkAuthorization.pending" and "checkAuthorization.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(AppRoute.Login).reply(400);

      await store.dispatch(checkAuthorization());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([checkAuthorization.pending.type, checkAuthorization.rejected.type]);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" when server response 200', async () => {
      const mockOffers = makeOffers();
      mockAxiosAdapter.onGet(AppRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActions = extractActionsTypes(emittedActions);
      const fetchOffersActionFulFilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActions).toEqual([fetchOffersAction.pending.type, fetchOffersAction.fulfilled.type]);
      expect(fetchOffersActionFulFilled.payload).toEqual(mockOffers);
    });

    it('should disptach ""fetchOffersAction.pending" and "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(AppRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(
        [fetchOffersAction.pending.type, fetchOffersAction.rejected.type]
      );
    });
  });

});
