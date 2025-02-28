import axios from "axios";

const URL_RESOURCE_SERVER = import.meta.env.VITE_URL_RESOURCE_SERVER;

export const paymentIntent = async (amount: number, currency: string) => {

    try {
        const intent = await axios.post(URL_RESOURCE_SERVER + "/payment/paymentintent", {
            amount: amount * 100,
            currency: currency
        });

        return intent;

    } catch (error) {
        console.error('Error getting client secret:', error);
    }

}

export const charge = async (amount: number, tokenId: string) => {

    try {
        await axios.post(URL_RESOURCE_SERVER + "/payment/stripe_checkout", {
            stripeToken: tokenId,
            amount: amount
        });
    } catch (error) {
        console.error('Error creating data:', error);
    }

}