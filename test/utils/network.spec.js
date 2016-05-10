import { expect, assert } from 'chai';
import {
  checkResponse,
  checkHttpStatus,
  getAuthHeaders,
} from '../../app/utils/network';


describe('network helpers', () => {
  describe('checkHttpStatus', () => {
    const statusSuccessful = { status:200 };
    const statusNoAccess = { status:403, statusText:'User has no access' };

    it('should check response object and return it if http status is correct', () => {
      expect(checkHttpStatus(statusSuccessful)).eql(statusSuccessful);
    });

    it('should throw an error if http status is not successful', () => {
      expect(() => checkHttpStatus(statusNoAccess)).to.throw("User has no access");
    });
  });

  describe('checkResponse', () => {
    const responseOk = { data:[] };
    const responseError = { error: 'user has no access' };

    it('should check response object and return it if no error property presents', () => {
      expect(() => checkResponse(responseOk)).to.not.throw();
    });

    it('should throw an error if response has error property', () => {
      expect(() => checkResponse(responseError)).to.throw('user has no access');
    });
  });

  describe('getAuthHeaders', () => {
    it('should return an object with Authorization property', () => {
      expect(getAuthHeaders('some token')).eql({ Authorization: 'Bearer some token'});
      expect(getAuthHeaders()).eql({ Authorization: 'Bearer '});
    });;
  });
});
