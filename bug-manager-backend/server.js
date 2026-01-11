const express = require('express');
const cors = require('cors');
const { connectionDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bugRoutes = require('./routes/bugRoutes'); 
const proiectRoutes = require('./routes/proiectRoutes');
const associations = require('./models/associations');
const path = require('path');

connectionDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/bugs', bugRoutes);
app.use('/api/projects', proiectRoutes); 

app.use(express.static(path.join(__dirname, 'build')));
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT,()=>{
    console.log(`Serverul ruleaza pe portul ${PORT}`);

})






