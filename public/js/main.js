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
  
    loadBlob(blob) {
        if (this.audio) {
            // Set the src attribute of the audio element
            this.audio.src = URL.createObjectURL(blob);
        } else {
            console.error('Audio element is not initialized.');
        }
    }
    
  
    initRecord(stream) {
        // Check if MediaRecorder is supported
    if (typeof MediaRecorder === 'undefined') {
        console.error('MediaRecorder is not supported on this browser.');
        return;
    }

    // Create a new MediaRecorder with the provided stream
    this.mediaRecorder = new MediaRecorder(stream);

    // Initialize audioChunks array
    this.audioChunks = [];

    // Handle ondataavailable event
    this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            this.audioChunks.push(event.data);
        }
    };

    // Handle onstop event
    this.mediaRecorder.onstop = () => {
        // Create a Blob from the recorded audio chunks
        this.blob = new Blob(this.audioChunks, { type: 'audio/wav' });

        // Load the Blob using the loadBlob method
        this.loadBlob(this.blob);
    };
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
