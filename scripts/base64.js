function base64_encode(string) {
    return new Promise((resolve, reject) => {
        try {
            return resolve(btoa(string))
        } catch (error) {
            return reject(error)
        }
    })
}

function base64_decode(string) {
    return new Promise((resolve, reject) => {
        try {
            return resolve(atob(string))
        } catch (error) {
            return reject(error)
        }
    })
}
