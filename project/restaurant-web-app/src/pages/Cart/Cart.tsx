import { useLocation } from "react-router-dom";
import type { Item } from "../../types/types";
import { useState } from "react";

interface CartItem extends Item {
  quantity: number;
}

export default function CartPage() {
  const location = useLocation();
  const receivedData: CartItem[] = location.state;

  const [cartItems, setCartItems] = useState<CartItem[]>(receivedData);

  return (
    <main>
      <h2>Cart page</h2>
      <p>{cartItems.length}</p>
      <ol>
        {cartItems.map((i) => (
          <li key={i.id}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button> + </button>
              <p>antal</p>
              <button> - </button>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
