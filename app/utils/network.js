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

export function getHeaders(token) {
  return {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}
