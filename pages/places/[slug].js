import Layout from '../../components/Layout';
import styles from '../../styles/Place.module.css';
import { API_URL } from '../../config/index';
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

export default function PlacePage({ place }) {
  const deletePlace = (e) => {};

  return (
    <Layout>
      <div className={styles.place}>
        <div className={styles.controls}>
          <Link href={`/places/edit/${place.id}`}>
            <a>
              <FaPencilAlt /> Edit Place
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deletePlace}>
            <FaTimes /> Delete Place
          </a>
        </div>
        <span>
          {new Date(place.date).toLocaleDateString('en-GB')} at {place.time}
        </span>
        <h1>{place.name}</h1>

        {place.image && (
          <div className={styles.image}>
            <Image
              src={place.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Influencers:</h3>
        <p>{place.influencers}</p>
        <h4>Location:</h4>
        <p>{place.address}</p>
        <h4>Description:</h4>
        <p>{place.description}</p>
        <Link href="/places">
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/places?slug=${slug}`);
  const places = await res.json();
  return {
    props: {
      place: places[0],
    },
  };
}
