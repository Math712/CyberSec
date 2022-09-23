import mongoose, {Schema} from 'mongoose'
import { modeleInterface, modeleSchema } from './modele';

const procedeSchema = new Schema<procedeInterface>({
    id: {type: String, required: true},
    nom: {type: String, required: true},
    description: {type: String, required: true},
    modeles: {type: [modeleSchema || null], required: true},
    etapes: {type: String, required: true}

});

interface procedeInterface{
    id: string,
    nom: string,
    description: string,
    modeles: modeleInterface[],
    etapes: string,
};

const Procede = mongoose.model('Procede', procedeSchema);

export { procedeSchema, Procede, procedeInterface };