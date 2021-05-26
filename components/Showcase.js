import Search from './Search';
import styles from '../styles/Showcase.module.css';

export default function Showcase() {
  return (
    <div className={styles.showcase}>
      <h1>Welcome To The Nice Places</h1>

      <Search />

      <h4>Find Awesome Places For Your Next Holiday</h4>
    </div>
  );
}
