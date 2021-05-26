import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/PlaceItem.module.css';

export default function PlaceItem({ place }) {
  return (
    <div className={styles.place}>
      <div className={styles.img}>
        <Image
          src={
            place.image
              ? place.image.formats.thumbnail.url
              : '/images/IMG_20190706_162512.jpg}'
          }
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>
          {place.date} at {place.time}
        </span>
        <h3>{place.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/places/${place.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
