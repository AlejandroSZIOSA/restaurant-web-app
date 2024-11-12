import { useLocation } from "react-router-dom";
import { useState } from "react";
import type { Item } from "../../types/types";

interface CartItem extends Item {
  quantity: number;
}

export default function CartPage() {
  const location = useLocation();
  const receivedData: CartItem[] = location.state;

  const [cartItems, setCartItems] = useState<CartItem[]>(receivedData);

  function handlePlusQuantity(id: number, q: number): void {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: q + 1 } : item
      )
    );
  }

  function handleLessQuantity(id: number, q: number): void {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: q - 1 } : item
      )
    );
  }

  return (
    <>
      <header> 🛒 </header>
      <main>
        <section>
          <ol>
            {cartItems.map((i) => (
              <li key={i.id}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>{i.name}</p>
                    <p>{i.price}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                      onClick={() => handlePlusQuantity(i.id, i.quantity)}
                    >
                      +
                    </button>
                    <p>{i.quantity}</p>
                    <button
                      onClick={() => handleLessQuantity(i.id, i.quantity)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <h2>TOTALT</h2>
              <p>Inc 20% moms</p>
            </div>
            <div>
              <h2>Price</h2>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
