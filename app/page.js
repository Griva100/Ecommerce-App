"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const { addToCart, cart } = useCart();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const cartQty = cart.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const filtered = filter === "All"
    ? products
    : products.filter((p) => p.category === filter);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/cart"
          className="hover:text-blue-300 text-blue-400 transition-colors flex items-center gap-1 font-medium text-sm sm:text-base md:text-lg relative"
        >
          <i className="pi pi-shopping-cart text-lg md:text-xl"></i> 
          <span className="hidden sm:inline">Cart</span>
          {cartQty > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {cartQty}
            </span>
          )}
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 align-center">
        <label className="font-semibold mr-2">Filter:</label>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-full text-sm border transition ${
              filter === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="group border rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white"
          >
            <div className="relative w-full h-48">
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl transform group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1 text-gray-800 hover:text-blue-600">{product.title}</h2>
              <p className="text-gray-600 mb-2">₹{product.price}</p>
              <button
                onClick={() => {
                  addToCart(product);
                  Swal.fire({
                    title: 'Added to Cart',
                    text: `${product.title} has been added to your cart.`,
                    icon: 'success',
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: false,
                  });
                }} 
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}