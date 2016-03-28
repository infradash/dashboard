import ClientOAuth2 from 'client-oauth2';
import { Promise } from 'es6-promise';
import { generateString, getUrl } from 'utils';
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_AUTH_API_URL,
  REDIRECT_URI
} from 'config';

const state = generateString();
const githubAuth = new ClientOAuth2({
  clientId: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  authorizationUri: GITHUB_AUTH_API_URL,
  redirectUri: REDIRECT_URI,
  state
});

const login = () => {
  return new Promise((resolve, reject) => {
    const url = githubAuth.token.getUri();
    const popup = window.open(url, null, 'top=100,left=100,width=500,height=500');
    window.oauth2Callback = (uri) => {
      githubAuth.token.getToken(uri).then(user => {
        popup.close();
        if (user.data.state === state) {
          resolve(user.data);
        } else {
          reject('state mismatch error');
        }
      });
    };
  });
};

const createOauthObject = (data) => ({
  oauth2_code: data.code,
  oauth2_state: data.state,
  oauth2_provider: 'github.com'
});

if (window.opener) {
  window.opener.oauth2Callback(getUrl());
}

export function githubSignIn() {
  return () => login().then(createOauthObject);
}
