import { Request, Response } from 'express';

export type UserType = {
  id?: number;
  email: string;
  password: string;
  notesPerPage: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SighnInAndUpReq<T> = Request<{}, {}, T>;

export type authMiddleware = {
  user: {
    id: number;
    email: string;
  };
};

export interface AuthReq extends Request {
  user: {
    id: number;
    email: string;
  };
}

export interface TokenResponse extends Response {
  token: string;
}
