import { Model, ObjectId, Schema, model } from 'mongoose';

export type IUser = {
  userName: string;
  accountNumber: string;
  emailAddress: string;
  identityNumber: string;
};

export type IUserQuery = IUser & { _id: ObjectId };
export type IUserView = IUser & { id: string };

export type IUserModel = Model<IUser>;

export function userView(user: IUserQuery): IUserView {
  return {
    id: user._id.toString(),
    userName: user.userName,
    accountNumber: user.accountNumber,
    emailAddress: user.emailAddress,
    identityNumber: user.identityNumber,
  };
}

const schema = new Schema<IUser>(
  {
    userName: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, trim: true, lowercase: true },
    identityNumber: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: IUserQuery): IUserView => userView(ret),
    },
  },
);

schema.index({ createdAt: -1 });
schema.index({ accountNumber: 1, createdAt: -1 });
schema.index({ identityNumber: 1, createdAt: -1 });
schema.index({ identityNumber: 1, accountNumber: 1 });

const User: IUserModel = model<IUser, IUserModel>('User', schema);

export default User;
