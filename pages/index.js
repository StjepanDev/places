import Layout from '../components/Layout';
import Link from 'next/link';
import PlaceItem from '../components/PlaceItem';
import { API_URL } from '../config/index';

export default function HomePage({ places }) {
  console.log(places);
  return (
    <Layout>
      <title>Nice Places</title>
      {places.length < 1 && <h3>No place to show</h3>}
      <h1>Home</h1>
      {places.map((pl) => (
        <PlaceItem key={pl.id} place={pl} />
      ))}
      {places.length > 0 && (
        <Link href="/places">
          <a className="btn-secondary">View All</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/places?_sort=date:ASC&_limit=3`);
  const places = await res.json();

  return {
    props: { places: places.slice(0, 3) },

    revalidate: 1,
  };
}
