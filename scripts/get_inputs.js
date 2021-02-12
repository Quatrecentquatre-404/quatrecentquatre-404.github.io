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

/* BASE  64 */
function get_base64_inputs(document) {
    return {
        to_encode: document.getElementById("encode-string").value,
        to_decode: document.getElementById("decode-string").value,
    }
}