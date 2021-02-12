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
