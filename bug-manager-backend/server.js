const express = require('express');
const cors = require('cors');
const { connectionDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bugRoutes = require('./routes/bugRoutes'); 
const proiectRoutes = require('./routes/proiectRoutes');
const associations = require('./models/associations');

connectionDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/bugs', bugRoutes);
app.use('/api/projects', proiectRoutes); 
app.get('/', (req, res)=>{
    res.send('Bug Manager este online');
});

app.listen(PORT,()=>{
    console.log(`Serverul ruleaza pe portul ${PORT}`);

})






