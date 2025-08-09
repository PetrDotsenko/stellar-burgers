import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logout } from '../../services/slices/user-slice';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () =>
    dispatch(logout())
      .unwrap()
      .then(() => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
