import Layout from '../../components/Layout';
import API_URL from '../../config/index';

export default function PlacePage() {
  return (
    <Layout>
      <h1></h1>
    </Layout>
  );
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`http://localhost:3000/api/places/slug/`);
//   console.log(res);
//   // const places = await res.json();
//   return { props: {} };
// }
