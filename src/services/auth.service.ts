import { USER_PASSWORD_PAIRS } from '../constants/credentials';
import { JWTService } from './jwt.service';

export namespace AuthService {
  export const getToken = async (basicHeader: string) => {
    const credential = Buffer.from(basicHeader.replace(/^(Basic|basic)\ /, '').trim(), 'base64')
      .toString()
      .split(':');

    const user = USER_PASSWORD_PAIRS.find(({ user, password }) => user === credential[0] && password === credential[1]);
    if (!user) throw new Error('Invalid user/password');
    const token = await JWTService.signPayload({ user: user.user });

    return token;
  };

  export const verifyToken = async (bearerToken: string): Promise<string | null> => {
    const token = bearerToken.replace(/^(Bearer|bearer)\ /, '');

    const data = (await JWTService.verifyToken(token)) as { [key: string]: string };
    if (!data.user) return null;

    return data.user;
  };
}
