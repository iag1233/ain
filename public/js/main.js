import { recordFn } from "/js/recordButton.js";
import { stopFn} from "/js/stopButton.js";
import { uploadFn } from "/js/uploadButton.js";

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
       navigator.mediaDevices.getUserMedia({ audio: true })
       .then((stream) => {
           this.initAudio();
           this.initRecord(stream);
       })
       .catch((error) => {
           console.error('Error al obtener permisos para el micrófono:', error);
       });
    }
  
    initAudio() {
      this.audio = new Audio();

        this.audio.onloadedmetadata = () => {
            console.log('onloadedmetadata:', this.audio.duration);
        };

        this.audio.ondurationchange = () => {
            console.log('ondurationchange:', this.audio.duration);
        };

        this.audio.ontimeupdate = () => {
            console.log('ontimeupdate:', this.audio.currentTime);
        };

        this.audio.onended = () => {
            console.log('onended: audioa amaitu da');
        };
    }
  
    loadBlob() {
    }
  
    initRecord(stream) {
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
