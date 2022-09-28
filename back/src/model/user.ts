import mongoose, {Schema} from 'mongoose'
import crypto from 'crypto'

const userSchema = new Schema<userInterface>({
    // id: {type: String, required: true},
    nom: {type: String, required: true},
    password: {type: String},
    salt: {type: String}
});


userSchema.methods.setPassword = (password: string) => {
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return {salt, hash}
}

userSchema.methods.validPassword = (password: string, hash: string, salt: crypto.BinaryLike) => {
    var passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return hash === passwordHash; 
}; 

interface userInterface{
    id: string,
    nom: string,
    password: string,
    salt: string,
    setPassword: any,
    validPassword: any
};

const User = mongoose.model('User', userSchema);

export { userSchema, User, userInterface };