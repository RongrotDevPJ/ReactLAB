import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./features/Navbar";
import Container from "./features/Container";
import Home from "./features/Home";
import AddForm from "./features/Product/AddForm";
import UpdateForm from "./features/Product/UpdateForm";
import axios from "axios";
const productsData = require("./app/data");

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  (async () => {
    try {
      const res = await axios.get("/react-redux-class/products");
      const merged = [...productsData, ...res.data];
      const map = new Map(merged.map(p => [p.id, p]));
      setProducts(Array.from(map.values()));
    } catch (err) {
      console.error("Fetch failed (CORS/network). Falling back to seed.", err);
      setProducts(productsData); 
    } finally {
      setLoading(false);
    }
  })();
}, []);


  const addProduct = (p) => {
    const newId = products.length ? Math.max(...products.map(x => Number(x.id))) + 1 : 1;
    setProducts(prev => [...prev, { ...p, id: newId }]);
  };

  const updateProduct = (p) =>
    setProducts(prev => prev.map(x => (String(x.id) === String(p.id) ? { ...x, ...p } : x)));

  const deleteProduct = (id) =>
    setProducts(prev => prev.filter(x => String(x.id) !== String(id)));

  if (loading) return <div>Loading products…</div>;

  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/create-product" element={<AddForm addProduct={addProduct} />} />
          <Route
            path="/update-product/:id"
            element={
              <UpdateForm
                products={products}
                onUpdate={updateProduct}
                onDelete={deleteProduct}
              />
            }
          />
        </Routes>
      </Container>
    </>
  );
}
