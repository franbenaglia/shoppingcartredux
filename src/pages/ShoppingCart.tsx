import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ItemList from '../components/ItemList';
import './Page.css';

const ShoppingCart: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Items</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Items</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ItemList />
            </IonContent>
        </IonPage>
    );
};

export default ShoppingCart;
