import { useState, useEffect } from "react";
import { PRIVATE_KEY } from "../../../private-key/key";
import MainMenuList from "../../components/MainMenuList/MainMenuList";
import DipList from "../../components/DipList/DipList";
import DrinkList from "../../components/DrinkList/DrinkList";
import { useNavigate } from "react-router-dom";
import type { Item, CartItem, MenuI } from "../../types/types";
import cartLogo from "/cart.svg";
//Must have the same schema as API
type Menus = {
  items?: MenuI[] | null;
};

const API_URL: string =
  "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu";

export default function HomePage() {
  const navigate = useNavigate();
  const [menusData, setMenusData] = useState<Menus | null | undefined>(null);

  const [wontonId, setWontonId] = useState<number | null>(null); //main menu
  const [drinkId, setDrinkId] = useState<number | null>(null);
  const [dipId, setDipId] = useState<number | null>(null);

  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": PRIVATE_KEY,
      },
    })
      .then((res) => res.json())
      .then((data: Menus) => {
        setMenusData(data);
        /* console.log(data.items); */
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleSelectedItems(id: number, type: string): void {
    switch (type) {
      case "wonton":
        {
          setWontonId(id);
        }
        break;
      case "dip":
        {
          setDipId(id);
        }
        break;
      case "drink":
        {
          setDrinkId(id);
        }
        break;
    }
  }

  function sendItemsToCartPage(): void {
    let itemsIds: number[] = [];
    if (wontonId && dipId && drinkId) {
      itemsIds.push(wontonId, dipId, drinkId);
      let newCartItems: Item[] = [];
      itemsIds.forEach((itemId) => {
        const itemObj: CartItem = menusData?.items?.find(
          (i) => i.id === itemId
        );
        itemObj.quantity = 1;
        newCartItems.push(itemObj);
      });
      navigate("/cart", { state: newCartItems }); //Navigate to Cart page and send data
    }
  }

  return (
    <div style={{ background: "#489078" }}>
      <header>
        <div
          style={{ display: "flex", justifyContent: "right", padding: "10px" }}
        >
          <img
            src={cartLogo}
            style={{ background: "white" }}
            onClick={sendItemsToCartPage}
          ></img>
        </div>
      </header>
      <main style={{ background: "#489078", height: "926px" }}>
        <section>
          <h1 style={{ color: "#F4F3F1F0" }}>
            MENY.........................9 SEK
          </h1>
          <MainMenuList
            list={menusData?.items}
            handleSelectedItem={handleSelectedItems}
          />
        </section>
        <section style={{ background: "#605858" }}>
          <h1 style={{ color: "#F4F3F1F0" }}>
            DIPSÅS.....................19 SEK{" "}
          </h1>
          <DipList
            list={menusData?.items}
            handleSelectedItem={handleSelectedItems}
          />
        </section>
        <section style={{ background: "#605858" }}>
          <h1 style={{ color: "#F4F3F1F0" }}>
            DRICKA.....................19 SEK
          </h1>
          <DrinkList
            list={menusData?.items}
            handleSelectedItem={handleSelectedItems}
          />
        </section>
      </main>
    </div>
  );
}
