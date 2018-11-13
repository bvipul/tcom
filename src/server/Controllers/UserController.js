import express from 'express';
import bodyParser from 'body-parser';
import User from '../Models/User';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended:true }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => {
        if(!user) {
            res.status(404).send({"message": "User Not Created"});
        } else {
            res.status(200).send({"message": "User Created", user});
        }
    });
});

router.get('/', (req, res) => {
    User.findAll().then(users => {
        if(!users) {
            res.status(404);
        } else {
            res.status(200).send(users);
        }
    });
});

router.get('/:id', (req, res) => {
    User.findByPk(req.params.id).then(user => {
        if(!user) {
            res.status(404).send({"message": "User Not Found!"});
        } else {
            res.status(200).send(user);
        }
    });
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(result => {
        if(result) {
            res.status(200).send({"message": "User updated Successfully"});
        } else {
            res.status(500).send({"message": "User can not be updated"});
        }
    });
});

router.delete('/:id', (req, res) => {
    User.findByPk(req.params.id).then(user => {
        if(!user) {
            res.status(404).send({"message": "User Not Found!"});
        } else {
            user.destroy();
            res.status(200).send({"message": "User Deleted"});
        }
    });
});

export default router;

