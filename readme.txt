TALDE IZENA: taldea1
EGILEAK: MIKEL MUGICA ARREGUI, ARETZ GURRUCHAGA AYERTZA, IORITZ ARAMENDI GARMENDIA
URL-A: https://ahotsoharrak.ioritz.eus

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

2.6 -> main.js-ko initrecord programatu dugu. Bertan, stream bat jasota, mediarecorder bat sortzeko
        (beti ere nabigatzaileak onartzen badu). Ondoren ondataavailable eta onstop programatu ditugu,
        mediarecorderren funtzio gisan.

2.7 -> audio elementua inizializaturik badago, audio.src-ari parametro gisa jasoriko blobaren url-a 
        ezarriko diogu.

2.8 -> SetState metodoa enuntziatutik txertatu dugu.

2.9 -> switch-case baten bidez, playing egoeran dagoenean, metodo laguntzaile bati egingo zaio deia.
        Bertan, kenketa baten bidez, audioaren iraupena-uneko iraupena eginez, atzera kontaketa hasiko da martxan.

2.10 -> Azkenik, record, stopRecording, playAudio eta stopAudio metodoak inplementatu ditugu, funtziona dezan.



ARIKETAK:

3.4.1 -> navigator-clipboard erabiliaz, portapapelesean kopiatudugu fitxategiaren id-a. Hain zuzen, 
        bere fileName-a. Horretarako honakoa eginez:
        navigator.clipboard.writeText(file.filename)
                    .then(() => {})
        Horrez gain, papel baten ikonoa sortu dugu eta gertaera kudeatzaile bidez, klik egitean exekutatuko da goiko kodea.

3.4.2 -> Bestalde, beste ikono bat sortu dugu, papelera batena hain zuzen eta honen gainean klik egitean, ezabatzeko kodea
        ejekutatuko da. Backendean programatuko dugu

3.4.3 -> eu.js eta moment.js gorde ditugu utils karpetan eta ariketetan zehazturiko kodea kopiatu dugu.
        Bestalde, honako kodea zehaztu dugu:

            const fileDate = new Date(file.date);
            const relativeDate = moment(fileDate).fromNow();
            const formattedTime = moment(fileDate).format('HH:mm:ss');
            const formattedDateTime = `${relativeDate}, ${formattedTime}`;
            listItem.innerHTML += ` ${formattedDateTime} `;

        Honi esker, oraindik hasita atzerantza kontatuko dugu eta eu.js-ko edukia erabiliz sortuko dugu mezua.

ARIKETAK

4.1 ->utils karpetan, snackbar sortu dugu min.css eta min.js fitxategiak eta internetetik kopiatu dugu bertan izan dezakeen kodea. 
        Ariketetan agertzen zen kodea kopiatu dugu index.ejs-n eta main-en eta ondoren honakoa ezarri dugu:

        Snackbar.show('Audioaren esteka ongi kopiatu da');

        Honi esker, klik egitean ikonoaren gainean mezu bat agertuko zaigu snackbar.min.css estiloarekin eta snackbar.min.js erabiliz



AIPATU BEHARRA DUGU GURE FRONTENDEAN BADELA GAUZA BAT ONGI EGITEN EZ DIGUNA. HAIN ZUZEN, AUDIOA ERREPRODUZITZEN HASTEAN, LEHEN ALDIAN,
AUDIOAREN IRAUPENA INFINITY:NaN AGERTZEN ZAIGU. BERRIRO EXEKUTATZEAN ORDEA, IRAUPENA ONGI AGERTZEN DA. 
        
