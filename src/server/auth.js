import jwt from 'jsonwebtoken';
import config from './config';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.replace(/Bearer\s/, '');

    if(!token) {
        return res.status(401, {"message": "No Token provided"});
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(403).send({"message": "Invalid Token"});
        }
        
        req.userId = decoded.id;
        next();
    });
};

export default verifyToken;