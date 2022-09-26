import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './src/routes/routes';
import './src/utils/mongoInitScript';
import { middleware } from './src/routes/middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cors());


app.use('/user', routes.user)

app.use('/', middleware)

app.use('/ingredient', routes.ingredient);

app.use('/modele', routes.modele);

app.use('/procede', routes.procede);

app.use('/', (_req, res) => {
    res.json({message: 'Server Online'});
})

app.listen(8000);