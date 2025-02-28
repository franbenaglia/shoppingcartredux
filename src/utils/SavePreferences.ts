import { Preferences } from "@capacitor/preferences";
import { ItemsProduct } from "../model/ItemsProduct";

export const CHECKOUT_LIST = 'checkoutlist';

export const setPreferences = async (ip: ItemsProduct[]) => {
    await Preferences.set({
      key: CHECKOUT_LIST,
      value: JSON.stringify(ip),
    });
  };