import { API_URL } from 'config';

export function checkHttpStatus(response) {
  if (response.status < 200 || response.status > 300) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

export function parseJSON(response) {
  return response.json();
}

export function generateString() {
  const randomNumber = (Math.floor((1 + Math.random()) * 0x10000));
  const hash = new Date().getTime().toString(16).substring(1);
  return randomNumber + hash;
}

export function getUrl() {
  return window.location.href;
}

export function getHeaders(token) {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

export function buildUrl(url, id) {
  return `${API_URL}${url.replace(/\{(.*?)\}/g, id)}`;
}
