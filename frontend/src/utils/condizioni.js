/**
 * Schede informative sulle condizioni del neurosviluppo, del linguaggio, del movimento e genetiche.
 * Ogni scheda ha la stessa struttura, cosi' la pagina di dettaglio le mostra tutte allo stesso modo.
 * Le frasi con cifre o criteri diagnostici vengono dalle fonti elencate in fonti.js.
 * Il testo e' informativo: non fa diagnosi e non sostituisce il parere di un medico.
 *
 * Campi di ogni condizione:
 *  id, categoria, nome, sintesi
 *  cosaE:       paragrafi che spiegano cos'e'
 *  comune:      quanto e' frequente (o null se le fonti non danno una cifra)
 *  segnali:     gruppi { titolo, voci[] }
 *  cosaNonE:    idee sbagliate da chiarire
 *  valutazione: paragrafi su come si arriva a una diagnosi
 *  cosaAiuta:   voci su cosa puo' aiutare
 *  quando:      voci su quando parlarne con il pediatra
 *  fonti:       chiavi di fonti.js
 */

export const CATEGORIE_CONDIZIONI = [
  { id: 'sviluppo', nome: 'Sviluppo e comportamento', testo: 'Come il bambino comunica, si concentra e si relaziona.' },
  { id: 'apprendimento', nome: 'Apprendimento', testo: 'Difficoltà nello studio o nella comprensione.' },
  { id: 'linguaggio', nome: 'Linguaggio, voce e udito', testo: 'Come il bambino capisce e produce le parole.' },
  { id: 'movimento', nome: 'Movimento', testo: 'Coordinazione e controllo del corpo.' },
  { id: 'genetiche', nome: 'Condizioni genetiche', testo: 'Presenti dalla nascita e legate ai geni.' },
]

