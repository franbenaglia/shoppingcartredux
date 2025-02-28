import axios from "axios";
import { getToken } from "../helpers/AuthHelper";
import { Email } from "../model/Email";

const URL_RESOURCE_SERVER = import.meta.env.VITE_URL_RESOURCE_SERVER;
const baseURL = URL_RESOURCE_SERVER + "/email/";

export const sendEmail = async (newData: Email) => {

    const token = await getToken();

    try {

        return await axios.post(baseURL, newData, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return error;
    }
};