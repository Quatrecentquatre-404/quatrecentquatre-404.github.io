class Embed {
    constructor() {
        return this
    }

    setTitle(title = null) {
        if (title) {
            this.title = title
        }
        return this
    }

    setDescription(description = null) {
        if (description) {
            this.description = description
        }
        return this
    }

    setURL(url = null) {
        if (url) {
            this.url = url
        }
        return this
    }

    setColor(color = null) {
        if (color) {
            this.color = color
        }
        return this
    }

    setTimestamp(timestamp = new Date().getTime()) {
        this.timestamp = timestamp
        return this
    }

    setFooter(text = null, icon_url = null) {
        if (text) {
            this.footer = {
                text: text,
                icon_url: icon_url,
            }
        }
        return this
    }

    setThumbnail(url = null) {
        if (url) {
            this.thumbnail = { url: url }
        }
        return this
    }

    setImage(url = null) {
        if (url) {
            this.image = { url: url }
        }
        return this
    }

    setAuthor(name = null, url = null, icon_url = null) {
        if (name) {
            this.author = {
                name: name,
                url: url,
                icon_url: icon_url,
            }
        }
        return this
    }

    addField(name = null, value = null, inline = false) {
        if (name && value) {
            this.fields.push({
                name: name,
                value: value,
                inline: inline,
            })
        }
        return this
    }
}

class Webhook {
    constructor(webhook_id, webhook_token) {
        this.id = webhook_id
        this.token = webhook_token
        this.url = `https://discord.com/api/webhooks/${this.id}/${this.token}`
        this.MessageData = { content: "", embeds: [Embed] }
        this.BasicResponse = this.SendMessageResponse = {
            status_code: 0,
            body: "",
            headers: "",
        }
        this.ProfileResponse = {
            type: 0,
            id: this.id,
            name: "",
            avatar: null,
            channel_id: "",
            guild_id: "",
            application_id: null,
            token: this.token,
        }
        this.ProfileError = { message: "", code: 50027 }
    }

    async send_message(data = this.MessageData) {
        try {
            const response = await post(
                this.url,
                {
                    "Content-Type": "application/json",
                },
                JSON.stringify(data)
            )
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async profile() {
        try {
            const response = await get(this.url, {
                "Content-Type": "application/json",
            })
            console.log(response)
            return Promise.resolve(response.body)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

async function charge_webhook(
    payload = {
        webhook_url: null,
        content: null,
        title: null,
        color: null,
        description: null,
        url: null,
        author_name: null,
        author_icon_url: null,
        author_url: null,
        thumbnail: null,
        image: null,
        footer_text: null,
        footer_icon_url: null,
        timestamp: null,
    }
) {
    const embed = new Embed()
        .setTitle(payload.title)
        .setDescription(payload.description)
        .setTimestamp(payload.timestamp)
        .setImage(payload.image)
        .setThumbnail(payload.thumbnail)
        .setFooter(payload.footer_text, payload.footer_icon_url)
        .setColor(payload.color)
        .setURL(payload.url)
        .setAuthor(
            payload.author_name,
            payload.author_url,
            payload.author_icon_url
        ),
     paths = payload.webhook_url.split("/").filter((e) => e !== "")
    let webhook_id = "",
        webhook_token = ""
    if (paths.length >= 2) {
        webhook_token = paths[paths.length - 1]
        webhook_id = paths[paths.length - 2]
    } else {
        return Promise.reject({
            message: "Invalid Webhook Token",
            code: "50027",
        })
    }

    const webhook = new Webhook(webhook_id, webhook_token)
    try {
        const profile = JSON.parse(await webhook.profile())
        if (profile && profile.id) {
            try {
                const response = await webhook.send_message({
                    content: payload.content,
                    embeds: [embed],
                })
                return Promise.resolve(response)
            } catch (error) {
                return Promise.reject(error)
            }
        }
        return Promise.reject(profile)
    } catch (error) {
        return Promise.reject(error)
    }
}
