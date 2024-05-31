import { kafkaConfig } from '../config';
import { EventAction, KafkaEvent } from '../interfaces';
import User, { IUser, IUserQuery, IUserView } from '../models/user.model';
import { KafkaProducerService } from './kafka-producer.service';

type UserCreateEvent = KafkaEvent<IUserView>;
type UserUpdateEvent = KafkaEvent<Partial<IUser>>;
type UserDeleteEvent = KafkaEvent<undefined>;

export namespace UserService {
  export const create = async (user: IUser): Promise<IUserQuery> => {
    try {
      const newUser = new User(user);
      await newUser.save();

      await KafkaProducerService.send<UserCreateEvent>(kafkaConfig.topic, {
        action: EventAction.CREATE,
        data: newUser.toJSON(),
      });

      return newUser.toJSON();
    } catch (err) {
      throw err;
    }
  };

  export const find = async (): Promise<IUserQuery[]> => {
    return User.find().lean();
  };

  export const findOne = async (id: string): Promise<IUserQuery> => {
    const user = await User.findById(id);

    return user.toJSON();
  };

  export const findByKeyword = async (keyword: string): Promise<IUserQuery[]> => {
    return User.find({
      $or: [
        { emailAddress: keyword.toLowerCase() },
        { userName: keyword },
        { identityNumber: keyword },
        { accountNumber: keyword },
      ],
    }).lean();
  };

  export const findByAccountOrIdentity = async (
    accountNumber?: string,
    identityNumber?: string,
  ): Promise<IUserQuery[]> => {
    return User.find({
      $or: [{ identityNumber }, { accountNumber }],
    }).lean();
  };

  export const exist = async (id: string): Promise<boolean> => {
    const user = await User.exists({ _id: id });

    return !!user;
  };

  export const accoutOrIdentityExist = async (accountNumber?: string, identityNumber?: string) => {
    const user = User.exists({
      $or: [{ identityNumber }, { accountNumber }],
    });

    return !!user;
  };

  export const update = async (id: string, updates: Partial<IUser>): Promise<boolean> => {
    try {
      const updated = await User.updateOne({ _id: id }, updates);

      await KafkaProducerService.send<UserUpdateEvent>(kafkaConfig.topic, {
        action: EventAction.UPDATE,
        key: id,
        data: updates,
      });

      return updated.acknowledged;
    } catch (err) {
      throw err;
    }
  };

  export const destroy = async (id: string) => {
    try {
      const deleted = await User.deleteOne({ _id: id });
      await KafkaProducerService.send<UserDeleteEvent>(kafkaConfig.topic, {
        action: EventAction.DELETE,
        key: id,
        data: undefined,
      });

      return deleted.acknowledged;
    } catch (err) {
      throw err;
    }
  };
}
