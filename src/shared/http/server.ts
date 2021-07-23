import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import '@shared/typeorm';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT);
