import axios from "axios";
import { Product } from "../model/Product";
import { getToken } from "../helpers/AuthHelper";

const URL_RESOURCE_SERVER = import.meta.env.VITE_URL_RESOURCE_SERVER;
const baseURL = URL_RESOURCE_SERVER + "/product/";


export const handleCreate = async (newData: Product) => {

    const token = await getToken();

    try {

        return await axios.post(baseURL, newData, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });

    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};

export const fetchAllData = async () => {
    try {
        const response = await axios.get(baseURL);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const handleUpdate = async (updatedData: Product) => {

    const token = await getToken();

    try {
        return await axios.put(baseURL + updatedData._id, updatedData, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error('Error updating data:', error);
        return error;
    }
};

export const handleDelete = async (id: number) => {

    const token = await getToken();

    try {
        return await axios.delete(baseURL + id, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error('Error deleting data:', error);
        return error;
    }
};

export const fetchDataById = async (id: number) => {
    try {
        const response = await axios.get(baseURL + id);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};




