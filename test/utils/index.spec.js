import { expect } from 'chai';
import { checkHttpStatus } from 'utils';

describe('test case', () => {
  it('simple test case', () => {
    expect(1).to.be.equal(1);
  });

  it('simple test case', () => {
    expect(checkHttpStatus({status:200})).to.be.an('object');
  });
});
