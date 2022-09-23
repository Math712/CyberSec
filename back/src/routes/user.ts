import { Router, Response as IResponse } from "express";
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
                if(password !== user.password) throw {status: 403, message: "bad password"};
                const token = jwt.sign({id: user._id}, 'mon secret', {expiresIn: "3600s"});
                let {password: passwordRes, ...userRes} = user;
                res.status(200)
                    .cookie("access_token", 'Bearer' + token, {expires: new Date(Date.now()+3600)})
                    .json({message: "success", user: userRes}); 
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

export default router;