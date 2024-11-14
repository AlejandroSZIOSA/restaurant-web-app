import { useLocation, useNavigate } from "react-router-dom";
import { PRIVATE_KEY, ORDER_PRIVATE_ID } from "../../../private-key/key";
import { useEffect, useState } from "react";

type Order = {
  items?: number[] | null;
};

interface OrderData {
  id?: string;
  timestamp?: string;
  eta?: string;
}

type OrderDataResult = {
  order?: OrderData;
};

const URL: string = `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${ORDER_PRIVATE_ID}/orders`;

export default function EtaPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const itemsIds: number[] = location.state;

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [waitingTime, setWaitingTime] = useState<number>(0);

  useEffect(() => {
    postData(URL, itemsIds);
  }, []);

  useEffect(() => {
    handleWaitingTime();
  }, [orderData]);

  async function postData(url: string, ids: number[]) {
    // console.log(ids);
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
      const result: OrderDataResult = await response.json();
      if (result) {
        const orderData: OrderData = {
          id: result.order?.id,
          eta: result.order?.eta,
          timestamp: result.order?.timestamp,
        };
        setOrderData((prevUser) => ({
          ...prevUser,
          ...orderData,
        }));
      }
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }

  function handleWaitingTime(): void {
    let eta: Date = new Date(orderData?.eta);
    let etaHour: number = eta.getHours();
    let etaMinutes: number = eta.getMinutes();
    //console.log("eta", eta);

    let timeStamp: Date = new Date(orderData?.timestamp);
    let timeStampHour: number = timeStamp.getHours();
    let timeStampMinutes = timeStamp.getMinutes();
    //console.log("current time", timeStamp);

    let hoursDifferenceToMinutes: number = (etaHour - timeStampHour) * 60;
    let minutesDifference: number = etaMinutes - timeStampMinutes;
    let finalWaitingTime: number = hoursDifferenceToMinutes + minutesDifference;

    setWaitingTime(finalWaitingTime);
  }

  function handleToOrderSelectionPage(): void {
    navigate("/");
  }

  return (
    <div>
      <h1>DINA WONTONS TILLAGAS!</h1>
      <p>Waiting Minutes: {waitingTime}</p>
      <p> # {orderData?.id}</p>
      <button onClick={handleToOrderSelectionPage}>
        GÖR EN NY BESTÄLLNING
      </button>
    </div>
  );
}
