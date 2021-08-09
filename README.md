# content-disposition-by-sw



It's the demo site where Service Worker returns a responce with set Content-Disposition header with non ASCII characters (`"123---ファイル---💧⚡🔥---xxx.txt"`) for the requests are performed
on https://alttiri.github.io/content-disposition-by-sw/
to `./xxx-0`, `./xxx-1`, `./xxx-2` URLs.

Note: Due to Chromium's bug it's not possible to correctly set [Binary String](https://developer.mozilla.org/en-US/docs/Web/API/DOMString/Binary)
([ByteString](https://developer.mozilla.org/en-US/docs/Web/API/ByteString)) as a header value in Service Worker.

**Use Firefox for this demo.**
