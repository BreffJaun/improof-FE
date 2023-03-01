# Improof 

![logo](../src/img/LogoSpiel.png)

**Improof** schließt die Lücke zwischen „Social Media“ und „professional Network“. Das Ziel ist es vor allem Quereinsteigern den Einstieg in die Berufswelt leichter machen. Auch Recruitern soll die Arbeit mit Berufsfeldern die stark von Quereinsteigern geprägt sind, die Suche nach Kandidaten mit passenden Fähigkeiten erleichtern.
**Improof** ermöglicht eine direkte Darstellung des aktuellen Kenntnisstandes eines Users, sowie deren Entwicklung im Laufe der Zeit. Außerdem kann anhand der Projekte die Arbeitsweise eines Users Schritt für Schritt nachvollzogen werden. Mediale Inhalte machen es zudem einfacher einen detaillierten Einblick zu erhalten.

[Beispiel-Deployment auf Vercel](https://improof-fe.vercel.app/)

[Link zum Backend-Repository](https://github.com/BreffJaun/improof-BE)


## Installation

Um **Improof** zu clonen und zu starten, sollten [Git](https://git-scm.com) und [Node.js](https://nodejs.org/en/download/) auf dem Rechner installiert sein. Desweiteren muss entweder [MongoDB](https://www.mongodb.com/) auf dem Rechner installiert sein, oder es wird ein Link zu einer MongoDB-Datenbank (wie z.B. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas2)) benötigt. 

### Backend

Aus der Kommandozeile:

```bash
# Clone das Backend-Repository (hier mittels SSH Key) 
$ git clone git@github.com:BreffJaun/improof-BE.git

# Gehe in das Verzeichnis
cd  improof-BE

# Installiere Dependencies
$ npm install
```

Du musst nun eine `.env` Datei im Root-Verzeichnes anlegen. Darin sollen folgende Umgebungsvariablen angegeben werden:

DB_USER=          Dein MongoDB Benutzername   
DB_PASS=           Dein MiongoDB Passwort    
DB_HOST=          Dein MongoDB Host     
DB_NAME=         Dein MongoDb Datenbank Name    
PORT=                  Port auf dem dein Localhost läuft
SECRET_JWT_KEY=   Legen deinen eigenen Schlüssel fest, mit dem du deinen Webtoken verschlüsselst   
SENDGRID_API_KEY= Füge hier deinen Sendgrid API-Key ein, welchen du auf der Sendgrid Seite erhältst  

CLOUDINARY_CLOUD_NAME= 
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

Wir haben bei diesem Projekt mit Cloudinary gearbeitet um Mediadateien in einer Cloud abspeichern zu können. Wenn du einen anderen Cloud Anbieter benutzen möchtest, kann es sein, dass diverse Stellen im Backend dafür angepasst werden müssen. Wir raten daher zu einem Cloudinary Account. 

BE_HOST = Trage hier den kompletten HOST ein, auf dem dein Backend läuft (Bsp.: "http://localhost:2404")

FE_HOST = Trage hier den kompletten HOST ein, auf dem dein Frontend läuft (Bsp.: "http://localhost:5173")

Wenn du die env. Datei angelegt und mit allen Information versehen hast, starte das den Server.

```bash
# Starte das Backend
$ nodemon server.js
```

### Frontend

Aus einer anderen Kommandozeile:

```bash
# Clone dieses Frontend-Repository (hier mittels SSH Key) 
$ git clone git@github.com:BreffJaun/improof-FE.git

# Gehe in das Verzeichnis
$ cd improof-FE

# Installiere Dependencies
$ npm install
```

Gehe in den Ordner src/api und öffne die host.jsx Datei. Weise dort der „host“ Variable deinen in der Backend env. Datei angegebenen Wert für BE_HOST zu.

Lege im gleichen Ordner eine Datei mit dem Namen mapBoxApiKeys.jsx an. Wir haben bei diesem Projekt mit MapBox gearbeitet um die „New Search“ (mit Karte) beim Recruiter mit Daten versorgen zu können. Wenn du einen anderen Anbieter für Geocoding benutzen möchtest, kann es sein, dass diverse Stellen im Frontend dafür angepasst werden müssen. Wir raten daher zu einem Map Box Account. 
Diese Datei sollte folgende Variablen beinhalten:



export const MAP_BOX_URL= 
export const MAP_BOX_ENDPOINT=
export const MAP_BOX_KEY= 

```bash
# Starte das Frontend
$ npm run dev
```

## Technologien

Im Laufe des Webentwicklung-Jahreskurses haben wir den **MERN-Stack** gelernt, und alle von diesen Technologien finden in dem Projekt Anwendung. Zusätzlich verwenden wir diverse Technologien, welche wir uns selber beigebracht und umgesetzt haben.

Im Frontend benutzen wir **JavaScript** mit **React** als Webframework. Desweiteren verwenden wir hier **Pigeon Maps** für die Darstellung der Karte in Verbindung mit **Map Box* welches die dazu passende Geocoding API liefert.
Mit **React-Chrono** stellen wir unsere „Timeline“ innerhalb der Projekte dar. **Pure-React-Carousel** benutzen wir auf der Startseite nach dem Login, um die aktuellsten Projekte abwechselnd anzeigen zu lassen. Die **React-Icons** finden sich in zahlreichen Anwendungsbereichen wieder, zum Beispiel in der Navbar, bei diversen Buttons und anderen klickbaren Flächen. Bei den einzelnen „Stones“ in den Projekten, verwenden wir den **React-Player** für die Wiedergabe der Videoinhalte. In nahezu allen Komponenten kommt **React-Toastify** zum Einsatz, um bei diversen Handlungen, dem User Mitteilungen einzuspielen.
Für das Design wird durchgehend **SASS** verwendet.

Für das Backend verwenden wir **Node.js** mit dem Webframework **Express.JS**. Das Speichern und Abrufen der Daten wird in **MongoDB** über **Mongoose** gemacht.
Außerdem benutzen wir  **Sendgrid** für die Erstellung automatisierter E-Mails (zum Beispiel bei der Registration). Für die Validatoren benutzen wir **Express-Validator**, welche zum Beispiel bei der Eingabe/Änderung der Benutzerdaten oder Projektdaten zum Einsatz kommen. Als Webtoken benutzen wir **Jsonwebtoken**. Zur Speicherung von Medieninhalten verwenden wir **Multer** in Kombination mit **Cloudinary**. 




=================================
