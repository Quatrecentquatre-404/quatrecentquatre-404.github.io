let counters = []

function sleep(ms) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(true) || rej(false)
        }, ms)
    })
}

async function error_alert(title, message) {
    counters.push(counters.length <= 0 ? 0 : counters[counters.length - 1] + 1)
    const id = `alert-${counters[counters.length - 1]}`
    const div = `
        <li id="${id}"><div role="alert">
            <h1 class="text-light">${title}</h1>
            <p>${message}</p>
        </div></li>`
    document.getElementById("alerts").innerHTML += div
    const alert = document.getElementById(id)
    alert.classList = "handler-alert danger-alert transition-fade-in text-light"

    await sleep(3000)
    alert.classList = "handler-alert danger-alert transition-fade-out text-light"

    await sleep(300 * 2 + 3000)
    alert.remove()
}

async function success_alert(title, message) {
    counters.push(counters.length <= 0 ? 0 : counters[counters.length - 1] + 1)
    const id = `alert-${counters[counters.length - 1]}`
    const div = `
        <li id="${id}"><div role="alert">
            <h1 class="text-light">${title}</h1>
            <p>${message}</p>
        </div></li>`
    document.getElementById("alerts").innerHTML += div
    const alert = document.getElementById(id)
    alert.classList = "handler-alert success-alert transition-fade-in text-light"

    await sleep(3000)
    alert.classList = "handler-alert success-alert transition-fade-out text-light"

    await sleep(300 * 2 + 3000)
    alert.remove()
}

window.onload = () => {
    const ul = `<ul id="alerts"></ul>`
    document.body.innerHTML += ul
}
