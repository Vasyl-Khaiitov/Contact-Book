import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import * as Yup from 'yup';
import css from './RegistrationForm.module.css';
import toast, { Toaster } from 'react-hot-toast';

const validationSchema = Yup.object({
  name: Yup.string().min(3, 'Min 3 characters').required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().min(7, 'Min 7 characters').required('Required'),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success('Registration successful!');
      })
      .catch((error) => {
        toast.error('Registration failed: ' + error.message);
      });
    actions.resetForm();
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
