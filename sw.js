self.addEventListener("install", (event) => {
    console.log("install", event);
    return self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("activate", event);
    return self.clients.claim();
});


self.addEventListener("fetch", function(event) {
    console.log("fetch", event);
    const {request} = event;

    const filename = "123---ファイル---💧⚡🔥---xxx.txt";
    if (request.url.includes("xxx-0")) {
        const headers = {
            "content-disposition":
                stringToBinaryString(`attachment; filename=${filename}`)
        }
        console.log(byteStringToString(headers["content-disposition"]));
        event.respondWith(new Response("xxx-0", {headers}));
    }
    if (request.url.includes("xxx-1")) {
        const headers = {
            "content-disposition":
                stringToBinaryString(`attachment; filename="${filename}"`)
        }
        console.log(byteStringToString(headers["content-disposition"]));
        event.respondWith(new Response("xxx-2", {headers}));
    }
    if (request.url.includes("xxx-2")) {
        const headers = {
            "content-disposition":
                stringToBinaryString(`attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`)
        }
        console.log(byteStringToString(headers["content-disposition"]));
        event.respondWith(new Response("xxx-2", {headers}));
    }
});

/**
 * Use it, or:
 * Uncaught TypeError: Failed to construct 'Response': Value is not a valid ByteString.
 * (or)
 * Uncaught TypeError: Failed to execute 'append' on 'Headers': String contains non ISO-8859-1 code point.
 */
function stringToBinaryString(str) {
    return arrayBufferToBinaryString(new TextEncoder().encode(str));
}
function arrayBufferToBinaryString(arrayBuffer) {
    return arrayBuffer.reduce((accumulator, byte) => accumulator + String.fromCharCode(byte), "");
}
function byteStringToString(byteString) {
    const chars = [...byteString];
    const bytes = new Uint8Array(chars.map(ch => ch.charCodeAt(0)));
    return new TextDecoder().decode(bytes);
}

