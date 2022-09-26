import { Router } from "express";
import { Modele } from "../model/modele";
import { ObjectId } from "bson";
import { sendError } from "../utils/sendError";
import { Procede } from "../model/procede";

const router = Router();

router.post('/add', (req, res) => {
    try {
        const { nom, description, modeles, etapes} = req.body;
        Procede.create({nom, description, modeles, etapes})
            .then((procede) => {
                res.status(201)
                    .json({message: 'success', data_created: {procede: procede}});
            }).catch(e => sendError(res, e));
    } catch(e) {
        sendError(res, e);
    }
});


router.patch('/update', (req, res) => {
    try {
        const { id, nom, description, modeles, etapes} = req.body;
        Procede.updateOne({_id: new ObjectId(id)}, {nom: nom, description: description, modeles: modeles, etapes: etapes}).exec()
            .then((procede) => {
                if(!procede) throw {status: 404, message: "procede not found"};
                res.status(201).json({message: 'success', data_update: {procede: procede}});
            }).catch((e) => {
                sendError(res, e);
            });
    } catch(e) {
        sendError(res, e);
    }
});


router.delete('/delete', (req, res) => {
    try {
        const {id} = req.body;
        Procede.deleteOne({_id: new ObjectId(id)}).exec()
            .then((procede) => {
                if(!procede) throw {status: 404, message: "procede not found"};
                res.status(201).json({message: 'success', data_modify: {procede: procede}})
            }).catch(e => sendError(res, e));
    } catch(e) {
        sendError(res, e);
    }
})



router.get('/:id', (req, res) => {
    try {
        const {id} = req.params;
        Procede.findOne({_id: new ObjectId(id)}).exec()
            .then(procede => {
                if(!procede) throw {status: 404, message: 'procede not found'};
                procede.modeles.map(async (modeleId) => {
                    return await Modele.findOne({_id: new ObjectId(modeleId)}).exec()
                })
                res.status(200).json({procede: procede});
            }).catch(e => sendError(res,e));
    } catch(e) {
        sendError(res, e);
    }
});

router.get('/', (_req, res) => {
    try {
        Procede.find().exec()
            .then(procedes => {
                if(!procedes) throw {status: 404, message: 'procedes not found'};
                res.status(200).json({procedes: procedes});
            }).catch(e => sendError(res, e));
    } catch(e) {
        sendError(res, e)
    }
})

export default router;