import { createContext, useEffect, useState } from "react";
import { ItemsProduct } from './../model/ItemsProduct';
import { Product } from "../model/Product";
import { Preferences } from '@capacitor/preferences';
import { cancelled, reserved } from "../api/StockApi";
import { Toast } from '@capacitor/toast';
import { CHECKOUT_LIST, setPreferences } from "../utils/SavePreferences";

export const CartContext = createContext(null);

const showToast = async (message: string) => {
  await Toast.show({
    text: message,
    position: 'top'
  });
};

export const ShoppingCartProvider = ({ children }) => {

  const [cart, setCart] = useState([] as ItemsProduct[]);

  const fetchItems = async () => {
    const items = (await Preferences.get({ key: CHECKOUT_LIST })).value;
    if (items) {
      const it: ItemsProduct[] = JSON.parse(items);
      setCart(it);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const checkOutList = () => cart.filter((c: ItemsProduct) => c.quantity > 0);

  const addItemToCart = async (product: Product) => {

    const res = await reserved(product._id);
    if (res.status !== 200) {
      await showToast(res.data ? res.data.message : 'Error updating stock');
      throw new Error(res.data ? res.data.message : 'Error updating stock');
    }

    let ip: ItemsProduct[] = cart.filter((c: ItemsProduct) => c.product._id === product._id);

    if (ip.length > 0) {
      const newCart = cart.reduce((acc: ItemsProduct[], curr: ItemsProduct) => {
        if (curr.product._id === product._id) {
          const itemsProduct = { product: curr.product, quantity: curr.quantity + 1 } as ItemsProduct;
          acc.push(itemsProduct);
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
      setCart(newCart);
      setPreferences(newCart);
    } else {
      const itemsProduct = { product: product, quantity: 1 } as ItemsProduct;
      cart.push(itemsProduct);
      //setCart(cart);
      setCart(() => {
        const newCount = cart;
        return newCount;
      });
      setPreferences(cart);
    }

  }

  const deleteItemToCart = async (product: Product) => {

    const res = await cancelled(product._id);
    if (res.status !== 200) {
      await showToast(res.data ? res.data.message : 'Error updating stock');
      throw new Error(res.data ? res.data.message : 'Error updating stock');
    }

    let ip: ItemsProduct[] = cart.filter((c: ItemsProduct) => c.product._id === product._id);

    if (ip.length > 0) {
      const newCart = cart.reduce((acc: ItemsProduct[], curr: ItemsProduct) => {
        if (curr.product._id === product._id) {
          const itemsProduct = { product: curr.product, quantity: curr.quantity > 0 ? curr.quantity - 1 : 0 } as ItemsProduct;
          acc.push(itemsProduct);
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
      setCart(newCart);
      setPreferences(newCart);
    }
  }

  const deleteAllCartItems = () => {
    cart.forEach(ip => cancelled(ip.product._id));
    setPreferences([]);
    setCart([]);
  }

  const priceByProduct: number[] = cart.map(ip => ip.quantity * ip.product.price);

  const totalPrice = () => priceByProduct.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  return (
    <CartContext.Provider value={{ checkOutList, addItemToCart, deleteItemToCart, totalPrice, deleteAllCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
