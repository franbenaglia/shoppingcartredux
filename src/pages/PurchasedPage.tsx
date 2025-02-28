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
    IonToolbar

} from '@ionic/react';
import Item from '../components/Item';
import { fetchDataByUser } from '../api/SaleApi';
import { useEffect, useState } from 'react';
import { Sale } from '../model/Sale';
import { getUser } from '../api/UserApi';


const PurchasedPage: React.FC = () => {

    const [sales, setSales] = useState<Sale[]>();

    //let [userlogged, setUserlogged] = useState('');

    const fetchSales = async () => {
        const user= await getUser();
        //setUserlogged(user._id);
        const data = await fetchDataByUser(user._id);
        setSales(data);
    }

    useEffect(() => {
        fetchSales();
    }, []);


    const ListSales: React.FC = () => {

        if (sales && sales.length > 0) {

            return (
                <IonList>
                    <IonListHeader>Purchased</IonListHeader>
                    {sales && sales.map((sale, idxi) => {
                        return <ListItemsProducts {...sale} key={idxi} />;
                    })}
                </IonList>
            );
        } else {

            return (
                <IonList>
                    <IonListHeader>Purchased</IonListHeader>
                    <IonItem>
                        No items
                    </IonItem>
                </IonList>
            );

        }

    }

    const ListItemsProducts = ({ ...sale }: Sale) => {

        if (sale) {

            const ips = sale.itemsProduct;

            if (ips && ips.length > 0) {

                return (
                    <IonList>
                        <IonListHeader>{'Sale transactionid: ' + sale.transactionId}</IonListHeader>
                        {ips && ips.map((ip, idxz) => {
                            let ipr: any = { visible: false, product: ip.product, editable: false, quantity: ip.quantity };
                            return <Item {...ipr} />;
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
        } else {

            return (
                <IonList>
                    <IonListHeader>Products</IonListHeader>
                    <IonItem>
                        No items
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
                <ListSales />
            </IonContent>
        </IonPage>

    );

};

export default PurchasedPage;


