import Promise from 'native-promise-only';

const providerData = {
  client_id: '138766960114-ikj7ignimooj54qabses3cc857l1a8h4.apps.googleusercontent.com',
  cookie_policy: 'single_host_origin'
};

function loadApi() {
  return new Promise(function promise(resolve, reject) {
    gapi.load('auth2', function loadGoogleApi() {
      resolve(gapi);
    });
  });
}

function signIn(gapi) {
  return new Promise(function promise(resolve, reject) {
    gapi.auth.authorize({
      client_id: providerData.client_id,
      immediate: false,
      scope: 'email'
    }, function callback(response) {
      if (!response.error) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
}

function getToken(user) {
  const accessToken = user.access_token;
  return {
    oauth2_access_token: accessToken,
    oauth2_provider: 'google.com'
  };
}

export function googleSignIn() {
  return (dispatch, state) => loadApi().then(signIn).then(getToken).catch(error => error);
}


// export function logout() {
//   return googleApi().then(function(gapi){
//     var auth2 = gapi.auth2.getAuthInstance();
//     return auth2.signOut();
//   });
// }
