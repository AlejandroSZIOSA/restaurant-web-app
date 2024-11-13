import "./MenuItemCard.css";

type Props = {
  name: string;
  price: number;
  ingredients: string[];
};

const MenuItemCard = ({ name, price, ingredients }: Props) => {
  return (
    <div className="item-card_container">
      <div className="item-card_inner1">
        <h2>
          {name.toUpperCase()}.................................................
          {price} SEK
        </h2>
      </div>
      <div>
        <ol className="item-card_listContainer">
          {ingredients.map((i, index) => (
            <li
              key={index}
              style={{
                listStyle: "none",
                marginRight: "18px",
              }}
            >
              {i}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default MenuItemCard;
