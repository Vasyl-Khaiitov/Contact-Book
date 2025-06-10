import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './LoginForm.module.css';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .transform((value) => String(value))
    .matches(/^[a-zA-Z0-9]+$/, 'Password can contain letters and numbers only')
    .min(7, 'Password must be at least 7 characters long')
    .required('Password is required'),
});

export default function LogInForm() {
  const dispatch = useDispatch();

  const handleSignIn = (value, actions) => {
    const formattedData = {
      email: value.email,
      password: String(value.password),
    };
    dispatch(logIn(formattedData))
      .unwrap()
      .then(() => {
        toast.success('Login successful!');
      })
      .catch((error) => {
        toast.error('Login failed: ' + error.message);
      });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSignIn}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Email
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="span" className={css.error} />
        </label>
        <label className={css.label}>
          Password
          <Field
            type="password"
            name="password"
            placeholder="min 7 characters"
          />
          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />
        </label>
        <button className={css.btn_login} type="submit">
          Log In
        </button>
        <Toaster position="top-right" />
      </Form>
    </Formik>
  );
}
