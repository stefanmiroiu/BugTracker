const express = require('express');
const cors = require('cors');
const { connectionDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const associations = require('./models/associations');

connectionDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.get('/', (req, res)=>{
    res.send('Bug Manager este online');
});

app.listen(PORT,()=>{
    console.log(`Serverul ruleaza pe portul ${PORT}`);

})
