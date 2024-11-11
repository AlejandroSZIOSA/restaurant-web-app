import type { MenuList } from "../../types/types";

type PropsMenuList = {
  list?: MenuList[];
};

const DipList = ({ list }: PropsMenuList) => {
  function filteredDipList(l: MenuList[]): MenuList[] {
    let result: MenuList[] = l.filter((i) => i.type === "dip");
    return result;
  }
  return (
    <ol>
      {list &&
        filteredDipList(list).map((i) => (
          <li key={i.id}>
            <p>{i.name}</p>
          </li>
        ))}
    </ol>
  );
};

export default DipList;
