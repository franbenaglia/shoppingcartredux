import { Preferences } from "@capacitor/preferences";
import { cancelled, reserved } from "../../api/StockApi";
import { ItemsProduct } from "../../model/ItemsProduct";
import { CHECKOUT_LIST, setPreferences } from "../../utils/SavePreferences";
import { ADDITEM, DELETEALLITEMS, DELETEITEM, ShoppingCartAction } from "./actions";
import { ShoppingCartState } from "./types";

const fetchItems = async () => {
  const items = (await Preferences.get({ key: CHECKOUT_LIST })).value;
  if (items) {
    const it: ItemsProduct[] = JSON.parse(items);
    return it;
  }
}

const initialState: ShoppingCartState = {
  itemProducts: []     //fetchItems
};

export const shoppingCartReducer = (state = initialState, action: ShoppingCartAction): ShoppingCartState => {

  switch (action.type) {

    case ADDITEM:
      {
        let p = action.payload.product;
        reserved(p._id);

        let ip: ItemsProduct[] = state.itemProducts.filter((c: ItemsProduct) => c.product._id === p._id);

        if (ip.length > 0) {
          state.itemProducts.reduce((acc: ItemsProduct[], curr: ItemsProduct) => {
            if (curr.product._id === p._id) {
              const itemsProduct = { product: curr.product, quantity: curr.quantity + 1 } as ItemsProduct;
              acc.push(itemsProduct);
            } else {
              acc.push(curr);
            }
            return acc;
          }, []);
        } else {
          const itemsProduct = { product: p, quantity: 1 } as ItemsProduct;
          state.itemProducts.push(itemsProduct);
        }
        setPreferences(state.itemProducts);
        return state;
      }

    case DELETEALLITEMS:

      state.itemProducts.forEach(ip => cancelled(ip.product._id));
      state.itemProducts.length = 0;
      setPreferences(state.itemProducts);
      return state;

    case DELETEITEM:

      {
        let product = action.payload.product;

        cancelled(product._id);

        let ip: ItemsProduct[] = state.itemProducts.filter((c: ItemsProduct) => c.product._id === product._id);

        if (ip.length > 0) {
          state.itemProducts.reduce((acc: ItemsProduct[], curr: ItemsProduct) => {
            if (curr.product._id === product._id) {
              const itemsProduct = { product: curr.product, quantity: curr.quantity > 0 ? curr.quantity - 1 : 0 } as ItemsProduct;
              acc.push(itemsProduct);
            } else {
              acc.push(curr);
            }
            return acc;
          }, [])
        }
        setPreferences(state.itemProducts);
        return state;
      }

    default:
      return state;
  }
};
