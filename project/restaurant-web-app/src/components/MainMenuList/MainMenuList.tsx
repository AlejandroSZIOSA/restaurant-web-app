import type { MenuI } from "../../types/types";
import { useState } from "react";
import MenuItemCard from "../MenuItemCard/MenuItemCard";

type PropsMenuList = {
  list?: MenuI[] | null;
  handleSelectedItem: (i: number, t: string) => void;
};

const MainMenuList = ({ list, handleSelectedItem }: PropsMenuList) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  function filteredMenuList(l: MenuI[]): MenuI[] {
    let result: MenuI[] = l.filter((i) => i.type === "wonton");
    return result;
  }

  const handleClick = (id: number, type: string) => {
    setSelectedItemId(id);
    handleSelectedItem(id, type); //Callback
  };

  return (
    <ol style={{ display: "contents" }}>
      {list &&
        filteredMenuList(list).map((me) => (
          <li
            key={me.id}
            onClick={() => handleClick(me.id, me.type)}
            style={{
              cursor: "pointer",
              padding: "8px",
              listStyle: "none",
              marginLeft: "20px",
              backgroundColor: me.id === selectedItemId ? "lightblue" : "white",
            }}
          >
            <MenuItemCard
              name={me.name}
              price={me.price}
              ingredients={me.ingredients}
            />
          </li>
        ))}
    </ol>
  );
};

export default MainMenuList;
