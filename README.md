# ChatSGG


Questa breve documentazione intende fornire una panoramica generale della Web App ChatSGG descrivendone l’uso, le principali tecnologie utilizzate e la logica oltre che una guida all’uso.
1. OVERVIEW E GUIDA ALL’USO
All’apertura della web app si viene indirizzati alla pagina di login che consente l’accesso ed eventualmente la registrazione di un user. Per creare un account è necessario inserire i propri dati e scegliere un username univoco oltre che una password. In particolare, qualora si dovesse scegliere un username già utilizzato si visualizzerà a schermo un errore, come anche nel caso in cui i campi “password” e “conferma password” non dovessero coincidere. Le password prima di essere conservate nel database vengono “hashate” con Bcrypt per garantire l’autenticazione sicura.
A seguito della creazione di un nuovo account, si viene reindirizzati alla pagina di login, dalla quale si può accedere alla pagina principale. A tal punto è possibile vedere gli amici con i quali è possibile scambiare messaggi in tempo reale.
La web app consente conversazioni solo ed esclusivamente con gli amici: per aggiungere un amico è necessario recarsi nella pagina “amici” ed inserire l’username dell’utente al quale si vuole richiedere l’amicizia. Questo potrà accettarla o rifiutarla, e solo dopo l’approvazione sarà possibile entrare in contatto. Si segnala che l’app non consente di inviare richieste di amicizia a se stessi, dunque non è possibile creare una “self chat”.
È sempre possibile gestire le amicizie: rimuovendo un amico la chat verrà rimossa ed eliminata per entrambi gli interlocutori.
2. FRONTEND
Il frontend è completamente realizzato con React (in ascolto sulla porta 3000) e si compone di tre pages (Chat Panel, Login e Register) che richiamano i vari componenti (si evidenziano Navbar che realizza la barra superiore per spostarsi tra lee pagine e Chat per renderizzare le conversazioni).
Per la mappatura di pages-url sono state utilizzate le Routes, mentre useEffect viene utilizzato per gestire i side effect; sono inoltre stati utilizzati gli hook useState e useRef per gestire rispettivamente lo stato nei componenti e creare riferimenti mutabili. La comunicazione in tempo reale è gestita con Socket.io e le richieste HTTP al backend sono effettuate con Axios.
3. BACKEND
Il backend è realizzato con Node.js ed in particolare con il framework Express. L’app è in ascolto sulla porta 4000 (la porta 5000 talvolta è utilizzata da una componente di MacOS) sulla quale è possibile interrogare le API esposte. Il backend si interfaccia con il database MongoDB in cloud mediante Mongoose (con il quale sono stati realizzati gli schemi presenti in /models). Grazie ad Express sono state create le routes che richiamano le varie funzioni gestite dai due controllers, l’app usa il middelware CORS per permettere il funzionamento di Socket.io ed express.json .
La logica è basata su due controller: messageController che gestisce la messaggistica e userController per la gestione delle amicizie e dell’autenticazione.
Ulteriori informazioni sulla logica sono inserite come commenti all’interno del codice.

Made by
# Matteo Potito Giorgio
m.giorgio4@studenti.poliba.it

# Serafino Sinisi
s.sinisi@studenti.poliba.it

# Vincenzo Gentile
v.gentile2@studenti.poliba.it

