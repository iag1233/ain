import { recordFn, stopFn, uploadFn } from "/js/recordButton.js";

window.onload = function () {
    const liRecordButton = document.getElementById("liRecordButton");
    liRecordButton.innerHTML = recordFn();

    const liStopButton = document.getElementById("liStopButton");
    liStopButton.innerHTML = stopFn();

    const liUploadButton = document.getElementById("liUploadButton");
    liUploadButton.innerHTML = uploadFn();
};

class App {

    constructor() {
      this.audio = null;
      this.blob = null;
      this.state = {};
    }
  
    init() {
    }
  
    initAudio() {
    }
  
    loadBlob() {
    }
  
    initRecord() {
    }
  
    record() {
    }
  
    stopRecording() {
    }
  
    playAudio() {
    }
  
    stopAudio() {
    }
  
    upload() {
    }
  
    deleteFile() {
    }
  }
  
  const app = new App();
  app.init();
