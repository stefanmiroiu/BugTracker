# Running Instructions

### 1. Prerequisites
* Node.js (v18+) & npm installed.
* PostgreSQL (v12+) Server installed and running.

---

### 2. Local Setup

**Clone the repository:**
`git clone https://github.com/aurelliaaa23/Proiect-Tehnologii-Web---Echipa-NovaWeb.git`

**Install dependencies:**
`npm install`

**Configure Database:**
Create a database in PostgreSQL (e.g., `bug_tracker_db`). Create a `.env` file and fill it with DB credentials and JWT secret key.

---

### 3. Starting the Server

**Run the server:**
`node server.js`

**Verification:**
Server must display: "Conexiunea la baza de date a fost stabilita cu succes!" and "Serverul ruleaza pe portul 5000".

---

### 4. Testing

Use Thunder Client to test the API:

* **Register:** `POST http://localhost:5000/api/auth/register`
* **Login:** `POST http://localhost:5000/api/auth/login`
* **Projects:** `GET http://localhost:5000/api/projects/teams`
* **Bugs:**
  * `POST http://localhost:5000/api/bugs`
  * `GET http://localhost:5000/api/bugs/proiect/`
  * `PUT http://localhost:5000/api/bugs/[id_bug]/status`
