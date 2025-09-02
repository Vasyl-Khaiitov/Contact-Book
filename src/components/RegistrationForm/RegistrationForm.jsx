import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import * as Yup from 'yup';
import css from './RegistrationForm.module.css';
import toast, { Toaster } from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .required('Name is required'),
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .transform((value) => String(value))
    .matches(/^[a-zA-Z0-9]+$/, 'Password can contain letters and numbers only')
    .min(7, 'Password must be at least 7 characters long')
    .required('Password is required'),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (value, actions) => {
    const formattedData = {
      name: value.name,
      email: value.email,
      password: String(value.password),
    };

    dispatch(register(formattedData))
      .unwrap()
      .then(() => {
        toast.success('Registration successful!');
      })
      .catch((error) => {
        toast.error('Registration failed: ' + error.message);
      });
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Username
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="span" className={css.error} />
        </label>
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
        <button className={css.btn_registr} type="submit">
          Register
        </button>
        <Toaster position="top-right" />
      </Form>
    </Formik>
  );
}
