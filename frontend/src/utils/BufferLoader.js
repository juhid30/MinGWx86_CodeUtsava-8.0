// src/utils/BufferLoader.js
export default class BufferLoader {
  constructor(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
  }

  loadBuffer(url, index) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      this.context.decodeAudioData(
        request.response,
        (buffer) => {
          if (!buffer) {
            alert("Error decoding file data: " + url);
            return;
          }
          this.bufferList[index] = buffer;
          if (++this.loadCount === this.urlList.length) {
            this.onload(this.bufferList);
          }
        },
        (error) => {
          console.error("decodeAudioData error", error);
        }
      );
    };

    request.onerror = () => {
      alert("BufferLoader: XHR error");
    };

    request.send();
  }

  load() {
    for (let i = 0; i < this.urlList.length; ++i) {
      this.loadBuffer(this.urlList[i], i);
    }
  }
}
