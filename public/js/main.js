import { recordFn } from "/js/recordButton.js";
import { playFn} from "/js/playButton.js";
import { uploadFn } from "/js/uploadButton.js";


class App {

    constructor() {
      this.audio = null;
      this.blob = null;
      this.state = {};
      this.isRecording = false;
      this.playingIntervalId = null;
    }
  
    toggleRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.record();
        }
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
            this.audio.src = URL.createObjectURL(blob);
        } else {
            console.error('Audio elementua ez dago sorturik');
        }
    }
    
  
    initRecord(stream) {
    if (typeof MediaRecorder === 'undefined') {
        console.error('MediaRecorder ez da onartzen');
        return;
    }
    this.mediaRecorder = new MediaRecorder(stream);
    this.audioChunks = [];


    this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            this.audioChunks.push(event.data);
        }
    };

    this.mediaRecorder.onstop = () => {
        this.blob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.loadBlob(this.blob);
    };
    }
  
    setState(state) {
        this.state = Object.assign({}, this.state, state);
        this.render();
    }

    render() {
        switch (this.state.status) {
            case 'playing':
                this.renderPlayingState();
                break;
            default:
                break;
        }
    }

    renderPlayingState() {
        const formattedTime = this.formatTime(this.audio.currentTime);
        const remainingTime = this.formatTime(this.audio.duration - this.audio.currentTime);
        console.log(`Current playback time: ${formattedTime}, Remaining time: ${remainingTime}`);
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        return formattedTime;
    }

    record() {
        if (!this.isRecording) {
            this.audioChunks = [];
            this.mediaRecorder.start();
            this.isRecording = true;
            this.setState({ status: 'recording' });
        }
    }
    
    
    stopRecording() {
        if (this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.setState({ status: 'recorded' });
        }
    }
    
    playAudio() {
        if (this.audio && this.blob) {
            this.audio.play();
            this.setState({ status: 'playing' });
            this.playingIntervalId = setInterval(() => {
                const remainingTime = this.formatTime(this.audio.duration - this.audio.currentTime);
                const liPlayButton = document.getElementById("liPlayButton");
                liPlayButton.innerHTML = `${playFn()} ${remainingTime}`;
                if (this.audio.currentTime >= this.audio.duration) {
                    clearInterval(this.playingIntervalId);
                    this.setState({ status: 'recorded' });
                }
            }, 1000);
        }
    }
    
    stopAudio() {
        if (this.audio && !this.audio.paused) {
            this.audio.pause();
            this.audio.currentTime = 0;
            clearInterval(this.playingIntervalId);
    
            this.setState({ status: 'recorded' });
        }
    }
    
    upload() {
        console.log('File uploaded.');
        this.setState({ status: 'uploaded' });
    }
    
    deleteFile() {
        console.log('File deleted.');
        this.setState({ status: 'deleted' });
    }
  }
  
  const app = new App();
  app.init();


  window.onload = function () {
    const liRecordButton = document.getElementById("liRecordButton");
    liRecordButton.innerHTML = recordFn(app.isRecording);

    liRecordButton.addEventListener('click', () => {
        app.toggleRecording();
        // Update the innerHTML of the Record button based on the recording state
        liRecordButton.innerHTML = recordFn(app.isRecording);
    });

    const liPlayButton = document.getElementById("liPlayButton");
    liPlayButton.innerHTML = playFn();

    liPlayButton.addEventListener('click', () => {
        app.playAudio();
    });

    const liUploadButton = document.getElementById("liUploadButton");
    liUploadButton.innerHTML = uploadFn();

    liUploadButton.addEventListener('click', () => {
        app.upload();
    });
};