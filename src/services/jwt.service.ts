import { SignOptions, VerifyOptions, sign, verify } from 'jsonwebtoken';
import moment from 'moment';

export namespace JWTService {
  export const ttl = Number(process.env.JWT_TOKEN_TTL || 60);

  const secret = String(process.env.JWT_SECRET || 'secret');

  export const signPayload = async (payload: string | Buffer | object): Promise<string> => {
    const option: SignOptions = {
      expiresIn: moment().add(ttl, 'minutes').unix(),
    };
    try {
      const token = sign(payload, secret);
      return token;
    } catch (err) {
      throw err;
    }
  };

  export const verifyToken = async (token: string): Promise<object | string> => {
    const option: VerifyOptions = {};

    try {
      const payload = verify(token, secret);

      return payload;
    } catch (err) {
      throw err;
    }
  };
}
