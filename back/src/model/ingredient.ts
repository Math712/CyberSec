import mongoose, {Schema} from 'mongoose'

const ingredientSchema = new Schema<ingredientInterface>({
    // id: {type: String, required: true},
    nom: {type: String, required: true},
    description: {type: String, required: true}
});

interface ingredientInterface{
    id: string,
    nom: string,
    description: string,
};

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export { ingredientSchema, Ingredient, ingredientInterface };