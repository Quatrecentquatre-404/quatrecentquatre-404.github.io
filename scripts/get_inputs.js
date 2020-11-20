/* WEBHOOK SENDER */
async function get_webhook_inputs(document) {
    return {
        webhook_url: document.getElementById("webhook-url").value || null,
        content: document.getElementById("content").value || null,
        title: document.getElementById("embed-title").value || null,
        color:
            parseInt(
                Number(
                    document
                        .getElementById("embed-color")
                        .value.replace("#", "0x")
                ),
                10
            ) || null,
        description: document.getElementById("embed-description").value || null,
        url: document.getElementById("embed-url").value || null,
        author_name: document.getElementById("embed-author-name").value || null,
        author_icon_url:
            document.getElementById("embed-author-icon_url").value || null,
        author_url: document.getElementById("embed-author-url").value || null,
        thumbnail: document.getElementById("embed-thumbnail-url").value || null,
        image: document.getElementById("embed-image-url").value || null,
        footer_text: document.getElementById("embed-footer-text").value || null,
        footer_icon_url:
            document.getElementById("embed-footer-icon_url").value || null,
        timestamp: document.getElementById("embed-timestamp").value || null,
    }
}

/* RAID */
async function get_raid_inputs(document) {
    return {
        guild_id: document.getElementById("gulid-id").value || null,
        raid_config: {
            guild: {
                change_guild_name: document.getElementById("change-guild-name").checked || false,
                new_guild_name: document.getElementById("new-guild-name").value || "RAID BY ...",
                remove_invitations: document.getElementById("remove-invitations").checked || false,
            },
            channels: {
                remove_channels: document.getElementById("remove-channels").checked || false,
                create_new_channels: document.getElementById("create-new-channels").checked || false,
                new_channels_name: document.getElementById("new-channels-name").value || "RAID BY ...",
                spamming: {
                    enabled: document.getElementById("spamming-enabled").checked || false,
                    message: document.getElementById("spamming-message").value || "@everyone",
                    delay_in_ms: parseInt(document.getElementById("spamming-message").value) || 500,
                    use_webhooks: document.getElementById("spamming-use-webhooks").checked || false,
                    webhooks_name: document.getElementById("spamming-webhooks-name").value || "Spidey Bot",
                },
            },
            roles: {
                remove_roles: document.getElementById("remove-roles").checked || false,
                create_new_roles: document.getElementById("create-new-roles").checked || false,
                new_roles_name: document.getElementById("new-roles-name").value || "RAID BY ...",
                hex_color: parseInt(
                    Number(
                        document
                            .getElementById("hex-color")
                            .value.replace("#", "0x")
                    ),
                    10
                ) || 0xffffee,
                set_role: document.getElementById("set-roles").checked || false,
            },
            members: {
                rename_members: document.getElementById("rename-members").checked || false,
                ban_all_members: document.getElementById("ban-all-members").checked || false,
                new_members_name: document.getElementById("new-members-name").value || "RAID BY ...",
                remove_roles: document.getElementById("remove-roles").checked || false,
            },
            webhooks: {
                remove_webhooks: document.getElementById("remove-webhooks").checked || false,
                rename_webhooks: document.getElementById("rename-webhooks").checked || false,
                new_webhooks_name: document.getElementById("new-webhooks-name").value || "RAID BY ...",
            },
        },
    }
}

/* BASE  64 */
function get_base64_inputs(document) {
    return {
        to_encode: document.getElementById("encode-string").value,
        to_decode: document.getElementById("decode-string").value,
    }
}