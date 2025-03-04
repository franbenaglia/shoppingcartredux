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

        let its = {} as ShoppingCartState;

        let ip: ItemsProduct[] = state.itemProducts.filter((c: ItemsProduct) => c.product._id === p._id);

        if (ip.length > 0) {
          const itps = state.itemProducts.reduce((acc: ItemsProduct[], curr: ItemsProduct) => {
            if (curr.product._id === p._id) {
              const itemProduct = { product: curr.product, quantity: curr.quantity + 1 } as ItemsProduct;
              acc.push(itemProduct);
            } else {
              acc.push(curr);
            }
            return acc;
          }, []);
          its = { ...state, itemProducts: itps };
        } else {
          const itemProduct = { product: p, quantity: 1 } as ItemsProduct;
          its = { ...state, itemProducts: [...state.itemProducts, itemProduct] };
        }
        setPreferences(its.itemProducts);
        return its;
      }

    case DELETEALLITEMS:

      state.itemProducts.forEach(ip => cancelled(ip.product._id));
      setPreferences([]);
      return { ...state, itemProducts: [] };

    case DELETEITEM:

      {
        let product = action.payload.product;

        let its = {} as ShoppingCartState;

        cancelled(product._id);

        let ip: ItemsProduct[] = state.itemProducts.filter((c: ItemsProduct) => c.product._id === product._id);

        if (ip.length > 0) {
          const itps = state.itemProducts.reduce((acc: ItemsProduct[], curr: ItemsProduct) => {
            if (curr.product._id === product._id) {
              const itemProduct = { product: curr.product, quantity: curr.quantity > 0 ? curr.quantity - 1 : 0 } as ItemsProduct;
              acc.push(itemProduct);
            } else {
              acc.push(curr);
            }
            return acc;
          }, []);
          its = { ...state, itemProducts: itps };
        }
        setPreferences(its.itemProducts);
        return its;
      }

    default:
      return state;
  }
};
