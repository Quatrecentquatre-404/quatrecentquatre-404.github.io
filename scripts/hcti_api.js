const API_KEYS = {
    "user_id": "932171fa-5f88-4715-9ed6-d4b8d02d14f0",
    "api_key": "0fb2f4d3-74cb-4ff7-8335-f329b49e999f"
}
const api_url = "https://hcti.io/v1/image"

function generate_image(html, css) {
    return new Promise((resolve, reject) => {
        post(api_url, {
            "Authorization": `Basic ${btoa(`${API_KEYS.user_id}:${API_KEYS.api_key}`)}`
        }, {
            html: html,
            css: css
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}