import type { MenuList } from "../../types/types";

type PropsMenuList = {
  list?: MenuList[];
};

const DrinkList = ({ list }: PropsMenuList) => {
  function filteredDrinkList(l: MenuList[]): MenuList[] {
    let result: MenuList[] = l.filter((i) => i.type === "drink");
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
