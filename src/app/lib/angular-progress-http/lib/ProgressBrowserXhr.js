"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProgressBrowserXhr = /** @class */ (function () {
    function ProgressBrowserXhr(browserXhr, upload, download) {
        if (upload === void 0) { upload = null; }
        if (download === void 0) { download = null; }
        this.browserXhr = browserXhr;
        this.upload = upload;
        this.download = download;
    }
    ProgressBrowserXhr.prototype.build = function () {
        var xhr = this.browserXhr.build();
        if (this.upload) {
            xhr.upload.addEventListener("progress", this.createProgressListener(this.upload));
        }
        if (this.download) {
            xhr.addEventListener("progress", this.createProgressListener(this.download));
        }
        return xhr;
    };
    ProgressBrowserXhr.prototype.createProgressListener = function (listener) {
        return function (event) {
            var decompressedContentLength = event.target.getResponseHeader ? parseInt(event.target.getResponseHeader('x-decompressed-content-length')) : null;
            var progress = {
                event: event,
                lengthComputable: decompressedContentLength ? event.lengthComputable : true,
                loaded: event.loaded
            };
            if(decompressedContentLength){
                progress.total = decompressedContentLength;
                progress.percentage = Math.round((event.loaded * 100 / progress.total));
            } else if (event.lengthComputable) {
                progress.total = event.total;
                progress.percentage = Math.round((event.loaded * 100 / event.total));
            }
            listener(progress);
        };
    };
    return ProgressBrowserXhr;
}());
exports.ProgressBrowserXhr = ProgressBrowserXhr;
