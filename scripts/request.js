class Requests {
    constructor() {
        this.get = (url, headers = {}) => {
            return new Promise((resolve, reject) => {
                const r = new XMLHttpRequest()
                r.open("GET", url)
                Object.keys(headers).forEach((key) => {
                    r.setRequestHeader(key, headers[key])
                })
                r.onload = () => {
                    const content = {
                        status: r.status,
                        body: r.responseText,
                        headers: r.getAllResponseHeaders(),
                    }
                    if (199 < r.status < 300) resolve(content)
                    else reject(content)
                }
                r.send(null)
            })
        }

        this.post = (url, headers = {}, body = null) => {
            return new Promise((resolve, reject) => {
                const r = new XMLHttpRequest()
                r.open("POST", url)
                Object.keys(headers).forEach((key) => {
                    r.setRequestHeader(key, headers[key])
                })
                r.onload = () => {
                    const content = {
                        status: r.status,
                        body: r.responseText,
                        headers: r.getAllResponseHeaders(),
                    }
                    if (199 < r.status < 300) resolve(content)
                    else reject(content)
                }
                r.send(body)
            })
        }

        this.patch = (url, headers = {}, body = null) => {
            return new Promise((resolve, reject) => {
                const r = new XMLHttpRequest()
                r.open("PATCH", url)
                Object.keys(headers).forEach((key) => {
                    r.setRequestHeader(key, headers[key])
                })
                r.onload = () => {
                    const content = {
                        status: r.status,
                        body: r.responseText,
                        headers: r.getAllResponseHeaders(),
                    }
                    if (199 < r.status < 300) resolve(content)
                    else reject(content)
                }
                r.send(body)
            })
        }

        this.delete = (url, headers = {}) => {
            return new Promise((resolve, reject) => {
                const r = new XMLHttpRequest()
                r.open("DELETE", url)
                Object.keys(headers).forEach((key) => {
                    r.setRequestHeader(key, headers[key])
                })
                r.onload = () => {
                    const content = {
                        status: r.status,
                        body: r.responseText,
                        headers: r.getAllResponseHeaders(),
                    }
                    if (199 < r.status < 300) resolve(content)
                    else reject(content)
                }
                r.send(null)
            })
        }

        this.put = (url, headers = {}, body = null) => {
            return new Promise((resolve, reject) => {
                const r = new XMLHttpRequest()
                r.open("PUT", url)
                Object.keys(headers).forEach((key) => {
                    r.setRequestHeader(key, headers[key])
                })
                r.onload = () => {
                    const content = {
                        status: r.status,
                        body: r.responseText,
                        headers: r.getAllResponseHeaders(),
                    }
                    if (199 < r.status < 300) resolve(content)
                    else reject(content)
                }
                r.send(body)
            })
        }

        this.options = (url, headers = {}, body = null) => {
            return new Promise((resolve, reject) => {
                const r = new XMLHttpRequest()
                r.open("OPTIONS", url)
                Object.keys(headers).forEach((key) => {
                    r.setRequestHeader(key, headers[key])
                })
                r.onload = () => {
                    const content = {
                        status: r.status,
                        body: r.responseText,
                        headers: r.getAllResponseHeaders(),
                    }
                    if (199 < r.status < 300) resolve(content)
                    else reject(content)
                }
                r.send(body)
            })
        }
    }
}
