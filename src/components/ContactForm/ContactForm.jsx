import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import css from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';

const OrderSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('This is a required field'),
  usernumber: Yup.string()
    .phone('UA', 'Please enter a valid phone number')
    .required('A phone number is required'),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const fieldId = useId();

  const handleSubmit = (value, helpers) => {
    dispatch(
      addContact({
        id: value.id,
        name: value.username,
        number: value.usernumber,
      }),
    );

    helpers.resetForm();
  };

  return (
    <Formik
      initialValues={{
        username: '',
        usernumber: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={OrderSchema}
    >
      <Form className={css.form}>
        <label htmlFor={`${fieldId}-username`}>Name</label>
        <Field
          className={css.form_input}
          type="text"
          name="username"
          id={`${fieldId}-username`}
        />
        <ErrorMessage
          name="username"
          component="span"
          className={css.error_message}
        />
        <label htmlFor={`${fieldId}-usernumber`}>Number</label>
        <Field
          className={css.form_input}
          type="tel"
          name="usernumber"
          id={`${fieldId}-usernumber`}
          placeholder="+380"
        />
        <ErrorMessage
          name="usernumber"
          component="span"
          className={css.error_message}
        />
        <button className={css.add_btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
