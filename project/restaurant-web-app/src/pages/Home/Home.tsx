import { useState, useEffect } from "react";
import { PRIVATE_KEY } from "../../../private-key/key";
import MainMenuList from "../../components/MainMenuList/MainMenuList";
import DipList from "../../components/DipList/DipList";
import DrinkList from "../../components/DrinkList/DrinkList";
import { useNavigate } from "react-router-dom";
import type { Item, CartItem, MenuI } from "../../types/types";

//Must have the same schema as from the API
type Menus = {
  items?: MenuI[] | null;
};

const API_URL: string =
  " https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu";

export default function HomePage() {
  const navigate = useNavigate();

  const [menusData, setMenusData] = useState<Menus>();

  const [wontonId, setWontonId] = useState<number | null>(null);
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
    /* console.log(id, type); */

    switch (type) {
      case "wonton":
        {
          setWontonId(id);
          // console.log(wontonId);
        }
        break;
      case "dip":
        {
          setDipId(id);
          // console.log(dipId);
        }
        break;
    }
  }

  function sendCartItemsToCartPage(): void {
    let itemsIds: number[] = [];
    if (wontonId && dipId) {
      itemsIds.push(wontonId, dipId);
      let newCartItems: Item[] = [];
      itemsIds.forEach((itemId) => {
        let tempItem: CartItem = menusData?.items.find((i) => i.id === itemId);
        tempItem.quantity = 0;
        newCartItems.push(tempItem);
      });
      navigate("/cart", { state: newCartItems });
    }
  }

  return (
    <div>
      <header>
        <button onClick={sendCartItemsToCartPage}>To Cart</button>
      </header>
      <main>
        <section>
          <h1>Menu</h1>
          <MainMenuList
            list={menusData?.items}
            handleSelectedItem={handleSelectedItems}
          />
        </section>
        <section>
          <h1>Dep</h1>
          <DipList
            list={menusData?.items}
            handleSelectedItem={handleSelectedItems}
          />
        </section>
        <section>
          <h1>Drinks</h1>
          <DrinkList list={menusData?.items} />
        </section>
      </main>
    </div>
  );
}
