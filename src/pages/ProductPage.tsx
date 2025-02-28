import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ProductComponent from '../components/ProductComponent';
import './Page.css';
import { useParams } from 'react-router-dom'

const ProductPage: React.FC = ({ props }: any) => {

    const productId = useParams();

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
                <ProductComponent {...productId} />
            </IonContent>
        </IonPage>
    );
};

export default ProductPage;