import {
    IonButton,
    IonItem,
    IonList,
    IonListHeader
} from '@ionic/react';

import Item from './Item';
import { useContext, useEffect, useState } from 'react';
//import { CartContext } from '../contexts/ShoppingCartContext';
import { proceedCheckOut } from '../api/SaleApi';
import { Sale } from '../model/Sale';
import { User } from '../model/User';
import { StripeComponent } from './Stripe';
import { Preferences } from '@capacitor/preferences';
import { getUser } from '../api/UserApi';

import { useSelector, useDispatch } from 'react-redux';
import { checkOutList, totalPrice } from '../store/shoppingcart/selectors';
import { deleteAllItems } from '../store/shoppingcart/actions';


const SALE_ID = 'saleid';


const Checkout: React.FC = () => {

    //const { totalPrice, checkOutList, deleteAllCartItems } = useContext(CartContext);
    const checkOut = useSelector(checkOutList);
    const total = useSelector(totalPrice);
    const dispatch = useDispatch();
    
    const [render, setRender] = useState(false);
    const clist = checkOut;

    let [userlogged, setUserlogged] = useState({ email: 'anonimo', role: 'user' });

    const fetchUser = async () => {
        const data = await getUser();
        setUserlogged({
            email: data.email,
            role: data.role
        });
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const deleteCart = async () => {
        //deleteAllCartItems();
        dispatch(deleteAllItems())
    }

    const proceed = async () => {

        const osale: Sale = new Sale();

        const user: User = new User();
        user.email = userlogged.email;

        osale.user = user;
        osale.itemsProduct = clist;

        const data: any = (await proceedCheckOut(osale)).data;

        setRender(data && data.sale && data.sale._id);
        if (data && data.sale && data.sale._id) {
            //setSale(data.sale._id);
            await Preferences.set({
                key: SALE_ID,
                value: data.sale._id,
            });
        }
    }

    return (
        <IonList>
            <IonListHeader>Products, amount: {total}</IonListHeader>
            {clist && clist.map((ip, idx) => {
                const ips: any = { visible: false, product: ip.product, quantity: ip.quantity };
                return <Item {...ips} key={idx} />;
            })}
            {clist && clist.length > 0 &&
                <IonItem>
                    <IonButton onClick={() => proceed()}>Proceed</IonButton>
                    <IonButton onClick={() => deleteCart()}>Delete Cart</IonButton>
                </IonItem>
            }
            {render && <IonItem>
                <StripeComponent />
            </IonItem>}
        </IonList>
    );
};

export default Checkout;