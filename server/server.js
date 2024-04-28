import express from 'express';
import cors from 'cors';
import dungeonMasterRoutes from './routes/dungeonMaster.routes.js';
import { connectDB } from './database/db.js';
import session from 'express-session';
import {dirname} from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const buildPath = path.join(__dirname, ".." ,'client', 'dist');
app.use(express.static(buildPath));

/*app.use(cors({
  origin: 'http://localhost:3000', // replace with your client's origin
  credentials: true
}));*/

/*app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));*/

app.use(express.json()); 
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
     
    } 
  }));
app.use('/api', dungeonMasterRoutes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname,"../client/dist/index.html"));

});


connectDB();

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));