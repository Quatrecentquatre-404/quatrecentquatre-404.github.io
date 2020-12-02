/* WEBHOOK SENDER */
async function treat_webhook_send(document) {
    charge_webhook(await get_webhook_inputs(document))
        .then((response) => {
            success_alert("Success !", "The message was sent successfully")
        })
        .catch((error) => {
            let message = ""
            Object.keys(error).forEach((key) => {
                message += `<b>${key}</b> : ${error[key]}<br>`
            })
            error_alert("Error !", message)
        })
}

/* TOKENS CHECKER */
async function treat_checker() {
    const tokensArea = document.getElementById("tokens"),
        valid_tokens = [],
        checkTokensArea = document.getElementById("checked-tokens"),
        ignorification = document.getElementById("ignore-blocked-phone").checked
    tokensArea.setAttribute("disabled", "")
    checkTokensArea.setAttribute("disabled", "")
    let rate_limit = 0
    for (let index = 0; index < tokensArea.value.split(/\n/).length; index++) {
        const token = tokensArea.value.split(/\n/)[index].trim()
        try {
            const response = await get(
                "https://discord.com/api/v8/users/@me/connections",
                {
                    Authorization: token,
                }
            )
            const body = JSON.parse(response.body)
            if (body.retry_after) {
                rate_limit = parseInt(body.retry_after * 1001)
            } else if (Array.isArray(body)) {
                valid_tokens.push(token)
            } else if (!ignorification && body.code && body.code === 40002) {
                valid_tokens.push(token)
            }
            await sleep(rate_limit)
        } catch (error) {
            const body = JSON.parse(error.body)
            if (body.retry_after) {
                rate_limit = parseInt(body.retry_after * 1001)
            } else if (!ignorification && body.code && body.code === 40002) {
                valid_tokens.push(token)
            }
            await sleep(rate_limit)
        }
    }
    valid_tokens.forEach((token, i) => {
        checkTokensArea.innerHTML += `${token}${
            i < valid_tokens.length - 1 ? "\n" : ""
        }`
    })
    tokensArea.removeAttribute("disabled")
    checkTokensArea.removeAttribute("disabled")
}

/* TOKENS JOINER */
async function treat_joiner() {
    const tokensArea = document.getElementById("tokens"),
        url = document.getElementById("discord-server-url")
    tokensArea.setAttribute("disabled", "")
    let rate_limit = 0
    for (let index = 0; index < tokensArea.value.split(/\n/).length; index++) {
        const token = tokensArea.value.split(/\n/)[index].trim()
        try {
            const response = await post(
                `https://discord.com/api/v8/invites/${url.value
                    .split("/")
                    .pop()}`,
                {
                    Authorization: token,
                }
            )
            const body = JSON.parse(response.body)
            if (body.retry_after) {
                rate_limit = parseInt(body.retry_after * 1001)
            }

            await sleep(rate_limit)
        } catch (error) {
            const body = JSON.parse(error.body)
            if (body.retry_after) {
                rate_limit = parseInt(body.retry_after * 1001)
            }
            await sleep(rate_limit)
        }
    }
    tokensArea.removeAttribute("disabled")
}

/* TOKENS FRIENDS */
async function treat_friends() {
    const tokensArea = document.getElementById("tokens"),
        discordTag = document.getElementById("discord-tag")
        console.log(discordTag.value)
    tokensArea.setAttribute("disabled", "")
    let rate_limit = 0
    for (let index = 0; index < tokensArea.value.split(/\n/).length; index++) {
        const token = tokensArea.value.split(/\n/)[index].trim()
        try {
            const response = await post(
                `https://discord.com/api/v8/users/@me/relationships`,
                {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                JSON.stringify({
                    username: discordTag.value.split("#")[0],
                    discriminator: parseInt(discordTag.value.split("#")[1]),
                })
            )
            if (response.body) {
                const body = JSON.parse(response.body)
                if (body.retry_after) {
                    rate_limit = parseInt(body.retry_after * 1001)
                }
            }

            await sleep(rate_limit)
        } catch (error) {
            if (response.body) {
                const body = JSON.parse(error.body)
                if (body.retry_after) {
                    rate_limit = parseInt(body.retry_after * 1001)
                }
            }
            await sleep(rate_limit)
        }
    }
    tokensArea.removeAttribute("disabled")
}

/* RAID */
async function treat_login(document) {
    const tokenArea = document.getElementById("token")
    tokenArea.setAttribute("disabled", "")
    const token = tokenArea.value.trim()
    let rate_limit = 0
    try {
        const body = await client.login(token)
        if (body.retry_after) {
            rate_limit = parseInt(body.retry_after * 1001)
        } else if (Array.isArray(body)) {
            valid_tokens.push(token)
        }
        const { id, username, avatar, discriminator } = body

        if (id) {
            if (avatar) {
                document.getElementById(
                    "avatar"
                ).src = `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp?size=256`
            } else {
                document.getElementById("avatar").src =
                    "https://cdn.discordapp.com/embed/avatars/0.png"
            }
            document.getElementById("id").innerHTML = `Bot's ID : ${id}`
            document.getElementById(
                "username"
            ).innerHTML = `Bot's Username : ${username}`
            document.getElementById(
                "discriminator"
            ).innerHTML = `Bot's Discriminator : #${discriminator}`
            document.getElementById(
                "invitation-url"
            ).innerHTML = `Bot's Invitation URL : <a class="text-info" target="_BLANK" href="https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=8&scope=bot">Click here</a>`
            document.getElementById("settings").removeAttribute("hidden", "")
            Object.keys(body).forEach((key) => {
                client[key] = body[key]
            })
            client.__raid_config = await get_raid_inputs(document)
        } else {
            document.getElementById(
                "avatar"
            ).src = `https://cdn.discordapp.com/embed/avatars/0.png`
            document.getElementById("id").innerHTML = `Bot's ID`
            document.getElementById("username").innerHTML = `Bot's Username`
            document.getElementById(
                "discriminator"
            ).innerHTML = `Bot's Discriminator`
            document.getElementById(
                "invitation-url"
            ).innerHTML = `Bot's Invitation URL`
            document.getElementById("settings").removeAttribute("hidden", "")
            let message = ""
            Object.keys(body).forEach((key) => {
                message += `<b>${key}</b> : ${body[key]}<br>`
            })
            error_alert("Error !", message)
            document.getElementById("settings").setAttribute("hidden", "")
        }
        await sleep(rate_limit)
    } catch (error) {
        const body = error.body
        if (body.retry_after) {
            rate_limit = parseInt(body.retry_after * 1001)
        }
        document.getElementById("settings").setAttribute("hidden", "")
        await sleep(rate_limit)
    }
    tokenArea.removeAttribute("disabled")
}

async function treat_start_raid(document) {
    client.__handle_raid = !client.__handle_raid
    client.launch_raid()
}

/* BASE 64 */
async function treat_base64_encode(document) {
    const string = get_base64_inputs(document).to_encode
    base64_encode(string)
        .then((encoded_string) => {
            document.getElementById("encode-string").value = encoded_string
        })
        .catch((error) => {
            error_alert("Error !", error)
        })
}

async function treat_base64_decode(document) {
    const string = await get_base64_inputs(document).to_decode

    base64_decode(string)
        .then((decoded_string) => {
            document.getElementById("decode-string").value = decoded_string
        })
        .catch((error) => {
            error_alert("Error !", error)
        })
}
