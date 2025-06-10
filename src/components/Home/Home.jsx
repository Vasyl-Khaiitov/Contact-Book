import PageTitle from '../../components/PageTitle/PageTitle';
import css from './Home.module.css';

export default function Home() {
  return (
    <div className={css.home_container}>
      <PageTitle>Contact Book</PageTitle>

      <p className={css.developer}>Developer: Khaitov Vasyl</p>

      <section className={css.description}>
        <h2>Manage Your Contacts Easily</h2>
        <p>
          Contact Book is a simple and efficient way to store and manage your
          personal and professional connections. With an intuitive interface,
          you can quickly add, edit, and search for contacts anytime.
        </p>

        <h2>Key Features:</h2>
        <ul>
          <li>📌 Add new contacts effortlessly</li>
          <li>🔍 Search and filter contacts instantly</li>
          <li>✏️ Edit contact information in real time (in a future update)</li>
          <li>🔒 Secure storage, only you have access</li>
        </ul>

        <h2>Why Use Contact Book?</h2>
        <p>
          Whether you need to keep track of friends, colleagues, or business
          partners, Contact Book helps you stay organized. Easily find the
          people you need and keep their details up-to-date.
        </p>
      </section>
    </div>
  );
}
