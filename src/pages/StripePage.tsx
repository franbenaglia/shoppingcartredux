import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { StripeComponent } from '../components/Stripe';
import './Page.css';

const StripePage: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Stripe</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Stripe</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <StripeComponent/>
            </IonContent>
        </IonPage>
    );
};

export default StripePage;
