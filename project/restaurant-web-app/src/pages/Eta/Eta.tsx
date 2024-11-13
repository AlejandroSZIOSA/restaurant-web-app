import { useLocation, useNavigate } from "react-router-dom";
import { PRIVATE_KEY, ORDER_PRIVATE_ID } from "../../../private-key/key";
import { useEffect, useState } from "react";

type Order = {
  items?: number[] | null;
};

const URL: string = `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${ORDER_PRIVATE_ID}/orders`;

export default function EtaPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const itemsIds: number[] = location.state;

  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    postData(URL, itemsIds);
  }, []);

  function handleToOrderSelectionPage(): void {
    navigate("/");
  }

  async function postData(url: string, ids: number[]) {
    const newOrder: Order = { items: ids };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-zocom": PRIVATE_KEY,
        },
        body: JSON.stringify(newOrder),
      });
      const result = await response.json();
      setOrderId(result.order.id);
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }
  return (
    <div>
      <h1>DINA WONTONS TILLAGAS!</h1>
      <p> {orderId}</p>
      <button onClick={handleToOrderSelectionPage}>
        GÖR EN NY BESTÄLLNING
      </button>
    </div>
  );
}
