



require('dotenv').config();
const jwt           =   require('jsonwebtoken');
const secretkey     =   process.env.TOKEN_STAFF;



const authenticateToken = (req,res,next) =>
{
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
    }

    
    const token = authorizationHeader.substring(7);

    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
      }

    if(!authenticateToken)
    {
        return res.status(401).json({message: 'Token no proporcionado'});
    }

    if(!authorizationHeader.startsWith('Bearer '))
    {
        return res.status(401).json({ message: 'Token inválido' });
    }

    

    jwt.verify(token,secretkey,(err,decodedToken) =>
    {
        if (err) 
        {
            if (err.name === 'JsonWebTokenError') 
            {
                return res.status(401).json({ message: 'Token inválido' });
            } 
            else if (err.name === 'TokenExpiredError') 
            {
                return res.status(401).json({ message: 'Token expirado' });
            } 
            else 
            {
                return res.status(403).json({ message: 'Token prohibido' });
            }
        }
        else {
            req.user = 
            {
                id: decodedToken.userId,
                email: decodedToken.email,
            };
            next();
        }
    
    });

}


module.exports = authenticateToken;