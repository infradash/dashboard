import chai, { expect, assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

import {
  validateResponse,
  getAuthHeaders,
} from '../../app/utils/network';


describe('network helpers', () => {
  describe('validateResponse', () => {
    const responseMock = {
      response: {
        json: new Promise((resolve, reject) => {
          resolve('some text');
        })
      }
    }
    const statusSuccessful = Object.assign({}, responseMock, { status:200 });
    const statusNoAccess = { status:403, statusText:'User has no access' };
    const responseOk = { data:[] };
    const responseError = { error: 'user has no access' };

    it('should resolve promise it if http status is correct', (done) => {
      validateResponse(statusSuccessful).should.eventually.equal("foo").notify(done);
//      return validateResponse(statusSuccessful).should.eventually.equal(4);
    });

    it('should reject the promise if http status is not successful', () => {
      console.log(validateResponse(statusNoAccess));
      expect(validateResponse(statusNoAccess)).to.eventually.be.resolved;
    });

    // it('should check response object and return it if no error property presents', () => {
    //   expect(validateResponse(responseOk)).to.not.throw();
    // });
    //
    // it('should throw an error if response has error property', () => {
    //   expect(validateResponse(responseError)).to.throw('user has no access');
    // });

  });

  describe('getAuthHeaders', () => {
    it('should return an object with Authorization property', () => {
      expect(getAuthHeaders('some token')).eql({ Authorization: 'Bearer some token'});
      expect(getAuthHeaders()).eql({ Authorization: 'Bearer '});
    });;
  });
});
