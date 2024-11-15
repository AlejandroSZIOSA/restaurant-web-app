//Fetch API DATA

export interface MenuI {
  id: number;
  type: string;
  name: string;
  ingredients: string[];
  price: number;
}

//Cart Item List

export interface Item {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends Item {
  quantity: number;
}
