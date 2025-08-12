import { ChangeEvent, SyntheticEvent } from 'react';

export type PageUIProps = {
  errorText: string | undefined;
  email: string;
  setEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: SyntheticEvent) => void;
};
