import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import * as Yup from 'yup';
import css from './RegistrationForm.module.css';

// ? додати тостік з успішною або не успішною реєстрацією

const validationSchema = Yup.object({
  name: Yup.string().min(3, 'Min 3 characters').required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().min(7, 'Min 7 characters').required('Required'),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
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
          <ErrorMessage name="name" component="span" className={css.error} />
        </label>
        <label className={css.label}>
          Password
          <Field
            type="password"
            name="password"
            placeholder="min 7 characters"
          />
          <ErrorMessage name="name" component="span" className={css.error} />
        </label>
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
