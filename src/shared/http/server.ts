import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import 'dotenv/config';
import '@shared/typeorm';
import ApplicationError from '@shared/errors/ApplicationError';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

// middleware de erros da aplicação
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ApplicationError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(400).json({
      status: 'error',
      message: error.message,
    });
  },
);

app.listen(process.env.PORT);
