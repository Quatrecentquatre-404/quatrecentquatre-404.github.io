/* WEBHOOK SENDER */
async function treat_webhook_send(document) {
    const response = charge_webhook(await get_webhook_inputs(document))
    if (response) {
        success_alert("Success !", "The message was sent successfully")
    } else {
        error_alert("Error !", "Unable to charge the webhook")
    }
}

/* TOKENS CHECKER */
async function treat_checker() {
    const tokensArea = document.getElementById("tokens"),
        checkTokensArea = document.getElementById("checked-tokens"),
        ignorification = document.getElementById("ignore-blocked-phone").checked
    tokensArea.setAttribute("disabled", "")
    checkTokensArea.setAttribute("disabled", "")
    let rate_limit = 0
    for (let index = 0; index < tokensArea.value.split("\n").length; index++) {
        const token = tokensArea.value.split("\n")[index].trim()
        get(
            "https://discord.com/api/v8/users/@me/connections",
            {
                Authorization: token,
            },
            async (response) => {
                try {
                    const body = JSON.parse(response.body)
                    if (body.retry_after) {
                        rate_limit = parseInt(body.retry_after * 1001)
                    } else if (
                        (Array.isArray(body) ||
                            (!ignorification &&
                                body.code &&
                                body.code === 40002)) &&
                        !checkTokensArea.innerHTML.includes(token)
                    ) {
                        checkTokensArea.innerHTML += token + "\n"
                    }
                    await sleep(rate_limit)
                } catch (_) {
                    0
                }
            }
        )
    }
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
        post(
            `https://discord.com/api/v8/invites/${url.value.split("/").pop()}`,
            {
                Authorization: token,
            },
            "",
            async (response) => {
                try {
                    const body = JSON.parse(response.body)
                    if (body.retry_after) {
                        rate_limit = parseInt(body.retry_after * 1001)
                    }

                    await sleep(rate_limit)
                } catch (_) {
                    0
                }
            }
        )
    }
    tokensArea.removeAttribute("disabled")
}

/* TOKENS FRIENDS */
async function treat_friends() {
    const tokensArea = document.getElementById("tokens"),
        discordTag = document.getElementById("discord-tag")
    tokensArea.setAttribute("disabled", "")
    let rate_limit = 0
    for (let index = 0; index < tokensArea.value.split(/\n/).length; index++) {
        const token = tokensArea.value.split(/\n/)[index].trim()
        post(
            `https://discord.com/api/v8/users/@me/relationships`,
            {
                Authorization: token,
                "Content-Type": "application/json",
            },
            JSON.stringify({
                username: discordTag.value.split("#")[0],
                discriminator: parseInt(discordTag.value.split("#")[1]),
            }),
            async (response) => {
                try {
                    const body = JSON.parse(response.body)
                    if (body.retry_after) {
                        rate_limit = parseInt(body.retry_after * 1001)
                    }
                    await sleep(rate_limit)
                } catch (_) {
                    0
                }
            }
        )
    }
    tokensArea.removeAttribute("disabled")
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
