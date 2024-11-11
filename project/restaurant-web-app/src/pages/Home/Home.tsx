import { useState, useEffect } from "react";
import { PRIVATE_KEY } from "../../../private-key/key";
import MainMenuList from "../../components/MainMenuList/MainMenuList";
import DipList from "../../components/DipList/DipList";
import DrinkList from "../../components/DrinkList/DrinkList";
import { Link } from "react-router-dom";

interface MenuI {
  id: number;
  type: string;
  name: string;
  ingredients: string[];
  price: number;
}

//Must have the same schema from API
type Menus = {
  items?: MenuI[] | null;
};

const API_URL: string =
  " https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu";

export default function HomePage() {
  const [menusData, setMenusData] = useState<Menus>();
  const [cartList, setCartList] = useState();

  //test
  const searchParams = new URLSearchParams({ id: "123", page: "1" });

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

  function handleAddToCart(id: number): void {}

  return (
    <div>
      <header>
        <Link to={`/cart?${searchParams.toString()}`}>
          <p>cart</p>
        </Link>
      </header>
      <main>
        <section>
          <h1>Menu</h1>
          <MainMenuList list={menusData?.items} />
        </section>
        <section>
          <h1>Dep</h1>
          <DipList list={menusData?.items} />
        </section>
        <section>
          <h1>Drinks</h1>
          <DrinkList list={menusData?.items} />
        </section>
      </main>
    </div>
  );
}
