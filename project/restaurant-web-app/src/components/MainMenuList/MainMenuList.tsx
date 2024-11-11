import type { MenuList } from "../../types/types";

type PropsMenuList = {
  list?: MenuList[];
};

const MainMenuList = ({ list }: PropsMenuList) => {
  function filteredMenuList(l: MenuList[]): MenuList[] {
    let result: MenuList[] = l.filter((i) => i.type === "wonton");
    return result;
  }

  return (
    <ol>
      {list &&
        filteredMenuList(list).map((m) => (
          <li key={m.id}>
            <p>{m.name}</p>
          </li>
        ))}
    </ol>
  );
};

export default MainMenuList;
