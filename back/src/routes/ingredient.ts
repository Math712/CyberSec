import { Router } from "express";
import { Modele } from "../model/modele";
import { Procede } from "../model/procede";
import { ObjectId } from "bson";
import { sendError } from "../utils/sendError";
import { Ingredient } from "../model/ingredient";

const router = Router();

router.post('/add', (req, res) => {
    try {
        const {nom, description} = req.body;
        Ingredient.create({nom, description})
            .then((ingredient) => res.status(201).json({message: 'success', data_created: ingredient}))
            .catch((e) => sendError(res, e))
    } catch(e) {
        sendError(res, e);
    }
});


router.patch('/update', (req, res) => {
    try {
        const {id, nom, description} = req.body;
        Ingredient.findOne({_id: new ObjectId(id)}).exec()
            .then((ingredient) => {
                if(!ingredient) throw {status: 404, message: "ingredient not found"};
                ingredient.updateOne({
                    nom: nom,
                    description: description,
                });
                res.status(201).json({message: 'success', data_update: {ingredient: ingredient}});
            }).catch((e) => {
                sendError(res, e);
            })
    } catch(e) {
        sendError(res, e);
    }
});


router.delete('/delete', (req, res) => {
    try {
        const {id} = req.body;
        Ingredient.findOne({_id: new ObjectId(id)}).exec()
            .then((ingredient) => {
                if(!ingredient) throw {status: 404, message: "ingredient not found"};
                Modele.find({ingredients: [id]}).exec()
                    .then(modeles => {
                        modeles.map(modele => {
                            let IngredientIndex = modele.ingredients.findIndex(id => id === id);
                            modele.ingredients.splice(IngredientIndex, 1);
                            modele.save();
                        });
                    })
                    .catch(e =>  {throw {status: 500, message: e.message}});
                ingredient.delete();
                res.status(201).json({message: 'success'});
            }).catch(e => sendError(res, e));
    } catch(e) {
        sendError(res, e);
    }
})



router.get('/:id', (req, res) => {
    try {
        const {id} = req.params;
        Ingredient.findOne({_id: new ObjectId(id)}).exec()
            .then(ingredient => {
                if(!ingredient) throw {status: 404, message: 'Modele not found'};
                res.status(200).json({modele: ingredient});
            }).catch(e => sendError(res,e));
    } catch(e) {
        sendError(res, e);
    }
}); 

export default router;