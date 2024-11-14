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
    <ol
      style={{
        display: "grid",
        gridTemplateColumns: "120px 120px 140px",
        gridTemplateRows: "50px 50px",
        color: "white",
      }}
    >
      {list &&
        filteredDrinkList(list).map((dr) => (
          <li
            key={dr.id}
            onClick={() => handleClick(dr.id, dr.type)}
            style={{
              cursor: "pointer",
              listStyle: "none",
              margin: "4px",
              backgroundColor:
                dr.id === selectedItemId ? "#353131" : "#F1F0EC3D",
            }}
          >
            <p>{dr.name}</p>
          </li>
        ))}
    </ol>
  );
};

export default DrinkList;
