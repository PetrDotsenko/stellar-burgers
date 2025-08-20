import { ReactElement } from 'react';

export type ProtectedRouteElementProps = {
  element: ReactElement;
  onlyUnAuth?: boolean;
};
