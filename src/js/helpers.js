export function setUrlParam(name, value) {

  const url = new URL(window.location.href);

  if (value) {
    url.searchParams.set(name, 1);
  } else {
    url.searchParams.delete(name);
  }

  window.history.replaceState({}, null, url.href);
}

export function getUrlParam(name) {
  const url = new URL(window.location.href);

  return url.searchParams.has(name);
}