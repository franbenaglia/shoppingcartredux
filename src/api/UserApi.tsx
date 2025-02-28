import axios from 'axios';
import { getToken } from '../helpers/AuthHelper';
import { User } from '../model/User';
const URL_RESOURCE_SERVER = import.meta.env.VITE_URL_RESOURCE_SERVER;
const baseURL = URL_RESOURCE_SERVER + "/api/v1/auth";


export const getUser = async () => {

    const token = await getToken();

    try {
        const response = await axios.get(baseURL + '/profileWithJustToken', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            }
        });

        return response.data;

    } catch (error) {
        console.error('Error getting data:', error);
    }
};


export const registerUser = async (user: User) => {

    const body = JSON.stringify(user);

    try {
        return await axios.post(baseURL + '/register', body, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('Error creating data:', error);
    }
};

export const login = async (user: User) => {
    const body = JSON.stringify(user);
    try {
        return await axios.post(baseURL + '/login', body, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('Error creating data:', error);
        return error;
    }
};