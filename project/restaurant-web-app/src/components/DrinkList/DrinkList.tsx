import type { MenuI } from "../../types/types";

type PropsMenuI = {
  list?: MenuI[];
};

const DrinkList = ({ list }: PropsMenuI) => {
  function filteredDrinkList(l: MenuI[]): MenuI[] {
    let result: MenuI[] = l.filter((i) => i.type === "drink");
    return result;
  }
  return (
    <ol>
      {list &&
        filteredDrinkList(list).map((i) => (
          <li key={i.id}>
            <p>{i.name}</p>
          </li>
        ))}
    </ol>
  );
};

export default DrinkList;
