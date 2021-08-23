import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import listRoutes from './routes/listRoutes';
import todoRoutes from './routes/todoRoutes';
import "reflect-metadata";
import { createConnection, Connection } from 'typeorm';

// variables
const app = express();
const port = 3001;

createConnection().then(async (connection: Connection) => {
  // https://github.com/typeorm/typeorm/issues/2576
  await connection.query('PRAGMA foreign_keys=OFF')
  await connection.synchronize();
  await connection.query('PRAGMA foreign_keys=ON')
});

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/users', userRoutes);
app.use('/lists', listRoutes);
app.use('/lists', todoRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
