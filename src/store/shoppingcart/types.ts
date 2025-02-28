import { ItemsProduct } from "../../model/ItemsProduct";


export interface ShoppingCartState {
  itemProducts: ItemsProduct[];
}

export interface RootState {
  shoppingCart: ShoppingCartState;
}