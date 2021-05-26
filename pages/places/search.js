import qs from 'qs';
import Layout from '../../components/Layout';
import PlaceItem from '../../components/PlaceItem';
import { API_URL } from '../../config/index';

export default function SearchPage({ places }) {
  return (
    <Layout>
      <title>Nice Places</title>
      {places.length < 1 && <h3>No place to show</h3>}
      <h1>Places To Explore</h1>
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
