import mongoose from "mongoose";

const mongoDb = 'mongodb://mongodb:27017/cyberSec';

mongoose.connect(mongoDb)
    .then(() => console.log("Connection réussi"))
    .catch((e) => console.log("Erreur de connection", e));

const conn = mongoose.connection.useDb('cyberSec');
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default conn;