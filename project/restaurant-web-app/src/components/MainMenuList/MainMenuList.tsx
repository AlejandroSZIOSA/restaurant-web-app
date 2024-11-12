import type { MenuI } from "../../types/types";
import { useState } from "react";

type PropsMenuList = {
  list?: MenuI[];
  handleSelectedItem: (i: number, t: string) => void;
};

const MainMenuList = ({ list, handleSelectedItem }: PropsMenuList) => {
  const [selectedItemId, setSelectedItemId] = useState(null);

  function filteredMenuList(l: MenuI[]): MenuI[] {
    let result: MenuI[] = l.filter((i) => i.type === "wonton");
    return result;
  }
  const handleClick = (id: any, type: string) => {
    setSelectedItemId(id);
    handleSelectedItem(id, type); //Callback
  };

  return (
    <ol>
      {list &&
        filteredMenuList(list).map((m) => (
          <li
            key={m.id}
            onClick={() => handleClick(m.id, m.type)}
            style={{
              cursor: "pointer",
              padding: "8px",
              margin: "4px",
              backgroundColor: m.id === selectedItemId ? "lightblue" : "white",
            }}
          >
            <p>{m.name}</p>
          </li>
        ))}
    </ol>
  );
};

export default MainMenuList;
