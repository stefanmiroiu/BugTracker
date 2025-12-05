const { JsonWebTokenError } = require("jsonwebtoken");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const protect = (req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
           token = req.headers.authorization.split(' ')[1]; 
           const decoded = jwt.verify(token, JWT_SECRET);
           req.utilizator = decoded;
           next();
        }
        catch(error){
            console.error(error.message);
            res.status(401).json({message:'Neautorizat, token esuat'});
        }   
    }
    if(!token){
        res.status(401).json({message:'Neautorizat, token esuat'});
    }
};

module.exports = protect;
