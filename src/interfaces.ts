import { Request } from 'express';

export interface AuthenticateRequest extends Request {
  user: string;
}

export interface BodyRequest<B extends object> extends Request {
  body: B;
}

export interface AuthenticateBodyRequest<B extends object> extends AuthenticateRequest {
  body: B;
}

export enum EventAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export interface KafkaEvent<D extends object> {
  action: EventAction;
  key?: string | object;
  data: D;
}
