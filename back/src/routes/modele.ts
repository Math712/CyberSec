import { Router } from "express";
import { Modele } from "../model/modele";
import { Procede } from "../model/procede";
import { ObjectId } from "bson";
import { sendError } from "../utils/sendError";
import { Ingredient } from "../model/ingredient";
import { model } from "mongoose";

const router = Router();

router.post('/add', (req, res) => {
    try {
        const {nom, description, pUHT, gamme, ingredients, grammage} = req.body;
        Modele.create({nom, description, pUHT, gamme, ingredients, grammage})
            .then((modele) => res.status(201).json({message: 'success', data_created: {modele: modele}}))
            .catch(e => sendError(res, e));
    } catch(e) {
        sendError(res, e);
    }
});


router.patch('/update', (req, res) => {
    try {
        const {id, nom, description, pUHT, gamme, ingredients, grammage} = req.body;
        Modele.updateOne({_id: new ObjectId(id)}, {nom, description, pUHT, gamme, ingredients, grammage})
            .then((modele) => {
                if(!modele) throw {status: 404, message: "modele not found"};
                res.status(201).json({message: 'success', data_update: {modele: modele}})
            })
            .catch(e => sendError(res, e));
    } catch(e) {
        sendError(res, e);
    }
});


router.delete('/delete', (req, res) => {
    try {
        const {id} = req.body;
        Modele.findOne({_id: new ObjectId(id)}).exec()
            .then(modele => {
                if(!modele) throw {status: 404, message: "modele not found"};
                Procede.find({modeles: [id]}).exec()
                    .then(procedes => {
                        procedes.map(procede => {
                            let modeleIndex = procede.modeles.findIndex(id => id === id);
                            procede.modeles.splice(modeleIndex, 1);
                            procede.save();
                        });
                    })
                    .catch(e =>  {throw {status: 500, message: e.message}});
                modele.delete();
                res.status(201).json({message: 'success'});
            });
    } catch(e) {
        sendError(res, e);
    }
})



router.get('/:id', (req, res) => {
    try {
        const {id} = req.params;
        Modele.findOne({_id: new ObjectId(id)}).exec()
            .then( async (modele) => {
                if(!modele) throw {status: 404, message: 'Modele not found'};
                modele.ingredients.map((ingredientId) => {
                    Ingredient.findOne({_id: new ObjectId(ingredientId)}).exec()
                        .then((ingredient) => {
                            let modeleCopy = {...modele, ingredients: ingredient}
                            res.status(200).json({modele: modeleCopy});
                        }).catch(e => sendError(res, e));
                });
            }).catch(e => sendError(res,e));
    } catch(e) {
        sendError(res, e);
    }
}); 

router.get('/', (_req, res) => {
    try {
        Modele.find().exec()
            .then(modeles => {
                if(!modeles) throw {status: 404, message: 'modeles not found'};
                res.status(200).json({modeles: modeles});
            }).catch(e => sendError(res, e));
    } catch(e) {
        sendError(res, e)
    }
})

export default router;