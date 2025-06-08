import { Formik, Form, Field, ErrorMessage } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import 'yup-phone-lite';
import css from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';

const OrderSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('This is a required field'),
  number: Yup.string()
    .phone('UA', 'Please enter a valid phone number')
    .required('A phone number is required'),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = (value, helpers) => {
    dispatch(addContact(value))
      .unwrap()
      .then(() => {
        toast.success('Contact add successful!');
      })
      .catch((error) => {
        toast.error('Contact failed: ' + error.message);
      });

    helpers.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={OrderSchema}
    >
      <Form className={css.form}>
        <label>
          Name <br />
          <Field className={css.form_input} type="text" name="name" />
        </label>
        <ErrorMessage
          name="name"
          component="span"
          className={css.error_message}
        />
        <label>
          Number
          <Field
            className={css.form_input}
            type="tel"
            name="number"
            placeholder="+380"
          />
        </label>
        <ErrorMessage
          name="number"
          component="span"
          className={css.error_message}
        />
        <button className={css.add_btn} type="submit">
          Add contact
        </button>
        <Toaster position="top-right" />
      </Form>
    </Formik>
  );
}
