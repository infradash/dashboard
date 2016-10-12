export function generateString() {
  const randomNumber = (Math.floor((1 + Math.random()) * 0x10000));
  const hash = new Date()
    .getTime()
    .toString(16)
    .substring(1);
  return randomNumber + hash;
}

export function getWindowLocation() {
  return window.location.href;
}


export function stringCapitalize(str) {
  return (typeof str === 'string') ?
    str.charAt(0).toUpperCase() + str.substr(1).toLowerCase() :
    str;
}