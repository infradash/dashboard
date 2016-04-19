import { Promise } from 'es6-promise';

const providerData = {
  client_id: '138766960114-ikj7ignimooj54qabses3cc857l1a8h4.apps.googleusercontent.com',
  cookie_policy: 'single_host_origin',
};

function loadApi() {
  return new Promise((resolve) => {
    gapi.load('auth2', () => {
      resolve(gapi);
    });
  });
}

function signIn(gapi) {
  return new Promise((resolve, reject) => {
    gapi.auth.authorize({
      client_id: providerData.client_id,
      immediate: false,
      scope: 'email',
    }, response => {
      if (!response.error) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
}

function createOauthObject(user) {
  const accessToken = user.access_token;
  return {
    oauth2_access_token: accessToken,
    oauth2_provider: 'google.com',
  };
}

export function googleSignIn() {
  return () => loadApi().then(signIn).then(createOauthObject);
}
