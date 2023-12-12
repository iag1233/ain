/**const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
const audioUrl = URL.createObjectURL(audioBlob);
const audioPlayer = document.getElementById('audioPlayer');
audioPlayer.src = audioUrl;*/


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
  
  const app = new Sortu();
  app.init();
