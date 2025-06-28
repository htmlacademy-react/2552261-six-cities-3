import {NameSpace} from '../../const.ts';
import {getPageStatus} from './selectors.ts';

describe('PageProcess selector', () => {
  it('should return page status', () => {
    const state = {[NameSpace.Page]: {isPrivatePage: false}};
    const isPrivate = state[NameSpace.Page].isPrivatePage;
    const result = getPageStatus(state);
    expect(result).toEqual(isPrivate);
  });
});
