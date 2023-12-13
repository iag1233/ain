import { recordFn } from "/js/recordButton.js";
import { playFn} from "/js/playButton.js";
import { uploadFn } from "/js/uploadButton.js";
import { v4 as uuidv4 } from '/utils/uuid/v4.js';

class App {

    constructor() {
      this.audio = null;
      this.blob = null;
      this.state = {};
      this.isRecording = false;
      this.playingIntervalId = null;
      if (!localStorage.getItem("uuid")) { // localStoragen gordeta EZ badugu
        localStorage.setItem("uuid", uuidv4()); // uuid-a sortu eta gorde
        this.uuid = localStorage.getItem("uuid"); // localStoragetik uuid-a lortu
      }
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
  
    setState(state) {
        this.state = Object.assign({}, this.state, state);
        this.render();
    }

    render() {
        // Handle UI updates based on the current state
        switch (this.state.status) {
            case 'playing':
                this.renderPlayingState();
                break;
            // Add other cases for different states as needed

            default:
                // Default rendering behavior
                break;
        }
    }

    renderPlayingState() {
        // Update UI for playing state, e.g., show current playback time
        const formattedTime = this.formatTime(this.audio.currentTime);
    const remainingTime = this.formatTime(this.audio.duration - this.audio.currentTime);
    
    console.log(`Current playback time: ${formattedTime}, Remaining time: ${remainingTime}`);
    
    
    }

    formatTime(time) {
        // Helper function to format time (e.g., from seconds to MM:SS)
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        return formattedTime;
    }

    record() {
        // Check if recording is not in progress
        if (!this.isRecording) {
            // Clear the existing audio chunks
            this.audioChunks = [];
    
            this.mediaRecorder.start();
            this.isRecording = true;
            this.setState({ status: 'recording' });
        }
    }
    
    
    stopRecording() {
        // Check if recording is in progress
        if (this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.setState({ status: 'recorded' });
        }
    }
    
    playAudio() {
        // Check if audio is available
        if (this.audio && this.blob) {
            this.audio.play();
            this.setState({ status: 'playing' });
    
            // Start the interval to update the UI with the remaining time
            this.playingIntervalId = setInterval(() => {
                const remainingTime = this.formatTime(this.audio.duration - this.audio.currentTime);
    
                // Update the UI as needed, e.g., display remaining time next to the button
                const liPlayButton = document.getElementById("liPlayButton");
                liPlayButton.innerHTML = `${playFn()} ${remainingTime}`;
    
                // Check if the audio has finished playing
                if (this.audio.currentTime >= this.audio.duration) {
                    clearInterval(this.playingIntervalId);
                    this.setState({ status: 'recorded' });
                }
            }, 1000); // Update every second
        }
    }
    
    // Update the stopAudio method
    stopAudio() {
        // Check if audio is playing
        if (this.audio && !this.audio.paused) {
            this.audio.pause();
            this.audio.currentTime = 0;
    
            // Clear the interval when stopping audio
            clearInterval(this.playingIntervalId);
    
            this.setState({ status: 'recorded' });
        }
    }
    
    upload() {
        this.setState({ uploading: true }); // uneko egoera: uploading
        const body = new FormData(); // FormData bidez audioa zerbitzarira igo ahalko dugu
        body.append("recording", this.blob); // formData-n recording izeneko atributuan gure audioa gorde igotzeko
        fetch("/api/upload/" + this.uuid, {
            method: "POST", // audioa igotzeko POST metodoa erabiliko dugu
            body,
        })
        .then((res) => res.json()) // zerbitzariak audioa jaso ondoren erabiltzaile honek dituen fitxategi guztien zerrenda itzuliko du (bertan igo berri dena barne)
        .then((json) => {
            this.setState({
                files: json.files, // erabiltzailearen fitxategi guztiak
                uploading: false, // uneko egoera eguneratu
                uploaded: true, // uneko egoera eguneratu
                error: false, 
                loading: false,
            });
        })
        .catch((err) => {
            console.error('Error during upload:', err);
            this.setState({ error: true });
        });
    }
    
    deleteFile() {
        // Implement delete functionality based on your requirements
        // For now, log a message to the console
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