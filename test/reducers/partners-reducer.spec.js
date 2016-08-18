import { expect } from 'chai';
import reducer from '../../app/src/reducers/partners';

describe('partners reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal({
      list: []
    });
  });
});
