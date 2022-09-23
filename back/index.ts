import express from 'express';
import cors from 'cors';
import routes from './src/routes/routes';
import './src/utils/mongoInitScript';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/ingredient', routes.ingredient);

app.use('/modele', routes.modele);

app.use('/procede', routes.procede);

app.use('/user', routes.user)

app.use('/', (_req, res) => {
    res.json({message: 'Server Online'});
})

app.listen(8000);