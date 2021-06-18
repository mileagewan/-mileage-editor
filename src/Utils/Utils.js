
const setAttributes = (element, p = {}) => {
  for (let k in p) {
    element.setAttribute(k, p[k]);
  }
};
export const getSources = () => {
  let nt = {};
  return function getSource (t) {
    return Promise.all(t.map(t => {
      if ('string' === typeof t) {
        t = {
          url: t,
          type: t.match(/\.css$/) ? "css" : "js"
        };
        if (nt[t.url]) {
          return nt[t.url];
        }
      }
      let e = new Promise((r, j) => {
        let element;
        if (t.type === 'js') {
          element = document.createElement('script');
          setAttributes(element, {
            src: t.url,
            async: false,
          });
          element.onload = () => {
            r(true)
          };
          element.onerror = () => {
            j(false)
          }
        } else if (t.type === 'css') {
          element = document.createElement('link');
          setAttributes(element, {
            rel: 'stylesheet',
            href: t.url,

          });
          element.onload = () => {
            r(true)
          };
          element.onerror = () => {
            j(false)
          }
        } else {
          element = document.createElement('div');
        }
        document.body.appendChild(element);
      });
      nt[t.url] = e;
      return e;
    }))

  }
};