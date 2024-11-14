import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Item } from "../../types/types";

interface CartItem extends Item {
  quantity: number;
}

export default function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems_Data: CartItem[] = location.state;

  const [cartItems, setCartItems] = useState<CartItem[]>(cartItems_Data);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    handleTotalPrice();
  }, [handlePlusQuantity, handleLessQuantity]);

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

  function handleTotalPrice(): void {
    let subTotal: number = 0;
    let total: number = 0;
    cartItems.forEach((item) => {
      subTotal = item.quantity * item.price;
      total = total + subTotal;
    });
    setTotalPrice(total);
  }

  function handleTakeMyMoney(): void {
    let newOrder: number[] = [];
    cartItems.forEach((item) => {
      newOrder.push(item.id);
    });

    navigate("/eta", { state: newOrder });
  }

  return (
    <div>
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
                    <p>{i.price} SEK</p>
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
        <section style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2>TOTALT</h2>
              <p>Inc 20% moms</p>
            </div>
            <div>
              <h2>{totalPrice}</h2>
            </div>
          </div>
          <div>
            <button onClick={handleTakeMyMoney}>Take my money</button>
          </div>
        </section>
      </main>
    </div>
  );
}
