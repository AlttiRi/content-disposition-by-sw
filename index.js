async function registerSW() {
    try {
        const registration = await navigator.serviceWorker.register("./sw.js");
    } catch (e) {
        console.error(e);
    }

}
registerSW().then();


// --- Utils --- //

/* Using:
const cd = response.headers.get("content-disposition");
const name = contentDispositionFilename(cd);
 */
// RFC 5987:
// [1] inline; filename="file.jpg"; filename*=UTF-8''file.jpg
// Quoted:
// [2] inline; filename="file.jpg"
// Without quotes:
// [3] attachment; filename=file.jpg
//
// `filename=` in rare cases may be also encoded as URIComponent
function contentDispositionFilename(headerByteString, decode = false) {
    if (!headerByteString) {
        return;
    }

    const headerString = byteStringToString(headerByteString);
    if (headerString !== headerByteString) { // just debug
        console.log("contentDispositionHeaderByteString: ", headerByteString);
        console.log("contentDispositionHeaderString: ", headerString);
    }

    let result;
    const encodedFilename = headerString.match(/(?<=filename\*=UTF-8'')[^;]+(?=;?$)/)?.[0]; // [1]
    if (encodedFilename) {
        result = decodeURIComponent(encodedFilename);
    } else {
        const filename = headerString.match(/(?<=filename=").+(?="$)/)?.[0] // [2]
                      || headerString.match(/(?<=filename=).+$/)[0];        // [3]

        if (decode) {
            result = decodeURIComponent(filename);
        } else {
            result = filename;
        }
    }
    console.log("contentDispositionFilename: ", result);

    return result;
}
function byteStringToString(byteString) {
    const chars = [...byteString];
    const isBinaryString = chars.every(ch => ch.charCodeAt(0) < 256);
    if (isBinaryString) {
        console.log("isBinaryString", isBinaryString);
        const isASCII = chars.every(ch => ch.charCodeAt(0) < 128);
        if (isASCII) {
            console.log("isASCII", isBinaryString);
            return byteString; // not required, you can safely decode it as utf8
        }
        const bytes = new Uint8Array(chars.map(ch => ch.charCodeAt(0)));
        return new TextDecoder().decode(bytes);
    }
    return byteString;
}

function byteStringToStringSimplified(byteString) {
    const chars = [...byteString];
    const bytes = new Uint8Array(chars.map(ch => ch.charCodeAt(0)));
    return new TextDecoder().decode(bytes);
}


function stringToBinaryString(str) {
    return arrayBufferToBinaryString(new TextEncoder().encode(str));
}
function arrayBufferToBinaryString(arrayBuffer) {
    return arrayBuffer.reduce((accumulator, byte) => accumulator + String.fromCharCode(byte), "");
}
