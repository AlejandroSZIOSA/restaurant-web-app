import { useEffect, useState } from "react";
import { PRIVATE_KEY } from "./private-key/key";
import "./App.css";
import MainMenuList from "./components/MainMenuList/MainMenuList";
import DrinkList from "./components/DrinkList/DrinkList";
import DipList from "./components/DipList/DipList";

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

function App() {
  const [menusData, setMenusData] = useState<Menus>();

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

  return (
    <div>
      <header> cart img</header>
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

export default App;
