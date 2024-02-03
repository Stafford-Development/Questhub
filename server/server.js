import express from 'express';
import cors from 'cors';
import dungeonMasterRoutes from './routes/dungeonMaster.routes.js';
import { connectDB } from './database/db.js';

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use('/api', dungeonMasterRoutes);

// Connect to MongoDB
connectDB();


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));