import axios from "axios";
import { getGoogleJwtToken } from "../helpers/AuthHelper";
import { Sale } from "../model/Sale";

const URL_RESOURCE_SERVER = import.meta.env.VITE_URL_RESOURCE_SERVER;
const baseURL = URL_RESOURCE_SERVER + "/sales/";


export const fetchAllData = async () => {
    try {
        const response = await axios.get(baseURL);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return error;
    }
};

export const fetchDataByUser = async (userid: string) => {
    try {
        const response = await axios.get(baseURL + 'byuser/' + userid);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return error;
    }
};


export const proceedCheckOut = async (newData: Sale) => {

    const token = await getGoogleJwtToken();

    try {

        const jsondata = JSON.stringify(newData);

        const response = await axios.post(baseURL, jsondata, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });

        return response;

    } catch (error) {
        console.error('Error creating data:', error);
    }
};

export const confirmPayment = async (txConfirm: String, idSale: string) => {

    const token = await getGoogleJwtToken();

    let sale: Sale = new Sale();

    sale.transactionId = txConfirm;
    //sale.user= new User();
    sale._id = idSale

    const saleJson = JSON.stringify(sale)

    try {

        const response = await axios.put(baseURL + 'confirmpayment/' + idSale, saleJson, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });

        return response;

    } catch (error) {
        console.error('Error creating data:', error);
    }
};