import Promise from 'native-promise-only';
import {
  GITHUB_AUTH_API_URL,
  REDIRECT_URI
} from 'config';

/**
* @return code (string) or null if the code wasn't found
*/
function _parseCode(url) {
  const match = url.match(/\?code=(.*)&state/);
  return match ? match[1] : null;
}

/**
* @return state (string) or null if the state wasn't found
*/
function _parseState(url) {
  const match = url.match(/\&state=(.*)*/);
  return match ? match[1] : null;
}

/**
* @return {boolean}
*/
function _isGitHubPopup() {
  return window.opener ? Boolean(window.opener.isGitHubPopupReferer) : false;
}

/**
* Sets a constiable used to determine if the code is running in the github login popup.
*/
function _setReferer() {
  window.isGitHubPopupReferer = true;
}

/**
* @return {string} popupUrl
*/
function _buildPopupUrl(options) {
  return [
    GITHUB_AUTH_API_URL,
    '?client_id=',
    options.clientId,
    '&redirect_uri=',
    options.redirectUri,
    '&state=',
    options.state,
    '&scope=',
    options.scope
  ].join('');
}

/**
* @return {object} popup
*/
function _openPopupWindow(options) {
  service._setReferer();
  return window.open(service._buildPopupUrl(options), '', 'top=100,left=100,width=500,height=500');
}

/**
* Generate the state token used in the GitHub oauth flow. More
* info: https://developer.github.com/v3/oauth/#web-application-flow
* @return {string} state
*/
function _generateState() {
  return (Math.floor((1 + Math.random()) * 0x10000)) + new Date()
  .getTime()
  .toString(16)
  .substring(1);
}

/**
* @return {string} url
*/
function getUrl() {
  return window.location.href;
}

/**
* Continues the auth flow if the user was redirected by the github popup.
* This function should be called when the page specified as the redirect_uri
* is loaded.
*/
function loginWithGitHubIfRedirectedByPopup() {
  if (service._isGitHubPopup()) {
    return window.opener.oAuthCallbackGitHub(service._parseCode(getUrl()), service._parseState(getUrl()));
  }
}

/**
* @return promise
*/
function openPopup(options) {
  return new Promise((resolve, reject) => {
    const popup = service._openPopupWindow(options);
    window.oAuthCallbackGitHub = function oAuthCallbackGitHub(code, state) {
      if (state === service.state) {
        popup.close();
        resolve(code);
      } else {
        popup.close();
        reject('state mismatch error');
      }
    };
  });
}

const service = {
  state: _generateState(),
  loginWithGitHubIfRedirectedByPopup,
  openPopup,
  _openPopupWindow,
  _buildPopupUrl,
  _setReferer,
  _isGitHubPopup,
  _parseCode,
  _parseState,
  _generateState
};

loginWithGitHubIfRedirectedByPopup();

function login() {
  return service.openPopup({
    clientId: '7284146c5831ac4ec98c',
    redirectUri: REDIRECT_URI,
    state: service.state,
    scope: ''
  });
}

function exchangeToken(code) {
  return {
    oauth2_code: code,
    oauth2_state: service.state,
    oauth2_provider: 'github.com'
  };
}

export function githubSignIn() {
  return (dispatch, state) => {
    return login().then(exchangeToken);
  };
}
