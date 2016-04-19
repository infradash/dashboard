export const DATA_REQUEST = 'DATA_REQUEST';
export const DATA_REQUEST_DONE = 'DATA_REQUEST_DONE';

export function dataRequest() {
  return {
    type: DATA_REQUEST,
  };
}

export function dataRequestDone() {
  return {
    type: DATA_REQUEST_DONE,
  };
}
