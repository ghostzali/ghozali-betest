import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthenticateRequest } from '../interfaces';

const authMiddleware: RequestHandler = async (req: AuthenticateRequest, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(401).json({ message: 'unauthorized' });
    return;
  }
  try {
    const user = await AuthService.verifyToken(bearerToken);
    if (!user) throw new Error('Invalid token');

    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: `${err}` });
  }
};

export default authMiddleware;
