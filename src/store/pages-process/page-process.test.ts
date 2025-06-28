import {describe, expect, it} from 'vitest';
import {changePageStatus, pageProcess} from './page-process.ts';


describe('pageProcess slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const initialState = {isPrivatePage: false};
    const result = pageProcess.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return the default state with undefined state and empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {isPrivatePage: false};
    const result = pageProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should change state with "changePageStatus" action', () => {
    const expectedState = {isPrivatePage: true};
    const result = pageProcess.reducer(undefined, changePageStatus(true));
    expect(result).toEqual(expectedState);
  });
});
