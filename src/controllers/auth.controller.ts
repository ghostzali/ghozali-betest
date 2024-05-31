import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export namespace AuthController {
  export const issue = async (req: Request, res: Response) => {
    const basicHeader = req.headers.authorization;
    if (!basicHeader) res.status(401).json({ message: 'unauthorized' });

    try {
      const token = await AuthService.getToken(basicHeader);

      res.status(200).json({ token, type: 'Bearer' });
    } catch (err) {
      res.status(403).json({ message: `Forbidden: ${err}` });
    }
  };
}
