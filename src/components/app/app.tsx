import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import {
  selectIsAuth,
  selectUserLoading
} from '../../services/slices/user-slice';
import { fetchUser, selectUser } from '../../services/slices/user-slice';
import {
  selectLoadedOrder,
  selectOrderLoading
} from '../../services/slices/orders-slice';
import { Preloader } from '@ui';

// Тип для ProtectedRouteElement
type ProtectedRouteElementProps = {
  element: React.ReactElement;
  onlyUnAuth?: boolean;
};

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({
  element,
  onlyUnAuth = false
}) => {
  const isAuth = useAppSelector(selectIsAuth);
  const location = useLocation();
  const isUserLoading = useAppSelector(selectUserLoading);

  if (isUserLoading) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuth) {
    return <Navigate to='/' replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    // Передаём текущую локацию в state, чтобы после логина вернуть пользователя
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return element;
};

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orderData = useAppSelector(selectLoadedOrder);
  const isOrderLoading = useAppSelector(selectOrderLoading);
  const orderNumber = isOrderLoading ? '' : `#${orderData?.number}`;

  const state = location.state as { background?: Location } | undefined;
  const background = state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUser());
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={<ProtectedRouteElement onlyUnAuth element={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRouteElement onlyUnAuth element={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRouteElement onlyUnAuth element={<ForgotPassword />} />
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRouteElement onlyUnAuth element={<ResetPassword />} />
          }
        />
        <Route
          path='/profile'
          element={<ProtectedRouteElement element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRouteElement element={<ProfileOrders />} />}
        />
        <Route path='/feed/:number' element={<OrderInfo isPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails isPage />} />
        <Route
          path='/profile/orders/:number'
          element={<ProtectedRouteElement element={<OrderInfo isPage />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={orderNumber} onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингридиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRouteElement
                element={
                  <Modal title={orderNumber} onClose={handleCloseModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
