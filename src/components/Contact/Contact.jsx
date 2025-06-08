import css from './Contact.module.css';
import { FaPhone } from 'react-icons/fa6';
import { MdPerson4 } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';

const defaultImg =
  'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

export default function Contact({ name, number, id }) {
  const dispatch = useDispatch();

  const handleClickDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      <img src={defaultImg} alt="avatar" width={45} height={50} />
      <ul>
        <li>
          <MdPerson4 size={20} />
          {name}
        </li>
        <li>
          <FaPhone size={15} />
          {number}
        </li>
      </ul>

      <button
        className={css.delete_btn}
        type="button"
        id={id}
        onClick={handleClickDelete}
      >
        Delete
      </button>
    </>
  );
}
