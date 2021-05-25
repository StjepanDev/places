const { places } = require('./data.json');

export default (req, res) => {
  const place = places.filter((pl) => pl.slug === req.query.slug);

  if (req.method === 'GET') {
    res.status(200).json(place);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
