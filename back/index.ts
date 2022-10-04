import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './src/routes/routes';
import './src/utils/mongoInitScript';
import { middleware } from './src/routes/middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cors());

// app.use('/back/sign-in', routes.user)

app.use('/back/user', routes.user)

app.use('/back/', middleware)

app.use('/back/ingredient', routes.ingredient);

app.use('/back/modele', routes.modele);

app.use('/back/procede', routes.procede);

app.use('/back/', (_req, res) => {
    res.json({message: 'Server Online'});
})

app.listen(8000);