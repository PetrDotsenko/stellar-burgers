import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';

export type RegisterUIProps = PageUIProps & {
  password: string;
  userName: string;
  setPassword: (event: ChangeEvent<HTMLInputElement>) => void;
  setUserName: (event: ChangeEvent<HTMLInputElement>) => void;
};
