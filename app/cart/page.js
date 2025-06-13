"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, updateCartItemQty, removeFromCart } = useCart();
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const qty = cart.reduce((sum, item) => sum + item.qty, 0);
    const price = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
    setTotalQty(qty);
    setTotalPrice(price);
  }, [cart]);

  const increment = (id) => {
    const item = cart.find((p) => p.id === id);
    if (item) updateCartItemQty(id, item.qty + 1);
  };

  const decrement = (id) => {
    const item = cart.find((p) => p.id === id);
    if (item && item.qty > 1) {
      updateCartItemQty(id, item.qty - 1);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4"> Your Cart</h1>
        <Link href="/" className="text-blue-400 mb-6 inline-block hover:text-blue-300">
          ← Back to Products
        </Link>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-24 h-24 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                      sizes="96px"
                      priority
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrement(item.id)}
                    className="px-3 py-1 bg-gray-400 hover:bg-gray-300 rounded-l"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-medium text-gray-800">{item.qty}</span>
                  <button
                    onClick={() => increment(item.id)}
                    className="px-3 py-1 bg-gray-400 hover:bg-gray-300 rounded-r"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <p className="text-lg font-medium"> Total Quantity: {totalQty}</p>
            <p className="text-xl font-bold mt-2"> Total Price: ₹{totalPrice}</p>
            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}