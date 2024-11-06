import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    deliveryOption: "retirada",
  });

  // Carregar os produtos do localStorage ao iniciar
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProducts = [...products, formData];
    setProducts(updatedProducts);

    // Salva a lista atualizada no localStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      deliveryOption: "retirada",
    });
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="App">
      <h1>Catálogo de Produtos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome do produto"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descrição do produto"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Preço"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL da imagem"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <select
          name="deliveryOption"
          value={formData.deliveryOption}
          onChange={handleChange}
        >
          <option value="retirada">Retirada</option>
          <option value="entrega">Entrega</option>
        </select>
        <button type="submit">Cadastrar Produto</button>
      </form>

      <h3>Produtos Cadastrados</h3>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Preço: R${product.price}</p>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100px" }}
            />
            <p>Opção de entrega: {product.deliveryOption}</p>
            <button onClick={() => handleDelete(index)}>Excluir Produto</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
