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

    send_message(data = this.MessageData) {
        return post(
            this.url,
            {
                "Content-Type": "application/json",
            },
            JSON.stringify(data),
            (response) => response
        )
    }

    profile() {
        return get(
            this.url,
            {
                "Content-Type": "application/json",
            },
            (response) => response
        )
    }
}
