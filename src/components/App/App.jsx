import { Route, Routes } from 'react-router-dom';
import css from './App.module.css';
import { lazy, Suspense, useEffect } from 'react';
import Layout from '../Layout/Layout';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations';
import { selectisRefreshing } from '../../redux/auth/selectors';
import RestrictedRoute from '../RestrictredRoute/RestrictedRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const ProfilePage = lazy(() => import('../../pages/ProfilePage/ProfilePage'));
const RegisterPage = lazy(
  () => import('../../pages/RegisterPage/RegisterPage'),
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ContactPage = lazy(() => import('../../pages/ContactPage/ContactPage'));
const ErrorPage = lazy(() => import('../../pages/ErrorPage/ErrorPage'));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectisRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <strong>Refreshing user please weait ...</strong>
  ) : (
    <div className={css.container}>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute redirectTo="/" page={<RegisterPage />} />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute redirectTo="/contacts" page={<LoginPage />} />
              }
            />
            <Route
              path="/contacts"
              element={<PrivateRoute page={<ContactPage />} />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute page={<ProfilePage />} />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}
