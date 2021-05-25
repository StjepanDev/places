const { places } = require('./dummydata.json');

export default (req, res) => {
  const place = places.filter((pl) => pl.slug === slug);

  if (req.method === 'GET') {
    res.status(200).json(places);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
