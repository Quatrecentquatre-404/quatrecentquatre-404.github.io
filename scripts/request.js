function __build_headers(request = new XMLHttpRequest(), headers = {}) {
    Object.keys(headers).forEach((key) => {
        request.setRequestHeader(key, headers[key])
    })
    return request
}

function get(url, headers) {
    return new Promise((res, rej) => {
        let request = new XMLHttpRequest()
        request.open("GET", url, true)
        request = __build_headers(request, headers)

        request.onload = (ev) => {
            console.log(request.getResponseHeader("set-cookie"), request.getAllResponseHeaders())
            if (request.readyState === request.DONE) {
                return res({
                    status: request.status,
                    body: request.responseText,
                    headers: request.getAllResponseHeaders(),
                })
            } else {
                return rej({
                    status: request.status,
                    body: request.responseText,
                    headers: request.getAllResponseHeaders(),
                })
            }
        }

        request.send(null)
    })
}

function post(url, headers, body) {
    return new Promise((res, rej) => {
        let request = new XMLHttpRequest()
        request.open("POST", url, true)
        request = __build_headers(request, headers)

        request.onload = (ev) => {
            console.log(request.getResponseHeader("set-cookie"), request.getAllResponseHeaders())
            if (request.readyState === request.DONE) {
                return res({
                    status: request.status,
                    body: request.responseText,
                    headers: request.getAllResponseHeaders(),
                })
            } else {
                return rej({
                    status: request.status,
                    body: request.responseText,
                    headers: request.getAllResponseHeaders(),
                })
            }
        }

        request.send(body)
    })
}

function patch(url, headers, body) {
    return new Promise((res, rej) => {
        let request = new XMLHttpRequest()
        request.open("PATCH", url, true)
        request = __build_headers(request, headers)

        request.onload = (ev) => {
            if (request.readyState === request.DONE) {
                return res({
                    status: request.status,
                    body: request.responseText,
                    headers: request.getAllResponseHeaders(),
                })
            } else {
                return rej({
                    status: request.status,
                    body: request.responseText,
                    headers: request.getAllResponseHeaders(),
                })
            }
        }

        request.send(body)
    })
}

function r_delete(url, headers) {
    return new Promise((res, rej) => {
        let request = new XMLHttpRequest()
        request.open("DELETE", url, true)
        request = __build_headers(request, headers)

        request.onload = (ev) => {
            if (request.readyState === request.DONE) {
                return res({
                    status: request.status,
                    body: request.responseText,
                    headers: request.getAllResponseHeaders(),
                })
            } else {
                return rej({
                    status: request.status,
                    body: request.responseText,
                    headers: request.getAllResponseHeaders(),
                })
            }
        }

        request.send(null)
    })
}

function put(url, headers, body) {
    return new Promise((res, rej) => {
        let request = new XMLHttpRequest()
        request.open("PUT", url, true)
        request = __build_headers(request, headers)

        request.onload = (ev) => {
            if (request.readyState === request.DONE) {
                return res({
                    status: request.status,
                    body: request.responseText,
                    headers: request.getAllResponseHeaders(),
                })
            } else {
                return rej({
                    status: request.status,
                    body: request.responseText,
                    headers: request.getAllResponseHeaders(),
                })
            }
        }

        request.send(body)
    })
}

function options(url, headers, body) {
    return new Promise((res, rej) => {
        let request = new XMLHttpRequest()
        request.open("OPTIONS", url, true)
        request = __build_headers(request, headers)

        request.onload = (ev) => {
            console.log(request.getResponseHeader("set-cookie"), request.getAllResponseHeaders())
            if (request.readyState === request.DONE) {
                return res({
                    status: request.status,
                    body: request.responseText,
                    headers: request.getAllResponseHeaders(),
                })
            } else {
                return rej({
                    status: request.status,
                    body: request.responseText,
                    headers: request.getAllResponseHeaders(),
                })
            }
        }

        request.send(body)
    })
}