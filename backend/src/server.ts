import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import korisnikRouter from './routes/korisnik.routes';
import korisnickiZahtevRouter from './routes/korisnickiZahtev.routes';
import dosadasnjiRekordiRouter from './routes/dosadasnjiRekordi.routes';
import sportIDisciplineRouter from './routes/sportIDiscipline.routes';
import takmicenjaRouter from './routes/takmicenje.routes';
import sportistiRouter from './routes/sportisti.routes';
import osvojeneMedaljeRouter from './routes/osvojeneMedalje.router';
import rasporedRouter from './routes/raspored.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/projekat');
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('mongo ok');
})

const router=express.Router();

router.use("/korisnik",korisnikRouter);
router.use("/korisnickiZahtev",korisnickiZahtevRouter);
router.use("/dosadasnjiRekordi", dosadasnjiRekordiRouter);
router.use("/sportIDisciplina", sportIDisciplineRouter);
router.use("/takmicenje",takmicenjaRouter);
router.use("/sportisti",sportistiRouter);
router.use("/osvojeneMedalje",osvojeneMedaljeRouter);
router.use("/raspored",rasporedRouter)

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));