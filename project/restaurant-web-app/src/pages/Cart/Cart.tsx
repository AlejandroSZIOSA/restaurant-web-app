import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Item } from "../../types/types";
import cartLogo from "/cart.svg";

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
    if (q >= 1) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: q + 1 } : item
        )
      );
    }
  }

  function handleLessQuantity(id: number, q: number): void {
    if (q > 1) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: q - 1 } : item
        )
      );
    }
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
    let ordersId: number[] = [];
    cartItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        ordersId.push(item.id);
      }
    });
    navigate("/eta", { state: ordersId });
  }

  return (
    <div style={{ background: "#EEE", height: "926px" }}>
      <header style={{ display: "flex", justifyContent: "end" }}>
        <img src={cartLogo}></img>{" "}
      </header>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          height: "926px",
          gap: "10px",
        }}
      >
        <section style={{ display: "flex", justifyContent: "left" }}>
          <ol
            style={{
              display: "flex",
              flexDirection: "column",
              background: "aqua",
              width: "370px",
              height: "600px",
            }}
          >
            {cartItems.map((i) => (
              <li key={i.id} style={{ listStyle: "none" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "yellow",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2>
                      {i.name.toUpperCase()}
                      ...................................... {i.price} SEK
                    </h2>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                      style={{ borderRadius: "50%", padding: "10px" }}
                      onClick={() => handlePlusQuantity(i.id, i.quantity)}
                    >
                      +
                    </button>
                    <p style={{ padding: "0px 10px 0px 10px " }}>
                      {i.quantity} stycken
                    </p>
                    <button
                      style={{ borderRadius: "50%", padding: "10px" }}
                      onClick={() => handleLessQuantity(i.id, i.quantity)}
                    >
                      -
                    </button>
                  </div>
                  <hr style={{ width: "-moz-available" }}></hr>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            background: "aquamarine",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div style={{ display: "block" }}>
              <h2>TOTALT</h2>
              <p style={{ paddingLeft: "30px" }}>Inc 20% moms</p>
            </div>
            <div style={{ paddingLeft: "150px" }}>
              <h1>{totalPrice} SEK</h1>
            </div>
          </div>
        </section>
        <section>
          <div
            onClick={handleTakeMyMoney}
            style={{
              display: "block",
              padding: "2px",
              background: "black",
            }}
          >
            <h1 style={{ color: "white" }}>Take my money</h1>
          </div>
        </section>
      </main>
    </div>
  );
}
