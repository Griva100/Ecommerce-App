export default function handler(req, res) {
  if (req.method === "POST") {
    const item = req.body;
    res.status(200).json({ message: "Item added to cart", item });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}