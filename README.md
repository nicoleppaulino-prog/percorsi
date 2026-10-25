# 🧭 Percorsi

Diario per le famiglie di bambini autistici, con una community per confrontarsi.

Percorsi aiuta a capire **cosa succede, un momento alla volta**: il genitore annota gli *eventi sensoriali* (un rumore, una luce, la folla che mettono in difficoltà il bambino) e i *progressi*. Col tempo emergono gli stimoli che tornano più spesso. Nella community si scrivono post e commenti.

> 🔗 **Versione online:** https://percorsi-chi.vercel.app

> 📚 **Documentazione API (Swagger):** https://percorsi-backend.onrender.com/swagger-ui.html

> ⏳ Il server gratuito si addormenta se non viene usato: la prima apertura può richiedere circa un minuto.

## ✨ Funzioni

- 🔐 Registrazione e login con due ruoli: **genitore** e **utente community**
- 👧 Diario privato: ogni genitore vede solo i propri bambini
- 🔊 Eventi sensoriali: data, luogo, stimoli, intensità da 1 a 5, reazione, cosa ha aiutato
- 🌱 Progressi per area (comunicazione, autonomia, ecc.)
- 📊 Riepilogo: numero di eventi, ultimi 30 giorni, intensità media, stimoli più frequenti
- 💬 Community: post per argomento, commenti, eliminazione dei propri contenuti
- 📖 Guida per i nuovi genitori: "cos'è un evento sensoriale?"
- 📱 Interfaccia responsive e accessibile

## 🛠️ Tecnologie

| Parte | Strumenti |
|---|---|
| Backend | Java 17, Spring Boot 3.3, Spring Data JPA, Spring Security + JWT, Bean Validation |
| Database | H2 (sviluppo), PostgreSQL (produzione) |
| Documentazione API | Swagger / OpenAPI |
| Frontend | React 18, Vite, React Router, Bootstrap 5 (react-bootstrap), Sass |
| Test | JUnit + MockMvc (backend), Vitest (frontend) |

## 🚀 Avvio in locale

Servono **JDK 17 o superiore**, **Node 18+** e Maven (oppure IntelliJ).

```bash
git clone <url-del-repository>
cd percorsi
```

### 1. Backend

```bash
cd backend
mvn spring-boot:run
```

Parte su http://localhost:8080 con un database H2 salvato nella cartella `data/`.
Documentazione interattiva: http://localhost:8080/swagger-ui.html

In IntelliJ: apri la cartella `backend`, attiva **Enable annotation processing** (serve a Lombok) ed esegui `CapstoneApplication`.

### 2. Frontend

```bash
cd frontend
cp .env.example .env        # contiene VITE_API_URL=http://localhost:8080
npm install
npm run dev
```

Apri http://localhost:5173.

## ✅ Test

```bash
cd backend && mvn test
cd frontend && npm test
```

## 🌍 Pubblicazione

**Backend** (profilo `prod`, PostgreSQL). Variabili d'ambiente:

| Variabile | Significato |
|---|---|
| `DB_URL` | es. `jdbc:postgresql://host:5432/percorsi` |
| `DB_USER`, `DB_PASSWORD` | credenziali del database |
| `JWT_SECRET` | stringa segreta lunga almeno 32 caratteri |
| `CORS_ALLOWED_ORIGINS` | indirizzo del frontend pubblicato |
| `PORT` | porta (opzionale) |

Il `Dockerfile` in `backend/` costruisce l'immagine pronta per servizi come Render o Railway.

**Frontend**: su Vercel o Netlify, cartella `frontend`, comando `npm run build`, cartella di output `dist`, variabile `VITE_API_URL` con l'indirizzo del backend. I file `vercel.json` e `public/_redirects` gestiscono le rotte della single page app.

## 🔌 API in breve

| Metodo | Percorso | Note |
|---|---|---|
| POST | `/api/auth/register`, `/api/auth/login` | pubblici |
| GET | `/api/auth/me` | utente corrente |
| GET/POST | `/api/bambini` | solo genitori |
| GET/DELETE | `/api/bambini/{id}` | solo il proprietario |
| GET/POST | `/api/bambini/{id}/eventi-sensoriali` | |
| GET/POST | `/api/bambini/{id}/progressi` | |
| GET/POST | `/api/post?categoria=` | tutti gli iscritti |
| GET/DELETE | `/api/post/{id}` | elimina solo l'autore |
| GET/POST | `/api/post/{id}/commenti` | |

## 🔒 Privacy e sicurezza

- Password cifrate con BCrypt, autenticazione con token JWT senza sessioni lato server
- Un genitore che chiede il bambino di un altro riceve 404, come se non esistesse
- Le risposte dell'API non contengono mai password
- Percorsi non sostituisce il parere di medici e terapisti

## 📁 Struttura

```
percorsi/
├── backend/    Spring Boot (controller, service, repository, model, dto, security)
└── frontend/   React (pages, components, api, context, hooks, utils, styles)
```
