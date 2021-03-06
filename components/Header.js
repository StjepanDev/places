import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Nice Places</a>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/places">
              <a>Places</a>
            </Link>
          </li>
          <li>
            <Link href="/places/add">
              <a>Add Place</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
