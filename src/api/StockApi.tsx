import axios from "axios";
import { ItemsProduct } from "../model/ItemsProduct";
import { ProductStock } from "../model/ProductStock";
import { getGoogleJwtToken } from "../helpers/AuthHelper";

const URL_RESOURCE_SERVER = import.meta.env.VITE_URL_RESOURCE_SERVER;
const baseURL = URL_RESOURCE_SERVER + "/stock/";

export const changeProductStateToBuyed = async (ips: ItemsProduct[]) => {

    const ps = ips.map(ip => {
        return {
            quantity: ip.quantity,
            productid: ip.product._id
        } as ProductStock
    }
    );

    return buyed(ps);
}

export const reserved = async (idprod: string) => {
    try {
        return await axios.put(baseURL + 'reserved/' + idprod);
    } catch (error) {
        console.error('Error updating stock:', error);
        return error;
    }
};

export const buyed = async (ps: ProductStock[]) => {

    const token = await getGoogleJwtToken();

    const body = JSON.stringify(ps);

    try {
        return await axios.put(baseURL + 'buyed/', body, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error('Error updating stock:', error);
        return error;
    }
};

export const cancelled = async (idprod: string) => {
    try {
        return await axios.put(baseURL + 'cancelled/' + idprod);
    } catch (error) {
        console.error('Error updating stock:', error);
        return error;
    }
};