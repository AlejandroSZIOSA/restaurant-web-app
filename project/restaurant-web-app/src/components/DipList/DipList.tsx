import type { MenuI } from "../../types/types";
import { useState } from "react";

type PropsMenuI = {
  list?: MenuI[] | null;
  handleSelectedItem: (i: number, t: string) => void;
};

const DipList = ({ list, handleSelectedItem }: PropsMenuI) => {
  const [selectedItemId, setSelectedItemId] = useState(null);

  function filteredDipList(l: MenuI[]): MenuI[] {
    let result: MenuI[] = l.filter((i) => i.type === "dip");
    return result;
  }

  const handleClick = (id: any, type: string) => {
    setSelectedItemId(id);
    handleSelectedItem(id, type); //Callback
  };

  return (
    <ol style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}>
      {list &&
        filteredDipList(list).map((i) => (
          <li
            key={i.id}
            onClick={() => handleClick(i.id, i.type)}
            style={{
              cursor: "pointer",
              padding: "8px",
              listStyle: "none",
              margin: "4px",
              backgroundColor: i.id === selectedItemId ? "lightblue" : "white",
            }}
          >
            <p>{i.name}</p>
          </li>
        ))}
    </ol>
  );
};

export default DipList;
