import { useContext } from "react";
import toast from "react-hot-toast";

import { CartContext } from "../context/CartContext";

const allProducts = [
  { name: "Coffee Beans", price: 165, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
  { name: "Bamboo Board", price: 267, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c" },
  { name: "Desk Organizer", price: 255, img: "https://images.unsplash.com/photo-1586953208448-b95a79798f07" },
  { name: "Coffee Mug", price: 285, img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d" },
  { name: "Blanket", price: 450, img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7" },
  { name: "Soap", price: 120, img: "https://images.unsplash.com/photo-1607000975560-83d5f69e6d1b" },
  { name: "Lamp", price: 390, img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4" },
  { name: "Lipstick", price: 175, img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa" },
  { name: "Perfume", price: 799, img: "https://images.unsplash.com/photo-1585386959984-a4155223f6c1" },
  { name: "Shampoo", price: 199, img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348" },
  { name: "Face Cream", price: 299, img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348" },
  { name: "Dry Fruits", price: 499, img: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2" },
  { name: "Chocolate Box", price: 349, img: "https://images.unsplash.com/photo-1606312619344-8bafc0c94d3b" },
  { name: "Watch", price: 999, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
  { name: "Shoes", price: 1299, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
  { name: "Bag", price: 899, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3" },
];

export default function Products() {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="chart-box">
      <h2>Products</h2>

      <div className="grid" style={{ marginTop: "20px" }}>
        {allProducts.map((product) => (
          <div key={product.name} className="card product-card">
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            <button onClick={() => handleAddToCart(product)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}
