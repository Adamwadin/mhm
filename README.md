MHM /MyHomeMarbella är enkel bokningsida där alla ska kunna snabbt gå in och boka samt betala.

försökt att göra det så enkelt och användarvänligt som möjligt i mån av kunskap

Min tanke är att allt ska kunna göras på en sida och INTE gå till massa andra sidor för att snabba upp sjäklvaste upplevelsen.

inga sido-omladdningar, inte egentliga routes. utan allt finns på en sida.

frontend är byggd på react/js
backend express/SQL

samt firebase för användare och inlogg. (google inlogg)

---

Funktioner

## 🗓️ Bokningshantering: Enkel och effektiv bokning.

## 💳 Stripe-integration för betalning: Säker betalning med kreditkort.

## 🗺️ Google Maps API: Förbättrad användarupplevelse med platstjänster.

## 📅 Kalenderfunktionalitet: Hantera datum och tider smidigt.

## ⚙️ Backend med Express.js: Snabb och effektiv serverlogik.

## 🛢️ MySQL-databas: För säker lagring av data.

## 🔐 Säkerhet: Hantering av känsliga uppgifter med miljövariabler (dotenv).

## bibliotek som används:

Frontend

React: Ramverk för användargränssnitt.
React Router: Navigering mellan sidor.
React Modal: Modala fönster.
React Scroll: Smidig scrollhantering.
React Datepicker: Datumväljare.
React Big Calendar & React Calendar: Kalenderfunktionalitet.
React FontAwesome: Ikoner.

---

Backend

Express.js: Serverlogik.
Stripe: Betalningshantering.
MySQL2: Databasanrop.
Body-parser: Hantering av inkommande data.
Cors: Cross-origin-förfrågningar.
Övriga teknologier
Firebase: Autentisering och datahantering.
Google Maps API: Platstjänster.
Axios: API-anrop.
dotenv: Hantering av miljövariabler.

---

För att starta så behöver du installera alla dependecies i package.json

npm install

sedan för att starta frontend.

npm start

öppna ny (en till) terminal för backend och skriv

node server.js

Förutsättningar
Node.js: 18.18.0 (inte testat med senaste)
