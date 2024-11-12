import type { MenuList } from "../../types/types";
import { useState } from "react";

type PropsMenuList = {
  list?: MenuList[];
  handleSelectedItem: (i: number, t: string) => void;
};

const DipList = ({ list, handleSelectedItem }: PropsMenuList) => {
  const [selectedItemId, setSelectedItemId] = useState(null);

  function filteredDipList(l: MenuList[]): MenuList[] {
    let result: MenuList[] = l.filter((i) => i.type === "dip");
    return result;
  }

  const handleClick = (id: any, type: string) => {
    setSelectedItemId(id);
    handleSelectedItem(id, type); //Callback
  };

  return (
    <ol>
      {list &&
        filteredDipList(list).map((i) => (
          <li
            key={i.id}
            onClick={() => handleClick(i.id, i.type)}
            style={{
              cursor: "pointer",
              padding: "8px",
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
