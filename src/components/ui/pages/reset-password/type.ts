import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';

export type ResetPasswordUIProps = Omit<PageUIProps, 'email' | 'setEmail'> & {
  password: string;
  token: string;
  setPassword: (event: ChangeEvent<HTMLInputElement>) => void;
  setToken: (event: ChangeEvent<HTMLInputElement>) => void;
};
