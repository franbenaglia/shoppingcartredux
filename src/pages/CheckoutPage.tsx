import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Checkout from '../components/Checkout';
import './Page.css';

const CheckoutPage: React.FC = () => {

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
                        <IonTitle size="large">Items selected</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Checkout />
            </IonContent>
        </IonPage>
    );
};

export default CheckoutPage;