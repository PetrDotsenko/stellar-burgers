import '../../index.css';
import React, { useEffect, useMemo } from 'react';
import styles from './app.module.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../services/store';

import {
  ConstructorPage,
  Feed,
  NotFound404,
  Register,
  Login,
  ResetPassword,
  Profile,
  ProfileOrders,
  ForgotPassword
} from '@pages';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';

import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingridientsSlice';
import { fetchUser } from '../../services/slices/user-slice';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = (location.state as { background?: Location })?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUser());
  }, [dispatch]);

  const closeFeedModal = useMemo(() => () => navigate('/feed'), [navigate]);
  const closeIngredientModal = useMemo(() => () => navigate('/'), [navigate]);
  const closeProfileOrderModal = useMemo(
    () => () => navigate('/profile/orders'),
    [navigate]
  );

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background ?? location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute unAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute unAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute unAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute unAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo isInModal={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/ingredients/:id'
          element={<IngredientDetails showTitle={true} />}
        />
        <Route path='/feed/:number' element={<OrderInfo isInModal={false} />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal onClose={closeFeedModal}>
                <OrderInfo isInModal={true} />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeIngredientModal}>
                <IngredientDetails showTitle={false} />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal onClose={closeProfileOrderModal}>
                  <OrderInfo isInModal={true} />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

const AppRoot: React.FC = () => (
  <Provider store={store}>
    <Router>
      <AppContent />
    </Router>
  </Provider>
);

export default AppRoot;
