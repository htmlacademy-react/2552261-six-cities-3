import {PageProcess} from '../../types/page-process.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const.ts';

const initialState: PageProcess = {
  isPrivatePage: false,
};

export const pageProcess = createSlice({
  name: NameSpace.Page,
  initialState,
  reducers: {
    changePageStatus: (state, action: PayloadAction<boolean>) => {
      state.isPrivatePage = action.payload;
    }
  }
});

export const {changePageStatus} = pageProcess.actions;
