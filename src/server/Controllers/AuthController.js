import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';
import User from '../Models/User';
import verifyToken from '../auth';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/register', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }).then(user => {
        if(!user) {
            return res.status(404).send({"message": "User Not Created"});
        }
        
        const token = jwt.sign({
            id: user.id
        }, config.secret, {
            expiresIn: 86400
        });
        
        res.status(200).send({auth: true, token});
    });
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    
    User.findOne({
        where: {
            email
        }
    }).then(user => {
        if(!user) {
            return res.status(404).send({"message": "Email id not found!"});
        }
        
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        
        if(!passwordIsValid) {
            return res.status(401).send({auth: false, token: null});
        }
        
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400
        });
        
        res.status(200).send({auth: true, token, user});
    });
});
router.get('/me', verifyToken, (req, res) => {

    if(!req.userId) {
        return res.status(403).send({"message": "Could not find user"});
    }

    User.findByPk(req.userId, {
        attributes: [ "id", "name", "email"]
    }).then(user => {
        if(!user) {
            return res.status(404).send({"message": "User not found"});
        }

        res.status(200).send(user);
    });
});

router.get('/logout', (req, res) => {
    res.status(200)
});

export default router;