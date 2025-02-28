import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonListHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,

} from '@ionic/react';
import { useContext } from 'react';
import Item from '../components/Item';
import { ProductContext } from '../contexts/ProductContext';


const ProductListPage: React.FC = () => {

    const { getProducts } = useContext(ProductContext);

    const List = () => {

        if (getProducts() && getProducts().length > 0) {

            return (
                <IonList>
                    <IonListHeader>Products</IonListHeader>
                    {getProducts() && getProducts().map((product, idx) => {
                        let ips: any = { visible: false, product: product, editable: true };
                        return <Item {...ips} key={idx} />;
                    })}
                </IonList>
            );
        } else {

            return (
                <IonList>
                    <IonListHeader>Products</IonListHeader>
                    <IonItem>
                        No products
                    </IonItem>
                </IonList>
            );

        }

    }

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Product</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Product</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <List />

            </IonContent>
        </IonPage>

    );

};

export default ProductListPage;


