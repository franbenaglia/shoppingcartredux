import {
    IonList,
    IonListHeader
} from '@ionic/react';

import Item from './Item';
import { useContext, useEffect, useState } from 'react';
//import { CartContext } from '../contexts/ShoppingCartContext';
import { ProductContext } from '../contexts/ProductContext';
import {  totalPrice } from '../store/shoppingcart/selectors';
import { useSelector } from 'react-redux';

const ItemList: React.FC = () => {

   //const { totalPrice } = useContext(CartContext);
    const { getProducts } = useContext(ProductContext);
    const total = useSelector(totalPrice);

    return (
        <IonList>
            <IonListHeader>Products, amount: {total}</IonListHeader>
            {getProducts().map((product, idx) => {
                const ips: any = { visible: true, product: product, editable: false };
                return <Item {...ips} key={idx} />;
            })}
        </IonList>
    );
};

export default ItemList;