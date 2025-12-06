Instrucțiuni de Rulare:
<p>1.Precondiții:
<p>Node.js (v18+) & npm instalat.
<p>PostgreSQL (v12+) Server instalat și pornit.
<p>2. Configurare Locală
<p>Clonați repository-ul:
<p>  git clone https://github.com/aurelliaaa23/Proiect-Tehnologii-Web---Echipa-NovaWeb.git
<p>Instalați dependențele:  
<p>  npm install
<p>Configurați Baza de Date:
<p>  Creați o bază de date în PostgreSQL (ex: bug_tracker_db).Creați fișierul .env și completați-l cu credențialele DB și cheia secretă JWT.
<p>3. Pornirea Serverului
<p>Rulați serverul: 
<p>  node server.js
<p>Verificare: 
<p>  Serverul trebuie să afișeze: "Conexiunea la baza de date a fost stabilita cu succes!" și "Serverul ruleaza pe portul 5000".
<p>4. Testarea 
<p>Utilizați Thunder Client pentru a testa API-ul:
<p>Înregistrare: 
<p>  POST http://localhost:5000/api/auth/register
<p>Conectare: 
<p>  POST http://localhost:5000/api/auth/login 
<p>Proiecte: 
<p>  GET http://localhost:5000/api/projects/teams
<p>Bug-uri: 
<p>  POST http://localhost:5000/api/bugs
<p>  GET http://localhost:5000/api/bugs/proiect/
<p>  PUT http://localhost:5000/api/bugs/[id_bug]/status