export const CONDIZIONI = [
  // ------------------------------------------------------------------------------------ AUTISMO
  {
    id: 'autismo',
    categoria: 'sviluppo',
    nome: 'Autismo (disturbo dello spettro autistico)',
    sintesi: 'Cambia il modo di comunicare, di relazionarsi e di vivere suoni, luci e cambiamenti.',
    cosaE: [
      'L’autismo, in medicina “disturbo dello spettro autistico”, è una condizione del neurosviluppo: dipende da differenze nel modo in cui si sviluppa il cervello. Le persone autistiche possono comportarsi, comunicare, relazionarsi e imparare in modo diverso dagli altri.',
      'Si parla di spettro perché da persona a persona cambia moltissimo. C’è chi parla poco o niente e ha bisogno di molto sostegno, e chi ha un linguaggio ricco e vive in autonomia. Anche il livello di abilità intellettiva è molto variabile.',
      'Non esiste una causa unica. Secondo l’Istituto Superiore di Sanità contribuiscono fattori genetici e ambientali che agiscono nelle prime fasi dello sviluppo del cervello.',
    ],
    comune:
      'Lo studio ISS ASDEU stima che circa l’1,35% dei bambini italiani tra 7 e 9 anni sia nello spettro. Altre stime regionali (Piemonte ed Emilia-Romagna, 2021) indicano lo 0,7-0,8% tra 0 e 17 anni. Le stime cambiano da studio a studio. È circa tre volte più frequente nei maschi che nelle femmine, ma nelle bambine può passare più inosservata.',
    segnali: [
      {
        titolo: 'Nel primo anno',
        voci: [
          'A 9 mesi non risponde quando viene chiamato per nome.',
          'A 9 mesi mostra poche espressioni del viso, come felice, triste, arrabbiato o sorpreso.',
          'A 12 mesi non gioca a giochi semplici di scambio, come “batti batti le manine”.',
          'A 12 mesi usa pochi gesti o nessuno, per esempio non saluta con la mano.',
        ],
      },
      {
        titolo: 'Dal secondo al quinto anno',
        voci: [
          'A 15 mesi non condivide i suoi interessi, per esempio non ti mostra un oggetto che gli piace.',
          'A 18 mesi non indica per farti vedere qualcosa di interessante.',
          'A 24 mesi non si accorge quando qualcuno si fa male o è triste.',
          'A 36 mesi non nota gli altri bambini e non si unisce ai loro giochi.',
          'A 48 mesi non fa finta di essere qualcun altro, come una maestra o un supereroe.',
          'A 60 mesi non canta, non balla e non recita per te.',
        ],
      },
      {
        titolo: 'Comportamenti e interessi',
        voci: [
          'Mette in fila i giocattoli o gli oggetti e si agita se l’ordine cambia.',
          'Ripete parole o frasi più e più volte (ecolalia).',
          'Gioca sempre con i giocattoli allo stesso modo.',
          'Si concentra su una parte dell’oggetto, per esempio le ruote.',
          'Si agita per cambiamenti anche piccoli e ha bisogno di routine precise.',
          'Ha interessi molto intensi su un solo argomento.',
          'Batte le mani, dondola il corpo o gira su sé stesso.',
        ],
      },
      {
        titolo: 'Sensi: suoni, luci, odori, tatto, cibo',
        voci: [
          'Reagisce molto forte, oppure per niente, a luci, suoni, odori, sapori o tessuti.',
          'Non sopporta stanze molto luminose o rumorose.',
          'Non vuole indossare certi vestiti o certi materiali.',
          'Mangia solo certi cibi, o solo in un certo modo, e può non sopportare cibi di certe consistenze.',
        ],
      },
      {
        titolo: 'Nei bambini più grandi',
        voci: [
          'Ha pochi amici stretti e trascorre più tempo da solo.',
          'Dice o fa cose che sembrano scortesi senza volerlo.',
          'Parla in modo formale o con un vocabolario molto avanzato.',
          'Fa fatica a capire cosa intendono davvero gli altri.',
          'Ha bisogno che le regole siano rispettate e si agita se gli altri non le seguono.',
          'Ha rituali che rendono difficili le attività di ogni giorno.',
        ],
      },
      {
        titolo: 'Un’attenzione in più per le bambine',
        voci: [
          'Le bambine possono copiare come giocano e si comportano le altre e restare in silenzio nelle situazioni difficili. Per questo i segnali sono a volte meno evidenti, e la diagnosi può arrivare più tardi.',
        ],
      },
    ],
    cosaNonE: [
      'Non è causato dai vaccini. L’ISS riporta che non ci sono prove di un legame tra il vaccino contro morbillo, parotite e rosolia e l’autismo, né tra altri vaccini dell’infanzia e l’autismo.',
      'Non è colpa dei genitori e non dipende da come si cresce un figlio.',
      'Non è una malattia da “guarire”: gli interventi servono a ridurre le difficoltà della vita quotidiana e a migliorare la qualità di vita.',
      'Non tutti i bambini autistici mostrano gli stessi segni. Un bambino può non averne nemmeno uno di quelli elencati, e alcuni bambini non autistici ne hanno qualcuno.',
    ],
    valutazione: [
      'Non esiste un esame del sangue o una scansione che dica se un bambino è autistico. I professionisti osservano il comportamento e lo sviluppo del bambino e parlano con la famiglia.',
      'Secondo il CDC, a volte l’autismo si può riconoscere già a 18 mesi o prima, e a 2 anni una diagnosi fatta da un professionista esperto è considerata affidabile. L’ISS scrive che di solito è possibile entro i 2 anni. Molti bambini però ricevono la diagnosi molto più tardi.',
      'In Italia il percorso di solito parte dal pediatra, che può indirizzare al servizio di neuropsichiatria infantile della ASL. La legge 134/2015 prevede diagnosi precoce, cura e trattamento personalizzato tra i servizi garantiti dal sistema sanitario (i livelli essenziali di assistenza) e affida all’ISS le linee guida.',
    ],
    cosaAiuta: [
      'Gli interventi precoci possono migliorare molto lo sviluppo del bambino. Si fanno anche prima di una diagnosi formale.',
      'I piani sono personalizzati e coinvolgono più professionisti, per esempio neuropsichiatra, logopedista e psicologo.',
      'I genitori hanno un ruolo essenziale: garantiscono l’accesso ai servizi sanitari e scolastici e possono mettere in pratica interventi psicologici e comportamentali.',
      'I farmaci non curano l’autismo. La linea guida ISS dice che vanno limitati alla gestione dei sintomi associati quando gli interventi non farmacologici non bastano, per il tempo necessario e con controlli periodici.',
    ],
    quando: [
      'Se il bambino perde parole o abilità che prima aveva, a qualsiasi età: parlane subito con il pediatra.',
      'Se noti più segnali tra quelli elencati, o semplicemente hai un dubbio. Non serve aspettare che “passi”.',
      'Porta degli esempi precisi. Gli eventi del diario sensoriale aiutano molto.',
    ],
    fonti: ['issAutismo', 'issLineaGuida', 'camera134', 'cdcAutismoSegni', 'cdcAutismo', 'nhsAutismo'],
  },

  // ------------------------------------------------------------------------------------ ADHD
  {
    id: 'adhd',
    categoria: 'sviluppo',
    nome: 'ADHD (deficit di attenzione e iperattività)',
    sintesi: 'Difficoltà a mantenere l’attenzione, a controllare gli impulsi e a stare fermo.',
    cosaE: [
      'L’ADHD è uno dei disturbi del neurosviluppo più comuni dell’infanzia. I bambini con ADHD possono avere difficoltà a prestare attenzione, a controllare gli impulsi o a essere molto attivi. Di solito si riconosce da bambini e spesso continua anche da adulti.',
      'Distrarsi, muoversi tanto e agire d’impulso fa parte della crescita di tutti i bambini. Si parla di ADHD quando i sintomi durano nel tempo, sono intensi e creano difficoltà a scuola, a casa o con gli amici.',
      'Ne esistono tre forme: con prevalenza di disattenzione, con prevalenza di iperattività e impulsività, oppure combinata, in cui i due gruppi di sintomi sono presenti in modo simile.',
    ],
    comune: null,
    segnali: [
      {
        titolo: 'Disattenzione',
        voci: [
          'Sogna molto a occhi aperti.',
          'Dimentica o perde spesso le cose.',
          'Fa errori di distrazione e fatica a fare attenzione ai dettagli.',
          'Ha difficoltà a organizzare e a finire i compiti.',
          'Si distrae facilmente e sembra non ascoltare quando gli si parla.',
          'Dimentica i dettagli della routine quotidiana.',
        ],
      },
      {
        titolo: 'Iperattività',
        voci: [
          'Si agita e si contorce sulla sedia.',
          'Parla troppo.',
          'Fa fatica a restare seduto a lungo.',
          'I più piccoli corrono, saltano o si arrampicano in continuazione.',
        ],
      },
      {
        titolo: 'Impulsività',
        voci: [
          'Ha difficoltà a resistere alle tentazioni.',
          'Fa fatica ad aspettare il proprio turno.',
          'Risponde prima di aver sentito tutta la domanda, interrompe, strappa le cose di mano.',
          'Rischia di più, e ha più incidenti e infortuni.',
          'Ha difficoltà ad andare d’accordo con gli altri bambini.',
        ],
      },
    ],
    cosaNonE: [
      'Non è pigrizia né maleducazione.',
      'Non ha una causa sola e certa. I geni hanno un ruolo importante. Tra i fattori di rischio ci sono l’esposizione al piombo, e l’alcol e il fumo in gravidanza.',
      'Non basta un comportamento vivace per dire che c’è un ADHD: serve che i sintomi durino e pesino sulla vita del bambino.',
    ],
    valutazione: [
      'Non esiste un test unico. È un percorso in più passi: una visita medica con controllo di udito e vista, e la raccolta di informazioni da genitori, insegnanti e altri adulti su come il bambino si comporta a casa, a scuola e con i compagni.',
      'Gli specialisti controllano anche se qualcos’altro spiega meglio i sintomi, per esempio disturbi del sonno, ansia, depressione o certi disturbi dell’apprendimento, oppure se questi sono presenti insieme all’ADHD.',
      'La scheda dell’ISS riporta che i sintomi compaiono di solito prima dei 7 anni e durano da almeno 6 mesi, e che i criteri del DSM richiedono 6 sintomi su 9 di disattenzione oppure di iperattività e impulsività. Nei criteri più recenti (DSM-5) l’età limite è 12 anni. A farla è uno psicologo, uno psichiatra o un pediatra esperto.',
    ],
    cosaAiuta: [
      'Sotto i 6 anni si comincia con la formazione dei genitori alla gestione del comportamento. I farmaci si considerano solo dopo, perché in questa età possono funzionare meno e dare più effetti collaterali.',
      'Dai 6 anni si combinano farmaci e terapia comportamentale, con aiuti a scuola. La formazione dei genitori è consigliata fino ai 12 anni.',
      'La terapia comportamentale serve a rafforzare i comportamenti positivi, ridurre quelli problematici e allenare l’autoregolazione. Funziona meglio nei più piccoli quando la fanno i genitori.',
      'Gli stimolanti sono i farmaci più usati: tra il 70% e l’80% dei bambini ha meno sintomi. Possono ridurre l’appetito e disturbare il sonno. Il medico può dover cambiare tipo e dose. I farmaci vanno sempre decisi con lo specialista.',
    ],
    quando: [
      'Se i comportamenti durano da mesi, si vedono in più luoghi (casa e scuola) e creano problemi con i compiti o con gli amici.',
      'Se gli insegnanti ti segnalano le stesse difficoltà che vedi tu.',
      'Sotto i 5-6 anni la vivacità è normale e la valutazione è più difficile: un pediatra o un neuropsichiatra infantile ti dirà cosa è tipico per l’età.',
    ],
    fonti: ['epicentroAdhd', 'cdcAdhd', 'cdcAdhdSegni', 'cdcAdhdDiagnosi', 'cdcAdhdTrattamento'],
  },

  // ------------------------------------------------------------------------------------ TIC / TOURETTE
  {
    id: 'tourette',
    categoria: 'sviluppo',
    nome: 'Tic e sindrome di Tourette',
    sintesi: 'Movimenti o suoni improvvisi e ripetuti che il bambino non riesce a controllare.',
    cosaE: [
      'I tic sono movimenti o suoni improvvisi e ripetuti. La sindrome di Tourette è la forma in cui compaiono sia tic motori sia tic vocali. Non esiste una cura, ma le terapie possono aiutare a gestire i tic.',
      'Non si conosce la causa. È più probabile averla se la madre o il padre ne soffrono, ed è più frequente nei maschi che nelle femmine.',
    ],
    comune: null,
    segnali: [
      {
        titolo: 'Tic motori (movimenti)',
        voci: ['Sbattere o roteare gli occhi.', 'Alzare le spalle.', 'Scatti o contrazioni, saltelli.', 'Contrarre i muscoli della pancia.'],
      },
      {
        titolo: 'Tic vocali (suoni)',
        voci: [
          'Fischiare, schiarirsi la gola o tirare su col naso molto spesso.',
          'Fare versi di animali.',
          'Ripetere un suono, una parola o una frase. Dire parolacce è raro.',
        ],
      },
      {
        titolo: 'Cosa li peggiora',
        voci: ['Stress, eccitazione e stanchezza possono far comparire o aumentare i tic.'],
      },
    ],
    cosaNonE: [
      'Non sono un capriccio e il bambino non li fa apposta: non riesce a fermarli volontariamente.',
      'Dire parolacce a ripetizione è raro: la maggior parte dei bambini con Tourette non lo fa.',
    ],
    valutazione: [
      'Il medico può sospettare una sindrome di Tourette se i tic sono iniziati prima dei 18 anni, durano da almeno un anno e comprendono sia suoni sia movimenti.',
      'Uno specialista (neurologo o pediatra) può usare esami come EEG, risonanza magnetica o analisi del sangue per escludere altre cause.',
      'Spesso la sindrome di Tourette si presenta insieme a disturbo ossessivo-compulsivo o ADHD.',
    ],
    cosaAiuta: [
      'Si comincia con la terapia comportamentale. Si passa ai farmaci se non basta.',
      'La scelta del farmaco dipende anche dalla presenza di ADHD o disturbo ossessivo-compulsivo, e il medico spiega gli effetti collaterali.',
    ],
    quando: [
      'I sintomi di solito iniziano verso i 6 anni e diventano più evidenti verso i 10. Se vedi tic che durano, parlane con il pediatra.',
      'Prendi nota di quando compaiono di più: il diario può aiutare a capire cosa li fa aumentare.',
    ],
    fonti: ['nhsTourette'],
  },

  // ------------------------------------------------------------------------------------ MUTISMO SELETTIVO
  {
    id: 'mutismo',
    categoria: 'sviluppo',
    nome: 'Mutismo selettivo',
    sintesi: 'Il bambino parla a casa ma in certe situazioni non riesce proprio a parlare.',
    cosaE: [
      'Il mutismo selettivo è un disturbo d’ansia. Il bambino non riesce a parlare in certe situazioni sociali, per esempio con i compagni o con parenti che vede poco, mentre in altre situazioni parla senza problemi. Di solito comincia nell’infanzia e, se non viene trattato, può durare fino all’età adulta.',
      'Il punto più importante è che il bambino non rifiuta di parlare: non ci riesce. Gli esperti lo considerano una specie di fobia di parlare con certe persone.',
    ],
    comune: null,
    segnali: [
      {
        titolo: 'Cosa si nota',
        voci: [
          'Una grande differenza tra come si comporta con persone diverse.',
          'Si blocca: il corpo resta immobile e il viso fisso quando deve parlare con qualcuno fuori dalla sua zona di sicurezza.',
          'Evita lo sguardo e sembra nervoso, chiuso, attaccato ai genitori o teso.',
          'Alcuni usano gesti come annuire. I casi più marcati evitano ogni comunicazione, anche i gesti e la scrittura.',
        ],
      },
      {
        titolo: 'Quando compare',
        voci: ['Di solito tra i 2 e i 4 anni, e spesso si nota quando il bambino comincia il nido o la scuola.'],
      },
    ],
    cosaNonE: [
      'Non è timidezza e non è cattiva volontà: non va liquidato con “è solo timido”.',
      'Non si risolve mettendo il bambino sotto pressione o premiandolo per farlo parlare.',
    ],
    valutazione: [
      'Per la diagnosi, il bambino non parla in situazioni specifiche, parla bene in altre, e la situazione dura da almeno un mese (due mesi in un nuovo ambiente), con effetti sulla vita quotidiana e senza una spiegazione migliore in un’altra condizione.',
      'La diagnosi precoce aiuta. Il pediatra può indirizzare a un servizio specialistico, che può valutare anche modi non verbali di comunicare.',
      'Tra i fattori collegati ci sono una tendenza all’ansia, il disagio nella separazione, problemi di linguaggio o di udito e difficoltà sensoriali.',
    ],
    cosaAiuta: [
      'La terapia riguarda l’ansia, non la parola. Si procede per gradi: dalla comunicazione senza parole alle singole parole, poi alle frasi, fino al parlare libero. Si usano terapia cognitivo-comportamentale e tecniche graduali.',
      'A casa e a scuola: ridurre la pressione, far sentire il bambino al sicuro, rassicurarlo che parlerà quando si sentirà pronto, accettare gesti e sorrisi nel frattempo.',
      'Se parla, rispondi con calore e senza mostrarti sorpreso. Non lodarlo davanti agli altri, perché può metterlo in imbarazzo.',
      'I farmaci si considerano di norma solo per i più grandi e non sostituiscono la terapia comportamentale.',
    ],
    quando: [
      'Se il tuo bambino non parla in alcuni luoghi o con alcune persone, anche se a casa parla tranquillamente.',
      'Se ti dicono a scuola che “non parla mai”, mentre con te chiacchiera.',
    ],
    fonti: ['nhsMutismo'],
  },

  // ------------------------------------------------------------------------------------ DSA
  {
    id: 'dsa',
    categoria: 'apprendimento',
    nome: 'DSA (dislessia, disgrafia, disortografia, discalculia)',
    sintesi: 'Difficoltà specifiche nel leggere, scrivere o fare di conto, con un’intelligenza nella norma.',
    cosaE: [
      'I disturbi specifici dell’apprendimento (DSA) fanno fatica in una abilità precisa della scuola. La legge italiana (170/2010) li definisce così: la dislessia è una difficoltà nell’imparare a leggere, nella correttezza e nella rapidità. La disgrafia è una difficoltà nella realizzazione grafica della scrittura. La disortografia è una difficoltà nei processi linguistici di trascrizione dei suoni in lettere. La discalculia è una difficoltà negli automatismi del calcolo e nell’elaborazione dei numeri.',
      'Possono presentarsi da soli o insieme. Sono legati al modo in cui funziona il cervello: non dipendono dall’intelligenza, che è nella norma, né da quanto il bambino si impegna.',
    ],
    comune: null,
    segnali: [
      {
        titolo: 'Alla scuola dell’infanzia (intorno ai 5 anni)',
        voci: [
          'Linguaggio: conosce poche parole e significati, fa fatica con filastrocche e rime, costruisce con difficoltà le frasi e fatica a memorizzare le parole.',
          'Movimento: fa fatica a disegnare e a copiare figure geometriche, ha poca manualità fine e globale.',
          'Udito e spazio: fatica a ripetere e a distinguere suoni, sillabe o parole simili, si organizza male nei giochi di costruzione e nei labirinti, fatica a ritagliare e a costruire.',
        ],
      },
      {
        titolo: 'Alla fine della prima elementare',
        voci: [
          'Lettura: decifra le singole lettere molto lentamente, è incerto con le sillabe, controlla poco il significato delle parole.',
          'Scrittura: scrive le parole con poca autonomia, sostituisce o salta lettere, fa fatica proprio nell’atto di scrivere.',
          'Numeri: sbaglia a contare da 0 a 20, fatica a passare dalla pronuncia alla scrittura dei numeri, fatica nel calcolo mentale entro il 10.',
        ],
      },
      {
        titolo: 'Più avanti',
        voci: [
          'Legge lentamente e a scatti, e fa errori di lettura.',
          'Fa molti errori di ortografia, e i suoi scritti sono disordinati.',
          'Fatica con i numeri, con l’orologio e con l’ordine di giorni e mesi.',
          'Ha difficoltà a pianificare e organizzare i compiti.',
          'Può mostrare frustrazione, comportamenti di opposizione oppure chiudersi a scuola e a casa.',
        ],
      },
    ],
    cosaNonE: [
      'Non è mancanza di intelligenza: la dislessia non riguarda l’intelligenza.',
      'Non è pigrizia: il bambino spesso si impegna molto e si stanca più degli altri.',
      'Non ha una cura, ma si può gestire bene: con strumenti e metodi adatti il bambino impara ad aggirare la difficoltà.',
    ],
    valutazione: [
      'In Italia la diagnosi dei DSA si può fare solo dopo la fine della seconda elementare. Prima di allora si possono comunque notare i segnali e parlarne con gli insegnanti e con il pediatra.',
      'La legge prevede che la diagnosi sia fatta nell’ambito dei trattamenti specialistici del servizio sanitario nazionale. Dove non è possibile, possono farla specialisti o strutture accreditate. La famiglia consegna la diagnosi alla scuola.',
      'La scuola può attivare interventi per individuare i casi sospetti, ma i risultati di queste attività non sono una diagnosi.',
      'Prima di tutto è utile far controllare udito e vista, per escludere altre cause di difficoltà.',
    ],
    cosaAiuta: [
      'Con una diagnosi, la scuola deve garantire una didattica individualizzata e personalizzata.',
      'Gli strumenti compensativi (anche tecnologici, come i programmi di lettura vocale) aiutano a studiare nonostante la difficoltà.',
      'Le misure dispensative esonerano il bambino da alcune prestazioni non essenziali, per esempio leggere ad alta voce. Per le lingue straniere possono essere usati strumenti compensativi e, se serve, l’esonero.',
      'Verifiche e valutazioni devono essere adeguate, anche agli esami di Stato e all’università. Le misure vanno controllate periodicamente.',
      'A casa: costruire fiducia, trovare attività che piacciono e rendere l’apprendimento divertente, e fare movimento.',
    ],
    quando: [
      'Se alla scuola dell’infanzia vedi molte difficoltà con rime, suoni e figure, parlane con il pediatra.',
      'Se i maestri ti segnalano che il bambino legge o scrive con molta fatica rispetto ai compagni.',
      'Se dopo i compiti il bambino è molto stanco o scoraggiato, anche se si impegna.',
    ],
    fonti: ['legge170', 'aid', 'nhsDislessia'],
  },

  // ------------------------------------------------------------------------------------ INTELLETTIVO
  {
    id: 'intellettivo',
    categoria: 'apprendimento',
    nome: 'Disturbo dello sviluppo intellettivo',
    sintesi: 'Sviluppo più lento in più aree, con più difficoltà nell’imparare e nelle autonomie.',
    cosaE: [
      'È una condizione in cui il bambino impara più lentamente in diverse aree e fa più fatica a cavarsela nella vita quotidiana rispetto ai coetanei. Una diagnosi valuta sia le capacità intellettive sia le autonomie nella vita di ogni giorno.',
      'Può avere cause molto diverse. Alcune sono genetiche, come la sindrome di Down e la sindrome dell’X fragile. In molti casi la causa non si trova.',
      'I bambini con una forma più marcata mostrano i segni prima.',
    ],
    comune: null,
    segnali: [
      {
        titolo: 'Segnali possibili',
        voci: [
          'Si siede, gattona o cammina più tardi degli altri bambini della stessa età.',
          'Impara a parlare più tardi, o ha difficoltà a parlare.',
          'Fa fatica a ricordare le cose.',
          'Ha difficoltà a capire le regole del comportamento sociale.',
          'Fa fatica a capire le conseguenze di quello che fa.',
          'Ha difficoltà a risolvere i problemi.',
        ],
      },
    ],
    cosaNonE: [
      'Non è una malattia che passa con il tempo, ma ogni bambino impara e può migliorare con il giusto sostegno.',
      'Non significa che il bambino non possa imparare: impara con tempi, modi e aiuti diversi.',
      'Un ritardo in una sola area non significa per forza un disturbo intellettivo: possono esserci altre cause, per esempio un problema di udito.',
    ],
    valutazione: [
      'Per capire se un ritardo è solo un po’ più lento oppure no, i medici controllano le tappe dello sviluppo (quando il bambino si siede, cammina, parla) e le confrontano con quelle attese per l’età.',
      'Una diagnosi è fatta da specialisti, di solito dal neuropsichiatra infantile, che valuta le capacità di ragionamento e di apprendimento insieme alle autonomie quotidiane.',
      'Il primo passo è sempre parlarne con il pediatra, che può controllare udito e vista e inviare ai servizi specialistici.',
    ],
    cosaAiuta: [
      'Più si interviene presto, meglio è: i servizi di intervento precoce sono pensati anche per i bambini piccoli, prima di una diagnosi definitiva.',
      'Il sostegno è personalizzato: logopedia, terapia occupazionale, interventi educativi e aiuto a scuola secondo i bisogni.',
    ],
    quando: [
      'Se il bambino cammina, parla o impara più tardi dei coetanei in più aree.',
      'Se noti che fa molta più fatica degli altri nelle autonomie, come mangiare o vestirsi da solo.',
    ],
    fonti: ['nichdIntellettivo', 'cdcXFragile'],
  },

  // ------------------------------------------------------------------------------------ LINGUAGGIO
  {
    id: 'linguaggio',
    categoria: 'linguaggio',
    nome: 'Disturbo del linguaggio',
    sintesi: 'Fa più fatica degli altri bambini a capire le parole, a usarle e a costruire frasi.',
    cosaE: [
      'Il disturbo del linguaggio (in inglese developmental language disorder) è un disturbo della comunicazione che rende difficile imparare, capire e usare il linguaggio. Può riguardare il parlare, l’ascoltare, il leggere e lo scrivere.',
      'Non dipende da perdita dell’udito, da autismo o da mancanza di stimoli linguistici. È un disturbo del neurosviluppo, che nasce da un intreccio di fattori genetici e ambientali.',
      'Tende a essere familiare: dal 50% al 70% dei bambini con questo disturbo ha almeno un familiare con lo stesso problema.',
    ],
    comune: 'Circa 1 bambino su 14 alla scuola dell’infanzia (dato statunitense).',
    segnali: [
      {
        titolo: 'Nei più piccoli',
        voci: [
          'Fa fatica a unire le parole in frasi.',
          'Impara con difficoltà parole nuove e a fare conversazione.',
          'Segue con difficoltà le istruzioni, perché non capisce bene le parole.',
          'Fa spesso errori di grammatica.',
        ],
      },
      {
        titolo: 'Nei più grandi',
        voci: [
          'Usa poche frasi complesse e fatica a trovare la parola giusta.',
          'Ha difficoltà con il linguaggio figurato.',
          'Ha problemi di lettura, racconta in modo disorganizzato e scrive testi poco ordinati.',
          'Fa molti errori di grammatica e di ortografia.',
        ],
      },
    ],
    cosaNonE: [
      'Non è timidezza né cattiva condotta: a volte le difficoltà di linguaggio vengono scambiate per questo.',
      'Crescere con due lingue non causa il disturbo e non fa male a un bambino che lo ha.',
      'Un bambino che parla tardi (“late talker”) può recuperare. Nel disturbo del linguaggio le difficoltà restano nel tempo, anche se molti bambini con questo disturbo avevano iniziato a parlare tardi.',
    ],
    valutazione: [
      'Il primo controllo da fare è quello dell’udito: una perdita dell’udito può sembrare un ritardo del linguaggio.',
      'La valutazione è fatta da un logopedista, di solito dopo che un medico, un insegnante o un genitore ha segnalato il problema. Comprende osservazione diretta, interviste e questionari per genitori o insegnanti e test standardizzati che confrontano il bambino con i coetanei.',
      'In Italia il pediatra può indirizzare al servizio di neuropsichiatria infantile e alla logopedia.',
    ],
    cosaAiuta: [
      'La logopedia è il trattamento principale. L’obiettivo cambia con l’età: nei più piccoli grammatica, vocabolario e comunicazione sociale; a scuola seguire le istruzioni, organizzare le informazioni, parlare, leggere e scrivere.',
      'Intervenire presto, già in età prescolare, può migliorare le abilità di molti bambini con ritardo del linguaggio. Ma ci si può giovare del trattamento a qualsiasi età.',
    ],
    quando: [
      'Se a 2 anni dice pochissime parole o non capisce richieste semplici.',
      'Se anche chi lo conosce bene fa fatica a capirlo.',
      'Se fa più fatica dei compagni a seguire le consegne, a raccontare o a imparare parole nuove.',
    ],
    fonti: ['nidcdLinguaggio', 'cdcUdito'],
  },

  // ------------------------------------------------------------------------------------ BALBUZIE
  {
    id: 'balbuzie',
    categoria: 'linguaggio',
    nome: 'Balbuzie',
    sintesi: 'Il bambino si blocca o ripete suoni e parole mentre parla.',
    cosaE: [
      'La balbuzie è un disturbo della fluidità del parlare. Di solito diventa evidente tra i 2 e i 5 anni, mentre il bambino sta ancora imparando a parlare. Può svilupparsi piano piano oppure comparire all’improvviso in un bambino che prima parlava bene.',
      'Può peggiorare quando il bambino si sente osservato o a disagio, per esempio parlando con la maestra, leggendo ad alta voce o al telefono.',
    ],
    comune: null,
    segnali: [
      {
        titolo: 'Come si nota',
        voci: [
          'Ripete suoni, sillabe o parole, per esempio “a-a-a-a-albero”.',
          'Allunga un suono e non riesce ad andare avanti, per esempio “mmmmmmmmamma”.',
          'Fa lunghe pause tra suoni e parole, come se cercasse la parola giusta.',
          'Usa molti intercalari come “ehm” e “ah” ed evita lo sguardo mentre fatica.',
        ],
      },
      {
        titolo: 'Segnali di evitamento',
        voci: [
          'Evita certe parole o finge di aver dimenticato cosa stava dicendo.',
          'Evita situazioni sociali in cui dovrebbe parlare.',
        ],
      },
    ],
    cosaNonE: [
      'Non è colpa dei genitori e non dipende da nervosismo del bambino.',
      'Non è maleducazione né distrazione: il bambino sa cosa vuole dire, ma fatica a farlo uscire.',
    ],
    valutazione: [
      'Se sei preoccupato per il modo di parlare di tuo figlio, parlane con il pediatra o con un logopedista.',
      'Il logopedista valuta come parla il bambino in diverse situazioni e decide se serve una terapia.',
    ],
    cosaAiuta: [
      'Consigli generali dei logopedisti: lascia al bambino il tempo di finire le frasi senza completarle al posto suo, ascoltalo con calma e senza fargli fretta, e guarda lui, non la balbuzie.',
      'La terapia con il logopedista è il modo per lavorare sulla fluidità e sul disagio che la balbuzie può creare.',
    ],
    quando: [
      'Se la balbuzie dura da qualche mese o peggiora.',
      'Se il bambino mostra disagio, evita di parlare o cerca di nascondere la difficoltà.',
    ],
    fonti: ['nhsBalbuzie'],
  },

  // ------------------------------------------------------------------------------------ UDITO
  {
    id: 'udito',
    categoria: 'linguaggio',
    nome: 'Perdita dell’udito nei bambini (ipoacusia)',
    sintesi: 'Il bambino sente meno, e questo può rallentare il linguaggio e l’apprendimento.',
    cosaE: [
      'La perdita dell’udito si verifica quando una parte dell’orecchio, del nervo acustico o del sistema uditivo non funziona come dovrebbe. Può comparire in qualsiasi momento, dalla nascita all’età adulta.',
      'Quando non viene riconosciuta può sembrare un ritardo del linguaggio o una mancanza di attenzione: ecco perché controllare l’udito è il primo passo davanti a qualsiasi dubbio sullo sviluppo.',
    ],
    comune: null,
    segnali: [
      {
        titolo: 'Nei neonati e nei piccoli',
        voci: [
          'Non sobbalza ai rumori forti.',
          'Dopo i 6 mesi non si volta verso un suono.',
          'A 1 anno non dice parole semplici come “mamma” o “papà”.',
          'Sembra sentire alcuni suoni ma non altri.',
        ],
      },
      {
        titolo: 'Nei bambini più grandi',
        voci: [
          'Parla in ritardo o in modo poco chiaro.',
          'Non segue le istruzioni.',
          'Dice spesso “eh?”.',
          'Alza troppo il volume di televisione o radio.',
        ],
      },
    ],
    cosaNonE: [
      'Non è sempre presente dalla nascita: può comparire più tardi, per esempio dopo una malattia.',
      'Non è un problema “solo degli anziani”: riguarda anche i bambini, e si può trattare.',
    ],
    valutazione: [
      'Secondo il CDC, tutti i neonati dovrebbero fare uno screening dell’udito entro 1 mese di vita. Se non lo superano, dovrebbero fare un test completo il prima possibile, idealmente entro 3 mesi.',
      'I bambini vanno controllati prima di iniziare la scuola, e in qualsiasi momento ci sia un dubbio.',
      'Le cause possono essere genetiche (circa 1 caso su 2 nei neonati) oppure legate a infezioni materne, complicazioni dopo la nascita o traumi alla testa (circa 1 caso su 4). Tra i fattori di rischio: almeno 5 giorni in terapia intensiva neonatale, meningite, trauma cranico con ricovero.',
      'Chiedi al pediatra se il controllo dell’udito di tuo figlio è stato fatto.',
    ],
    cosaAiuta: [
      'Non c’è un trattamento unico. Le soluzioni comprendono apparecchi acustici, impianti cocleari, lingua dei segni, farmaci o interventi chirurgici per alcuni tipi di perdita dell’udito e servizi di sostegno alla famiglia.',
      'Prima si comincia, meglio è: più presto i bambini iniziano i servizi, più è probabile che raggiungano il loro pieno potenziale.',
    ],
    quando: [
      'Se hai il minimo dubbio che tuo figlio non senta bene.',
      'Se parla poco o in modo poco chiaro per la sua età.',
      'Prima di valutare altre condizioni dello sviluppo, come ADHD, autismo o ritardo del linguaggio.',
    ],
    fonti: ['cdcUdito'],
  },

  // ------------------------------------------------------------------------------------ DISPRASSIA
  {
    id: 'disprassia',
    categoria: 'movimento',
    nome: 'Disturbo della coordinazione motoria (disprassia)',
    sintesi: 'Movimenti goffi e difficoltà nei gesti di tutti i giorni, a scuola e nel gioco.',
    cosaE: [
      'Il disturbo della coordinazione motoria (in inglese DCD, spesso chiamato disprassia) è una condizione per cui il bambino fa fatica a coordinare i movimenti più di quanto ci si aspetti per la sua età. Questo rende difficili attività che per gli altri sono automatiche, e incide sulla vita di ogni giorno e sul rendimento a scuola.',
      'Non dipende da un ritardo intellettivo né da una malattia neurologica come la paralisi cerebrale.',
    ],
    comune: null,
    segnali: [
      {
        titolo: 'Nei neonati e nei piccoli',
        voci: [
          'Ci mette un po’ di più a rotolare, sedersi, gattonare o camminare.',
          'Assume posizioni insolite del corpo nel primo anno di vita.',
          'Ha difficoltà con i giochi che richiedono coordinazione, come impilare i cubi.',
          'Fa fatica a imparare a mangiare con le posate.',
          'Questi segnali possono comparire e scomparire.',
        ],
      },
      {
        titolo: 'In età scolare: movimenti grandi',
        voci: [
          'Ha difficoltà a saltellare, saltare, correre, prendere o calciare un pallone.',
          'Fa fatica a salire e scendere le scale.',
          'Fatica a stare fermo: può dondolare o muovere molto braccia e gambe.',
          'Urta gli oggetti, fa cadere le cose e cade spesso.',
          'Può diventare meno allenato dei coetanei.',
        ],
      },
      {
        titolo: 'In età scolare: movimenti fini',
        voci: [
          'Fatica a scrivere, disegnare e usare le forbici. La scrittura e i disegni possono sembrare scarabocchi, meno sviluppati.',
          'Fatica a vestirsi, allacciare i bottoni e le scarpe.',
        ],
      },
      {
        titolo: 'Altri aspetti',
        voci: [
          'Difficoltà di concentrazione e a seguire le istruzioni, difficoltà a organizzarsi, apprendimento lento delle abilità.',
          'Difficoltà a farsi degli amici, problemi di comportamento e bassa autostima.',
          'In alcuni bambini difficoltà a coordinare i movimenti per parlare in modo chiaro.',
        ],
      },
    ],
    cosaNonE: [
      'Non è pigrizia né goffaggine “da crescita”: il bambino si impegna ma fa fatica.',
      'Non è un problema di intelligenza.',
    ],
    valutazione: [
      'Si può sospettare già in età prescolare, ma di solito non è possibile fare una diagnosi definitiva prima dei 5 anni.',
      'La diagnosi di solito la fa un pediatra, spesso insieme a un terapista occupazionale; possono partecipare anche il fisioterapista o lo psicologo.',
      'La valutazione comprende un test dei movimenti, di solito il Movement ABC, che confronta i risultati con quelli dei bambini della stessa età, la verifica che le capacità mentali siano nella norma e l’esame della storia medica e familiare.',
      'I criteri: le abilità motorie sono nettamente sotto quelle attese per l’età, le difficoltà durano nel tempo e pesano sulla vita quotidiana e sulla scuola, sono iniziate presto e non si spiegano meglio con altre condizioni.',
    ],
    cosaAiuta: [
      'La terapia occupazionale lavora sulle abilità di ogni giorno, come usare le posate e vestirsi.',
      'La fisioterapia può aiutare nei movimenti più grandi.',
      'A scuola, gli insegnanti possono adattare i compiti di scrittura e di educazione fisica. Una diagnosi aiuta la famiglia a capire le difficoltà, a ottenere il sostegno giusto e a ridurre lo stress.',
    ],
    quando: [
      'Se tuo figlio inciampa e cade molto più dei coetanei.',
      'Se fatica con scarpe, bottoni, posate o scrittura a un’età in cui gli altri ci riescono.',
      'Se evita i giochi di movimento perché si sente impacciato.',
    ],
    fonti: ['nhsDcdSintomi', 'nhsDcdDiagnosi'],
  },

  // ------------------------------------------------------------------------------------ PARALISI CEREBRALE
  {
    id: 'paralisi',
    categoria: 'movimento',
    nome: 'Paralisi cerebrale infantile',
    sintesi: 'Un gruppo di condizioni che riguardano il movimento e la coordinazione, presenti dalla nascita o dai primi anni.',
    cosaE: [
      'La paralisi cerebrale infantile è un gruppo di condizioni permanenti che riguardano il movimento e la coordinazione. Dipende da un problema nel cervello che si sviluppa prima, durante o subito dopo la nascita.',
      'Succede se il cervello del bambino non si sviluppa normalmente durante la gravidanza o viene danneggiato intorno alla nascita. Tra le cause: sanguinamento nel cervello o riduzione di sangue e ossigeno, infezioni in gravidanza, mancanza di ossigeno durante un parto difficile, meningite, trauma cranico grave. In molti casi la causa esatta non si capisce.',
    ],
    comune: null,
    segnali: [
      {
        titolo: 'Segnali di sviluppo',
        voci: ['A 8 mesi non sta seduto.', 'A 18 mesi non cammina.'],
      },
      {
        titolo: 'Altri segnali',
        voci: [
          'Sembra troppo rigido oppure troppo molle.',
          'Ha braccia o gambe deboli.',
          'Ha movimenti a scatti, goffi o incontrollati.',
          'Cammina in punta di piedi.',
          'In alcuni bambini ci sono anche difficoltà nell’ingoiare, nel parlare, nella vista o nell’apprendimento.',
        ],
      },
    ],
    cosaNonE: [
      'Non peggiora con il tempo: il problema di partenza del cervello non peggiora, anche se il corpo può risentirne con l’età.',
      'Non significa che il bambino non possa vivere bene: molti hanno una vita piena e indipendente. I risultati variano molto da persona a persona.',
      'Segnali simili possono avere altre cause e non sono per forza gravi: serve una valutazione.',
    ],
    valutazione: [
      'I sintomi di solito non sono evidenti subito dopo la nascita e diventano visibili nei primi tempi.',
      'Il bambino viene valutato da specialisti dello sviluppo infantile, che fanno controlli ed esami. In Italia il pediatra può indirizzare alla neuropsichiatria infantile.',
    ],
    cosaAiuta: [
      'Non c’è una cura, ma le terapie aiutano a essere il più attivi e autonomi possibile.',
      'Fisioterapia (esercizi e stiramenti), logopedia (parola, comunicazione e deglutizione), terapia occupazionale (compiti quotidiani), farmaci per la rigidità muscolare e a volte la chirurgia.',
      'Un gruppo di professionisti prepara un piano su misura.',
    ],
    quando: [
      'Se a 8 mesi non sta seduto o a 18 mesi non cammina.',
      'Se sembra troppo rigido o troppo molle quando lo prendi in braccio.',
      'Per qualsiasi dubbio sullo sviluppo motorio, parlane con il pediatra.',
    ],
    fonti: ['nhsPci'],
  },

  // ------------------------------------------------------------------------------------ DOWN
  {
    id: 'down',
    categoria: 'genetiche',
    nome: 'Sindrome di Down',
    sintesi: 'Una condizione genetica dovuta a una copia in più del cromosoma 21.',
    cosaE: [
      'La sindrome di Down si ha quando si nasce con un cromosoma in più: tre copie del cromosoma 21 invece di due. Può influenzare lo sviluppo fisico e mentale.',
      'Quasi sempre avviene per caso, per un cambiamento in una cellula uovo o in uno spermatozoo prima del concepimento. Nulla di quello che una persona ha fatto prima o durante la gravidanza la provoca. Nella quasi totalità dei casi non è ereditaria.',
      'Ci sono tre forme: la trisomia 21 (circa il 95% dei casi, tre copie separate del cromosoma), la traslocazione (circa il 3%) e il mosaicismo (circa il 2%, in cui solo alcune cellule hanno la copia in più e i tratti possono essere meno marcati).',
    ],
    comune: null,
    segnali: [
      {
        titolo: 'Caratteristiche fisiche (presenti alla nascita)',
        voci: [
          'Viso appiattito e occhi a mandorla inclinati verso l’alto.',
          'Lingua che tende a sporgere, collo corto, orecchie piccole.',
          'Mani e piedi piccoli, una sola piega nel palmo, mignolo piccolo.',
          'Tono muscolare basso o articolazioni lasse, statura inferiore alla media.',
        ],
      },
      {
        titolo: 'Sviluppo',
        voci: [
          'Probabile un certo grado di disabilità intellettiva, con una grande varietà di abilità: alcuni sono abbastanza autonomi e lavorano, altri hanno bisogno di assistenza regolare.',
          'Sviluppo del linguaggio più lento.',
        ],
      },
      {
        titolo: 'Salute: cosa controllare',
        voci: ['Difetti cardiaci congeniti.', 'Perdita dell’udito.', 'Apnee notturne ostruttive.'],
      },
    ],
    cosaNonE: [
      'Non è colpa di nessuno e non dipende da qualcosa fatto in gravidanza.',
      'Non dipende solo dall’età della madre: il rischio sale con l’età, ma chiunque può avere un bambino con sindrome di Down, e la maggior parte nasce da madri sotto i 35 anni perché ci sono più nascite in quella fascia.',
      'Le persone con sindrome di Down non sono tutte uguali: abilità e bisogni variano molto.',
    ],
    valutazione: [
      'Durante la gravidanza si può fare uno screening (nel Regno Unito tra la 10ª e la 14ª settimana, con ecografia ed esame del sangue). Lo screening è facoltativo e dice solo se la probabilità è più alta, senza dare una diagnosi certa.',
      'I test diagnostici possono confermare la condizione, ma comportano un rischio maggiore. Né i test né lo screening possono dire quanto la sindrome inciderà sul bambino.',
      'Poiché le caratteristiche sono presenti alla nascita, di solito la diagnosi è nota già alla nascita o subito dopo. Se hai un sospetto, il pediatra può prescrivere un esame genetico.',
    ],
    cosaAiuta: [
      'Controlli medici regolari su cuore, udito e respirazione.',
      'Logopedia, fisioterapia e terapia occupazionale fin dai primi mesi, e sostegno educativo a scuola.',
    ],
    quando: [
      'Se hai un sospetto che il tuo bambino abbia caratteristiche compatibili e nessuno ne ha mai parlato, chiedi al pediatra una valutazione.',
    ],
    fonti: ['nhsDown', 'cdcDown'],
  },

  // ------------------------------------------------------------------------------------ X FRAGILE
  {
    id: 'xfragile',
    categoria: 'genetiche',
    nome: 'Sindrome dell’X fragile',
    sintesi: 'Condizione genetica, causa frequente di disabilità intellettiva ereditaria.',
    cosaE: [
      'La sindrome dell’X fragile è una condizione genetica dovuta a cambiamenti del gene FMR1. Questo gene produce una proteina necessaria allo sviluppo del cervello, che le persone con X fragile non producono. È una delle cause più comuni di disabilità intellettiva ereditaria.',
      'Colpisce maschi e femmine, ma le femmine spesso hanno sintomi più lievi.',
    ],
    comune:
      'Una revisione di studi stima che siano state diagnosticate circa 1 persona su 7.000 tra i maschi e 1 su 11.000 tra le femmine. Il numero reale non si conosce.',
    segnali: [
      {
        titolo: 'Sviluppo e apprendimento',
        voci: [
          'Ritardi nel sedersi, camminare o parlare.',
          'Difficoltà a imparare cose nuove.',
          'Nei maschi di solito c’è un certo grado di disabilità intellettiva, da lieve a grave. Nelle femmine l’intelligenza può essere nella norma oppure con un certo grado di disabilità.',
        ],
      },
      {
        titolo: 'Comportamento',
        voci: [
          'Ansia e difficoltà ad avere attenzione.',
          'Movimenti delle mani a farfalla (hand flapping) e poco contatto visivo.',
          'Agire e parlare senza pensare, ed essere molto attivi.',
          'Il disturbo dello spettro autistico è più frequente nelle persone con X fragile.',
        ],
      },
    ],
    cosaNonE: [
      'Non è causata da qualcosa che i genitori hanno fatto.',
      'Non è uguale in tutti: nelle bambine e nei bambini i sintomi possono essere molto diversi.',
    ],
    valutazione: [
      'La diagnosi si fa con un esame del DNA su un campione di sangue, prescritto da un medico o da un genetista.',
      'Si consiglia una consulenza genetica prima del test, perché i risultati possono riguardare anche altri familiari.',
      'Questo esame viene spesso proposto quando un bambino ha un ritardo dello sviluppo, difficoltà di apprendimento o tratti dello spettro autistico senza una causa chiara.',
    ],
    cosaAiuta: [
      'Non c’è una cura. Le terapie per sviluppare parola, movimento e capacità sociali aiutano.',
      'Alcuni farmaci possono aiutare a controllare problemi come i comportamenti difficili.',
      'Intervenire presto, anche prima di una diagnosi formale, fa la differenza.',
    ],
    quando: [
      'Se un bambino ha ritardi nello sviluppo, difficoltà di apprendimento o tratti dello spettro autistico, e in famiglia ci sono casi di disabilità intellettiva o di autismo.',
      'Il pediatra può proporre una consulenza genetica.',
    ],
    fonti: ['cdcXFragile'],
  },
]
