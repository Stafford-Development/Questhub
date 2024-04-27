import express from 'express';
import cors from 'cors';
import path from 'path';
import dungeonMasterRoutes from './routes/dungeonMaster.routes.js';
import { connectDB } from './database/db.js';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json()); 
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

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


connectDB();

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));