function cookies() {
  const completeCookie = unescape(document.cookie);
  const separateCookies = completeCookie.split(';');
  let cookies = {};
  cookies.errors = [];

  cookies.setCookie = (name, value, months) => {
    let expireDate = new Date();
    expireDate.setMonth(expireDate.getMonth() + months);
    document.cookie = name + '=' + escape(value) + ';' + 'expires=' + expireDate.toUTCString();
  }

  if (completeCookie) {
    for (let current = 0; current < separateCookies.length; current++) {
      let currentCookie = separateCookies[current].split('=', 2);
      try {
        cookies[currentCookie[0].trim()] = parseInt(currentCookie[1]);
      }
      catch (error) {
        cookies.errors.push(error);
      }
    }
  }
  return cookies;
}