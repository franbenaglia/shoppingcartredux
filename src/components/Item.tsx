import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonImg,
    IonThumbnail
} from '@ionic/react';
import { useContext } from 'react';
import { CartContext } from './../contexts/ShoppingCartContext';
import { ItemProps } from '../model/ItemProps';
import { Link } from 'react-router-dom';



const Item: React.FC = ({ visible, product, editable, quantity }: ItemProps) => {

    const { addItemToCart, deleteItemToCart } = useContext(CartContext);

    return (
        <IonCard color="light">
            {product && product.imageDataBase64 && (
                <IonThumbnail>
                    <img alt={product.name} src={product.imageDataBase64[0] as string} ></img>
                </IonThumbnail>
            )}
            <IonCardHeader>
                <IonCardTitle>{'Product: ' + product.name} {quantity ? ' Items: ' + quantity : ''}</IonCardTitle>
                <IonCardSubtitle>{'Price: ' + product.price} {((visible || editable) && product.stock) ? 'Stock: ' + product.stock.free : ''}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{product.description}</IonCardContent>
            {visible && <IonButton onClick={() => addItemToCart(product)}>Add Product</IonButton>}
            {visible && <IonButton onClick={() => deleteItemToCart(product)}>Delete Product</IonButton>}
            {editable && <Link to={'/Product/' + product._id}>Edit Product</Link>}
        </IonCard>
    );

};

export default Item;