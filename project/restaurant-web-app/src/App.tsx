import { useEffect, useState } from "react";
import "./App.css";
import { PRIVATE_KEY } from "./private-key/key";

interface MenuI {
  id: number;
  type: string;
  name: string;
  ingredients: string[];
  price: number;
}

type Menus = {
  menus?: MenuI[];
};

const API_URL: string =
  " https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu";

function App() {
  const [menus, setMenus] = useState<Menus>();

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
        console.log(data); // Check if data is loaded correctly in the console.log statement. If not, check the server logs for any errors.
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <header> cart img</header>
      <main></main>
    </div>
  );
}

export default App;
