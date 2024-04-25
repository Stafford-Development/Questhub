import express from 'express';
import cors from 'cors';
import dungeonMasterRoutes from './routes/dungeonMaster.routes.js';
import { connectDB } from './database/db.js';
import session from 'express-session';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json()); 

app.use(session({
    secret: 'NOT_A_GOOD_SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
     
    } 
  }));
app.use('/api', dungeonMasterRoutes);


connectDB();


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));