import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AuthenticateBodyRequest, AuthenticateRequest, BodyRequest, KafkaEvent } from '../interfaces';
import { IUser, userView } from '../models/user.model';
import { UserService } from '../services/user.service';

type UserCreateRequest = AuthenticateBodyRequest<IUser>;
type UserUpdateRequest = AuthenticateBodyRequest<Partial<IUser>>;

export namespace UserController {
  export const create: RequestHandler = async (req: UserCreateRequest, res: Response, next: NextFunction) => {
    try {
      const { userName, emailAddress, accountNumber, identityNumber } = req.body;

      const existUser = await UserService.findByUserOrEmail(userName, emailAddress);
      if (existUser.length) {
        res.status(409).json({ message: `userName or emailAddress already exist!` });
        return;
      }

      const user = await UserService.create({ userName, emailAddress, accountNumber, identityNumber });
      res.status(201).json({
        user: user,
      });
    } catch (err) {
      next(err);
    }
  };

  export const findById: RequestHandler = async (req: AuthenticateRequest, res: Response) => {
    const id = req.params.id;

    const user = (await UserService.findOne(id)) as IUser;
    if (!user) res.status(404).json({ message: 'User not found!' });

    res.status(200).json({
      user,
    });
  };

  export const find: RequestHandler = async (req: AuthenticateRequest, res: Response) => {
    const keyword = req.query.keyword as string;
    const users = !keyword ? await UserService.find() : await UserService.findByKeyword(keyword);

    res.status(200).json({
      users: users.map(userView),
    });
  };

  export const update: RequestHandler = async (req: UserUpdateRequest, res: Response) => {
    const id = req.params.id;

    const exist = await UserService.exist(id);
    if (!exist) {
      res.status(404).json({ message: 'User not found!' });
      return;
    }

    const updated = await UserService.update(id, req.body);
    if (!updated) {
      res.status(500).json({ message: 'Something went wrong!' });
      return;
    }

    res.status(202).json({ id });
  };

  export const destroy: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;

    const exist = await UserService.exist(id);
    if (!exist) {
      res.status(404).json({ message: 'User not found!' });
      return;
    }
    const updated = await UserService.destroy(id);
    if (!updated) {
      res.status(500).json({ message: 'Something went wrong!' });
      return;
    }
    res.status(204).send();
  };
}
