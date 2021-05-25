import Layout from '../../components/Layout';
import PlaceItem from '../../components/PlaceItem';
import { API_URL } from '../../config/index';

export default function HomePage({ places }) {
  return (
    <Layout>
      <title>Nice Places</title>
      {places.length < 1 && <h3>No place to show</h3>}
      <h1>Home</h1>
      {places.map((pl) => (
        <PlaceItem key={pl.id} place={pl} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/places`);
  const places = await res.json();

  return {
    props: { places: places.reverse() },

    revalidate: 1,
  };
}
