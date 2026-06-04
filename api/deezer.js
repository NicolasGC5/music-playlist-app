export default async function handler(req, res) {
  const { q } = req.query;
  
  try {
    const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(q)}`);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
}