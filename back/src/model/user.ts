import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema<userInterface>({
    id: {type: String, required: true},
    nom: {type: String, required: true},
    password: {type: String, required: true}
});

interface userInterface{
    id: string,
    nom: string,
    password: string,
};

const User = mongoose.model('User', userSchema);

export { userSchema, User, userInterface };