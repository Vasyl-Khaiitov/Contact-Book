import { Route, Routes } from 'react-router-dom';
import css from './App.module.css';
import { lazy } from 'react';
import Layout from '../Layout/Layout';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegisterPage = lazy(
  () => import('../../pages/RegisterPage/RegisterPage'),
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ContactPage = lazy(() => import('../../pages/ContactPage/ContactPage'));
const ErrorPage = lazy(() => import('../../pages/ErrorPage/ErrorPage'));

export default function App() {
  return (
    <div className={css.container}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </div>
  );
}
