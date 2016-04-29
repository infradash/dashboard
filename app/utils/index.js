export function checkHttpStatus(response) {
  if (response.status < 200 || response.status > 300) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

export function checkResponse(response) {
  if (response.error) {
    throw new Error(response.error);
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
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export function buildUrl(url, values = {}) {
  return url.replace(/\{\{(\w+)\}\}/g, (p, match) => values[match]);
}

export function getProperty(propertyName, object) {
  const parts = propertyName.split('.');
  const length = parts.length;
  let property = object || this;
  for (let i = 0; i < length; i++) {
    property = property[parts[i]];
  }
  return property;
}
