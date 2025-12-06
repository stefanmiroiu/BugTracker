Instrucțiuni de Rulare:
1.Precondiții:
Node.js (v18+) & npm instalat.
PostgreSQL (v12+) Server instalat și pornit.
2. Configurare Locală
Clonați repository-ul:
  git clone https://github.com/aurelliaaa23/Proiect-Tehnologii-Web---Echipa-NovaWeb.git
Instalați dependențele:  
  npm install
Configurați Baza de Date:
  Creați o bază de date în PostgreSQL (ex: bug_tracker_db).Creați fișierul .env și completați-l cu credențialele DB și cheia secretă JWT.
3. Pornirea Serverului
Rulați serverul: 
  node server.js
Verificare: 
  Serverul trebuie să afișeze: "Conexiunea la baza de date a fost stabilita cu succes!" și "Serverul ruleaza pe portul 5000".
4. Testarea 
Utilizați Thunder Client pentru a testa API-ul:
Înregistrare: 
  POST http://localhost:5000/api/auth/register
Conectare: 
  POST http://localhost:5000/api/auth/login 
Proiecte: 
  GET http://localhost:5000/api/projects/teams
Bug-uri: 
  POST http://localhost:5000/api/bugs
  GET http://localhost:5000/api/bugs/proiect/
  PUT http://localhost:5000/api/bugs/[id_bug]/status

