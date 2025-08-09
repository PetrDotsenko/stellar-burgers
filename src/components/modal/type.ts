import { ReactNode } from 'react';

export type TModalProps = {
  title: string;
  onClose: () => void;
  children?: ReactNode;
  dataCy?: string;
  dataCyClose?: string;
};
