ARIKETAK:

2.1 ->  Honako botoiak gehitu ditugu:
        <button id="startPauseBtn">Start Recording</button>
        <button id="stopBtn" disabled>Stop Recording</button>
        <button id="uploadBtn" disabled>Upload</button>  
        Uploaden momentuz ezer egin behar ez dugunez, disabled moduan jarri dugu.
        
2.2 -> Bigarren honetan, main.js barnean App izeneko klase bat sortu dugu. Bere eraikitzailea:
        constructor() {
                this.audio = null;
                this.blob = null;
                this.state = {};
        }
        

        Eta horrez gain aipatzen diren metodo hutsak gehitu ditugu.

2.3 -> public/js barnean botoi bakoitzarentzat .js bat sortu dugu. Bertan sortuko ditugu botoiak dinamikoki (exportatuz). 
      Ondoren, main.js-tik inportatu eta window.onload barnean sorrarazi ditugu dinamikoki.

2.4 -> main.js-ko init metodoa ere bete dugu, getUserMedia bidez, audio:true jarriaz. Horrez gain, honakoa gehitu dugu:
        this.initAudio();
        this.initRecord(stream);
        Audio grabaketa martxan jartzeko.

2.5 -> ariketak.md fitxategian
