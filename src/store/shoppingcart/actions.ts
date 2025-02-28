import { Product } from "../../model/Product";

export const ADDITEM = "shoppingCart/ADDITEM" as const;
export const DELETEITEM = "shoppingCart/DELETEITEM" as const;
export const DELETEALLITEMS = "product/DELETEALLITEMS" as const;

export const addItem = (product: Product) => ({
    type: ADDITEM,
    payload: {
        product: product,
    },
});
export const deleteItem = (product: Product) => ({
    type: DELETEITEM,
    payload: {
        product: product,
    },
});
export const deleteAllItems = () => ({
    type: DELETEALLITEMS,
    payload: {

    },
});


export type ShoppingCartAction =
    | ReturnType<typeof addItem>
    | ReturnType<typeof deleteItem>
    | ReturnType<typeof deleteAllItems>;
