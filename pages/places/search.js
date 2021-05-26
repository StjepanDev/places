import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import PlaceItem from '../../components/PlaceItem';
import styles from '../../styles/Place.module.css';
import { API_URL } from '../../config/index';

export default function SearchPage({ places }) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      {places.length < 1 && <h3>No place to show</h3>}
      <Link href="/places">
        <a className={styles.back}>{'<'} Go Back</a>
      </Link>
      <h1>Search Results for : {router.query.term} </h1>

      {places.map((pl) => (
        <PlaceItem key={pl.id} place={pl} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { description_contains: term },
        { influencers_contains: term },
        { address_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/places?${query}`);
  const places = await res.json();

  return {
    props: { places: places.reverse() },
  };
}
