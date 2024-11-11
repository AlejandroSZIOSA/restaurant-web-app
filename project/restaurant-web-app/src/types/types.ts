interface MenuI {
  id: number;
  price: number;
  type: string;
}

export interface MenuList extends MenuI {
  name: string;
  description: string[];
}
