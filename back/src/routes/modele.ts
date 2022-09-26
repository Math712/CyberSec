import { Router } from "express";
import { Modele } from "../model/modele";
import { Procede } from "../model/procede";
import { ObjectId } from "bson";
import { sendError } from "../utils/sendError";

const router = Router();

router.post('/add', (req, res) => {
    try {
        const {procedeId, nom, description, pUHT, gamme, ingredients, grammage} = req.body;
        Procede.findOne({_id: new ObjectId(procedeId)}).exec()
            .then(async (procede) => {
                if(!procede) throw {status: 404, message: "procede not found"};
                const modele = await Modele.create({
                    procedeId,
                    nom,
                    description,
                    pUHT,
                    gamme,
                    ingredients,
                    grammage
                });
                procede.modeles?.push(modele);
                await procede.save();
                res.status(201).json({message: 'success', data_created: {procede: procede, modele: modele}});
            }).catch(e => sendError(res, e));

    } catch(e) {
        sendError(res, e);
    }
});


router.patch('/update', (req, res) => {
    try {
        const {procedeId, id, nom, description, pUHT, gamme, ingredients, grammage} = req.body;
        Procede.findOne({_id: new ObjectId(procedeId)}).exec()
            .then(async (procede) => {
                if(!procede) throw {status: 404, message: "procede not found"};
                if(!procede.modeles) throw {status: 404, message: "procede dont have any modele"};
                let modeleIndex = procede.modeles.findIndex(modele => modele.id.toString() == id);
                if(modeleIndex === -1) throw {status: 404, message: 'modele not found'};
                let modele = await Modele.findOne({_id: new ObjectId(id)}).exec()
                if(!modele) throw {status: 404, message: "modele not found"};
                modele.updateOne({
                    nom: nom,
                    description: description,
                    pUHT: pUHT,
                    gamme: gamme,
                    ingredients: ingredients,
                    grammage: grammage
                });
                procede.modeles[modeleIndex] = modele;
                procede.save()
                    .then(() => res.status(201).json({message: 'success', data_update: {procede: procede, modele: modele}}))
                    .catch(() => {throw {status: 500, message: "Error occur"}});

            }).catch((e) => {
                sendError(res, e);
            })
    } catch(e) {
        sendError(res, e);
    }
});


router.delete('/delete', (req, res) => {
    try {
        const {procedeId, id} = req.body;
        Procede.findOne({_id: new ObjectId(procedeId)}).exec()
            .then(async (procede) => {
                if(!procede) throw {status: 404, message: "procede not found"};
                if(!procede.modeles) throw {status: 404, message: "procede dont have any modele"};
                let modeleIndex = procede.modeles.findIndex(modele => modele.id.toString() === id);
                if(modeleIndex === -1) throw {status: 404, message: 'procede dont have modele'};
                let modele = await Modele.findOne({_id: new ObjectId(id)}).exec()
                if(!modele) throw {status: 404, message: "modele not found"};
                modele.delete();
                procede.modeles.splice(modeleIndex, 1);
                procede.save()
                    .then(() => res.status(201).json({message: 'success', data_modify: {procede: procede, modele: modele}}))
                    .catch((e: any) => {throw {status: 500, message: e.message}});
            }).catch(e => sendError(res, e));
    } catch(e) {
        sendError(res, e);
    }
})



router.get('/:id', (req, res) => {
    try {
        const {id} = req.params;
        Modele.findOne({_id: new ObjectId(id)}).exec()
            .then(modele => {
                if(!modele) throw {status: 404, message: 'Modele not found'};
                res.status(200).json({modele: modele});
            }).catch(e => sendError(res,e));
    } catch(e) {
        sendError(res, e);
    }
}); 

export default router;