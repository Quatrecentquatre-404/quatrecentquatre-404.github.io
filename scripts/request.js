async function get(url, headers) {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);

  Object.keys(headers).forEach((key) => {
    request.setRequestHeader(key, headers[key]);
  });

  request.onload = (ev) => {
    return Promise[request.readyState === request.DONE ? "resolve" : "reject"]({
      status: request.status,
      body: request.responseText,
      headers: request.getAllResponseHeaders(),
    });
  };

  request.send(null);
}

async function post(url, headers, body) {
  const request = new XMLHttpRequest();
  request.open("POST", url, true);

  Object.keys(headers).forEach((key) => {
    request.setRequestHeader(key, headers[key]);
  });

  request.onload = (ev) => {
    return Promise[request.readyState === request.DONE ? "resolve" : "reject"]({
      status: request.status,
      body: request.responseText,
      headers: request.getAllResponseHeaders(),
    });
  };

  request.send(body);
}

async function patch(url, headers, body) {
  const request = new XMLHttpRequest();
  request.open("PATCH", url, true);

  Object.keys(headers).forEach((key) => {
    request.setRequestHeader(key, headers[key]);
  });

  request.onload = (ev) => {
    return Promise[request.readyState === request.DONE ? "resolve" : "reject"]({
      status: request.status,
      body: request.responseText,
      headers: request.getAllResponseHeaders(),
    });
  };

  request.send(body);
}

async function r_delete(url, headers) {
  const request = new XMLHttpRequest();
  request.open("DELETE", url, true);

  Object.keys(headers).forEach((key) => {
    request.setRequestHeader(key, headers[key]);
  });

  request.onload = (ev) => {
    return Promise[request.readyState === request.DONE ? "resolve" : "reject"]({
      status: request.status,
      body: request.responseText,
      headers: request.getAllResponseHeaders(),
    });
  };

  request.send(null);
}

async function put(url, headers, body) {
  const request = new XMLHttpRequest();
  request.open("PUT", url, true);

  Object.keys(headers).forEach((key) => {
    request.setRequestHeader(key, headers[key]);
  });

  request.onload = (ev) => {
    return Promise[request.readyState === request.DONE ? "resolve" : "reject"]({
      status: request.status,
      body: request.responseText,
      headers: request.getAllResponseHeaders(),
    });
  };

  request.send(body);
}

async function options(url, headers, body) {
  const request = new XMLHttpRequest();
  request.open("OPTIONS", url, true);

  Object.keys(headers).forEach((key) => {
    request.setRequestHeader(key, headers[key]);
  });

  request.onload = (ev) => {
    return Promise[request.readyState === request.DONE ? "resolve" : "reject"]({
      status: request.status,
      body: request.responseText,
      headers: request.getAllResponseHeaders(),
    });
  };

  request.send(body);
}
