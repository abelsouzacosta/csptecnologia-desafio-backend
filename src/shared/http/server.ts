import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import '@shared/typeorm';
import ApplicationError from '@shared/errors/ApplicationError';

const app = express();

app.use(express.json());
app.use(cors());

// tratamento de erros da aplicação
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    // verifica se error é ums instância de ApplicationError
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
