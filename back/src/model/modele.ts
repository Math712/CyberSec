import mongoose, {Schema} from 'mongoose'
import { ingredientInterface, ingredientSchema } from './ingredient';

const modeleSchema = new Schema<modeleInterface>({
    // id: {type: String, required: true},
    nom: {type: String, required: true},
    description: {type: String, required: true},
    pUHT: {type: String, required: true},
    gamme: {type: String, required: true},
    ingredients: {type: [String], required: true},
    grammage: {type: String, required: true}

});

interface modeleInterface{
    id: string,
    nom: string,
    description: string,
    pUHT: string,
    gamme: string,
    ingredients: ingredientInterface["id"][],
    grammage: string,
};

const Modele = mongoose.model('Modele', modeleSchema);

export { modeleSchema, Modele, modeleInterface };