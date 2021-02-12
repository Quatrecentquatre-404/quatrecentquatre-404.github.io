function get(url, headers, callback = () => {}) {
    const request = new XMLHttpRequest()
    request.open("GET", url, true)

    Object.keys(headers).forEach((key) => {
        request.setRequestHeader(key, headers[key])
    })
    request.send(null)

    request.onreadystatechange = () => {
        return callback({
            status: request.status,
            body: request.responseText,
            headers: request.getAllResponseHeaders(),
        })
    }
}

function post(url, headers, body, callback = () => {}) {
    const request = new XMLHttpRequest()
    request.open("POST", url, true)

    Object.keys(headers).forEach((key) => {
        request.setRequestHeader(key, headers[key])
    })
    request.send(body)

    request.onreadystatechange = () => {
        return callback({
            status: request.status,
            body: request.responseText,
            headers: request.getAllResponseHeaders(),
        })
    }
}

function patch(url, headers, body, callback = () => {}) {
    const request = new XMLHttpRequest()
    request.open("PATCH", url, true)

    Object.keys(headers).forEach((key) => {
        request.setRequestHeader(key, headers[key])
    })

    request.send(body)

    request.onreadystatechange = () => {
        return callback({
            status: request.status,
            body: request.responseText,
            headers: request.getAllResponseHeaders(),
        })
    }
}

function r_delete(url, headers, callback = () => {}) {
    const request = new XMLHttpRequest()
    request.open("DELETE", url, true)

    Object.keys(headers).forEach((key) => {
        request.setRequestHeader(key, headers[key])
    })
    request.send(null)

    request.onreadystatechange = () => {
        return callback({
            status: request.status,
            body: request.responseText,
            headers: request.getAllResponseHeaders(),
        })
    }
}

function put(url, headers, body, callback = () => {}) {
    const request = new XMLHttpRequest()
    request.open("PUT", url, true)

    Object.keys(headers).forEach((key) => {
        request.setRequestHeader(key, headers[key])
    })
    request.send(body)

    request.onreadystatechange = () => {
        return callback({
            status: request.status,
            body: request.responseText,
            headers: request.getAllResponseHeaders(),
        })
    }
}

function options(url, headers, body, callback = () => {}) {
    const request = new XMLHttpRequest()
    request.open("OPTIONS", url, true)

    Object.keys(headers).forEach((key) => {
        request.setRequestHeader(key, headers[key])
    })
    request.send(body)

    request.onreadystatechange = () => {
        return callback({
            status: request.status,
            body: request.responseText,
            headers: request.getAllResponseHeaders(),
        })
    }
}
