import Layout from '../../../components/Layout';
import Modal from '../../../components/Modal';
import { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '../../../config/index';
import styles from '../../../styles/Form.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

export default function EditPlacePage({ place }) {
  console.log(place);
  const [values, setValues] = useState({
    name: place.name,
    influencers: place.influencers,
    address: place.address,
    country: place.country,
    date: place.date,
    time: place.time,
    description: place.description,
  });

  const [image, setImage] = useState(
    place.image ? place.image.formats.thumbnail.url : null
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }
    const res = await fetch(`${API_URL}/places/${place.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error('something went wrong');
    } else {
      const place = await res.json();
      router.push(`/places/${place.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New Place">
      <Link href="/places">Go Back</Link>
      <h1>Edit Place</h1>
      <ToastContainer autoClose={3000} position="top-center" />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Place Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="influencers">Influencers</label>
            <input
              type="text"
              id="influencers"
              name="influencers"
              value={values.influencers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Place Location</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="country">Place Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={values.country}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Place Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Edit Event" className="btn" />
      </form>

      <h2>Place Preview</h2>

      {image ? (
        <Image src={image} height={100} width={170} />
      ) : (
        <div>
          <p>No Image Uploaded</p>
        </div>
      )}

      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        Image Upload
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/places/${id}`);
  const place = await res.json();

  return {
    props: {
      place,
    },
  };
}
