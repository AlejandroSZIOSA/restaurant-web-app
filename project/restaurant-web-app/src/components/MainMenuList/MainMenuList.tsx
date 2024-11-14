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
              margin: "0px 15px 0px 15px",
              backgroundColor: me.id === selectedItemId ? "#353131" : "#605858",
            }}
          >
            <MenuItemCard
              name={me.name}
              price={me.price}
              ingredients={me.ingredients}
            />
            <hr style={{ width: "--moz-available" }}></hr>
          </li>
        ))}
    </ol>
  );
};

export default MainMenuList;
