import type { MenuI } from "../../types/types";
import { useState } from "react";

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
    <ol>
      {list &&
        filteredMenuList(list).map((me) => (
          <li
            key={me.id}
            onClick={() => handleClick(me.id, me.type)}
            style={{
              cursor: "pointer",
              padding: "8px",
              margin: "4px",
              backgroundColor: me.id === selectedItemId ? "lightblue" : "white",
            }}
          >
            <p>{me.name}</p>
          </li>
        ))}
    </ol>
  );
};

export default MainMenuList;
