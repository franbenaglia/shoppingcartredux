import { ItemsProduct } from '../../model/ItemsProduct';
import { RootState } from './types';

export const checkOutList = (state: RootState): ItemsProduct[] => state.shoppingCart.itemProducts.filter((c: ItemsProduct) => c.quantity > 0);

export const priceByProduct = (state: RootState): number[] => state.shoppingCart.itemProducts.map(ip => ip.quantity * ip.product.price);

export const totalPrice = (state: RootState) => priceByProduct(state).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
);