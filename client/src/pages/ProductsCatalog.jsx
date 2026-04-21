import { useContext, useMemo } from "react";
import toast from "react-hot-toast";
import { Minus, Plus, Search, Sparkles } from "lucide-react";
import { useOutletContext } from "react-router-dom";

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

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function ProductsCatalog() {
  const { cart, addToCart, increaseQty, decreaseQty } = useContext(CartContext);
  const { productSearch = "" } = useOutletContext() || {};

  const filteredProducts = useMemo(() => {
    const searchValue = productSearch.trim().toLowerCase();

    if (!searchValue) return allProducts;

    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchValue)
    );
  }, [productSearch]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div
      className="w-full"
      style={{
        minHeight: "calc(100% + 28px)",
        marginBottom: "-28px",
        paddingBottom: "28px",
      }}
    >
      <div
        className="eb-products-page"
        style={{
          alignContent: "start",
          gap: 26,
        }}
      >
        <div
          className="eb-card"
          style={{
            display: "grid",
            gap: 12,
            paddingTop: 22,
            paddingBottom: 22,
          }}
        >
          <span className="eb-pill eb-pill--neutral" style={{ width: "fit-content" }}>
            <Sparkles size={14} />
            Curated catalog
          </span>
          <div
            style={{
              display: "grid",
              gap: 8,
              maxWidth: 620,
            }}
          >
            <p
              style={{
                margin: 0,
                color: "var(--eb-muted)",
                lineHeight: 1.7,
              }}
            >
              Explore your current catalog, search products quickly, and keep the browsing flow clean and organized.
            </p>
          </div>
        </div>

        {!filteredProducts.length ? (
          <article className="eb-card">
            <div className="eb-empty-state">
              <div className="eb-empty-state__icon">
                <Search size={24} />
              </div>
              <h3>No matching products</h3>
              <p>Try a different product name to explore the full catalog again.</p>
            </div>
          </article>
        ) : (
          <div
            className="eb-products-grid"
            style={{
              alignItems: "stretch",
            }}
          >
            {filteredProducts.map((product) => {
              const originalPrice = product.price * 2;
              const cartItem = cart.find((item) => item.name === product.name);
              const quantity = cartItem?.qty ?? 0;

              return (
                <article key={product.name} className="eb-product-card">
                  <div className="eb-product-card__media">
                    <span className="eb-product-card__badge">50% OFF</span>
                    <img
                      src={`${product.img}?w=400&auto=format&fit=crop&q=60`}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-40 object-cover"
                    />
                  </div>

                  <div className="eb-product-card__body">
                    <h3>{product.name}</h3>
                    <div className="eb-product-card__price">
                      <strong>{formatCurrency(product.price)}</strong>
                      <span>{formatCurrency(originalPrice)}</span>
                    </div>
                    <div
                      style={{
                        minHeight: 50,
                        display: "flex",
                        alignItems: "center",
                        transition: "all 0.22s ease",
                      }}
                    >
                      {quantity > 0 ? (
                        <div
                          style={{
                            width: "100%",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 10,
                            padding: "6px",
                            borderRadius: 999,
                            border: "1px solid var(--eb-border)",
                            background: "var(--eb-surface-strong)",
                            boxShadow: "0 10px 22px rgba(90, 67, 48, 0.08)",
                          }}
                        >
                          <button
                            type="button"
                            aria-label={`Decrease ${product.name}`}
                            onClick={() => decreaseQty(product.name)}
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: 999,
                              display: "grid",
                              placeItems: "center",
                              padding: 0,
                              border: "1px solid var(--eb-border)",
                              background: "var(--eb-surface)",
                              color: "var(--eb-text)",
                              boxShadow: "none",
                            }}
                          >
                            <Minus size={16} />
                          </button>

                          <strong
                            style={{
                              minWidth: 28,
                              textAlign: "center",
                              color: "var(--eb-text)",
                              fontSize: "1rem",
                            }}
                          >
                            {quantity}
                          </strong>

                          <button
                            type="button"
                            aria-label={`Increase ${product.name}`}
                            onClick={() => increaseQty(product.name)}
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: 999,
                              display: "grid",
                              placeItems: "center",
                              padding: 0,
                              border: "1px solid var(--eb-border)",
                              background: "var(--eb-surface)",
                              color: "var(--eb-text)",
                              boxShadow: "none",
                            }}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="eb-primary-button"
                          type="button"
                          style={{ width: "100%" }}
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
