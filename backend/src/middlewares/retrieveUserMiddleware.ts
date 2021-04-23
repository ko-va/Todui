import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";
import {getRepository} from "typeorm";

export interface TokenRequest extends Request {
  token?: any;
  databaseUser?: User;
}

const retrieveUserMiddleware = async (req: any, res: Response, next: NextFunction) => {
  if (! req.token) {
    next(new Error('Auth failed'))
  }

  req.databaseUser = await getRepository(User).findOne(req.token.uid);

  next();
};

export default retrieveUserMiddleware;
