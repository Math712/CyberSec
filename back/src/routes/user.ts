import { Router } from "express";
import { User } from "../model/user";
import { sendError } from "../utils/sendError";
import jwt from "jsonwebtoken";

const router = Router();

router.post('/check-credentials', (req, res) => {
    try {
        const {nom, password} = req.body;
        User.findOne({nom: nom})
            .then((user) => {
                if(!user) throw {status: 404, message: "user not found"};
                if(!user.validPassword(password, user.password, user.salt)) throw {status: 403, message: "bad password"};
                const token = jwt.sign({id: user._id}, 'mon secret', {expiresIn: "10800s"});
                res.status(200)
                    .cookie("access_token", 'Bearer ' + token, {httpOnly: true/*, expires: new Date(Date.now()+10800)*/})
                    .json({message: "success", user: {id: user._id, nom: user.nom}}); 
            }).catch(e => sendError(res, e));
    } catch(e) {
        sendError(res, e);
    }
});

router.get('/log-out', (req, res) => {
    try {
        res.status(200).clearCookie('access_token').json({message: "success"});
    } catch (e) {
        sendError(res, e);
    }
});


router.post('/sing-in', (req, res) => {
    const {nom, password} = req.body
    User.create({nom}).then(user => {
        let {salt, hash} = user.setPassword(password);
        user.salt = salt;
        user.password = hash;
        user.save().then(() => res.status(201).json(user));
    })
});

export default router;