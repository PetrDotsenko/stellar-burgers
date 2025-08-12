import { ReactNode } from 'react';

export type TModalUIProps = {
  title?: React.ReactNode;
  onClose: () => void;
  children?: ReactNode;
  dataCy?: string;
  dataCyClose?: string;
};
