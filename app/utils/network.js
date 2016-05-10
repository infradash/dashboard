export function checkHttpStatus(response) {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.statusText);
  }
  return response;
}

export function checkResponse(response) {
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
}

export function getAuthHeaders(token = '') {
  return {
    Authorization: `Bearer ${token}`,
  };
}
