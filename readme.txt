ARIKETAK:

2.1->  Honako botoiak gehitu ditugu:
        <button id="startPauseBtn">Start Recording</button>
        <button id="stopBtn" disabled>Stop Recording</button>
        <button id="uploadBtn" disabled>Upload</button>  
        Uploaden momentuz ezer egin behar ez dugunez, disabled moduan jarri dugu.
        
2.2-> Bigarren honetan, main.js barnean App izeneko klase bat sortu dugu. Bere eraikitzailea:
        constructor() {
                this.audio = null;
                this.blob = null;
                this.state = {};
        }
        

        Eta horrez gain aipatzen diren metodo hutsak gehitu ditugu.

2.3->
