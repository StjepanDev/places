import Layout from '../../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL } from '../../config/index';
import styles from '../../styles/Form.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function addPlacePage() {
  const [values, setValues] = useState({
    name: '',
    influencers: '',
    address: '',
    country: '',
    date: '',
    time: '',
    description: '',
  });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }
    console.log(values);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New Place">
      <Link href="/places">Go Back</Link>
      <h1>Add Place To Be</h1>
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
              value={values.date}
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
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}
