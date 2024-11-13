import type { MenuI } from "../../types/types";
import { useState } from "react";

type PropsMenuI = {
  list?: MenuI[] | null;
  handleSelectedItem: (i: number, t: string) => void;
};

const DrinkList = ({ list, handleSelectedItem }: PropsMenuI) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  function filteredDrinkList(l: MenuI[]): MenuI[] {
    let result: MenuI[] = l.filter((i) => i.type === "drink");
    return result;
  }

  const handleClick = (id: number, type: string) => {
    setSelectedItemId(id);
    handleSelectedItem(id, type); //Callback
  };

  return (
    <ol>
      {list &&
        filteredDrinkList(list).map((dr) => (
          <li
            key={dr.id}
            onClick={() => handleClick(dr.id, dr.type)}
            style={{
              cursor: "pointer",
              padding: "8px",
              margin: "4px",
              backgroundColor: dr.id === selectedItemId ? "lightblue" : "white",
            }}
          >
            <p>{dr.name}</p>
          </li>
        ))}
    </ol>
  );
};

export default DrinkList;
