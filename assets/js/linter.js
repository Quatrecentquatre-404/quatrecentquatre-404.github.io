const keys = {
    keywords: ["BITS", "64", "%include", "section", "global", "0"],
    code: ["hello_world", "db", ".text", "_start", "_STD_PRINTLN", "_STD_EXIT"],
    strings: ["\"./stdlib/core.asm\"", "\"Hello world !\"".replace(/ /g, '&nbsp;')],
    comments: ["; It uses the stdlib I made from scratch with system calls and stack management.".replace(/ /g, '&nbsp;')]
}

/**
 *
 * @param {HTMLParagraphElement} container Paragraph container that contains code.
 */
function lintIt(container) {
    container.innerHTML = container.innerHTML.replace(/ /g, '&nbsp;')
    for (const style of Object.keys(keys)) {
        for (const content of keys[style]) {
            container.innerHTML = container.innerHTML.replace(new RegExp(content, 'g'), `<span class="${style}">${content}</span>`)
        }
    }
}
