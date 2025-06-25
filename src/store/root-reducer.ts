import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const.ts';
import {cityProcess} from './city-process/city-process.ts';
import {offerProcess} from './offers-process/offers-process.ts';
import {userProcess} from './user-process/user-process.ts';
import {pageProcess} from "./pages-process/page-process.ts";

export const rootReducer = combineReducers({
  [NameSpace.City]: cityProcess.reducer,
  [NameSpace.Offers]: offerProcess.reducer,
  [NameSpace.User]:  userProcess.reducer,
  [NameSpace.Page]:  pageProcess.reducer,
});
