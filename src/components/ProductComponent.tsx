import { useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import {
    IonButton, IonInput, IonItem, IonList, IonTextarea, IonFab, IonFabButton, IonIcon,
    IonCol,
    IonImg,
} from '@ionic/react';
import { Product } from '../model/Product';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';
import { camera } from 'ionicons/icons';
import { ProductContext } from '../contexts/ProductContext';
import { Toast } from '@capacitor/toast';
import { Stock } from '../model/Stock';

const showToast = async (message: string) => {
    await Toast.show({
        text: message,
        position: 'top'
    });
};

const ProductComponent: React.FC = ({ productId }: any) => {

    const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<Product>();

    const [prod, setProd] = useState<Product>();

    const { photos, takePhoto, deletePhoto } = usePhotoGallery();

    const { handleCreate, handleDelete, handleUpdate, fetchProductById } = useContext(ProductContext);

    const fetchProduct = async () => {
        const data = await fetchProductById(productId);
        setValue('_id', data._id);
        setValue('name', data.name);
        setValue('price', data.price);
        setValue('stockFree', data.stock.free);
        setValue('description', data.description);
        setValue('stock', data.stock);
        setProd(data);
    }

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, []);

    const onSubmit: SubmitHandler<Product> = async (data) => {

        if (photos && photos.length > 0) {
            //data.imageDataBase64 = photos[0].webviewPath;
            data.imageDataBase64 = [];
            for (let p of photos) {
                data.imageDataBase64.push(p.webviewPath as string & Blob);
            }
        }

        data.price = Number(data.price);


        if (!productId) {

            const stock: Stock = new Stock();
            stock.free = data.stockFree;
            data.stock = stock;
            
            const r = await handleCreate(data as Product);

            if (r.status == 200) {
                showToast(r.data.message);
            } else {
                showToast('Some error occurred while creating product');
            }
        } else {
            
            data.stock.free = Number(data.stockFree);
            const r = await handleUpdate(data as Product);
            
            if (r.status == 200) {
                showToast(r.data.message);
            } else {
                showToast('Some error occurred while updating product');
            }
        }

    }

    const deleteProduct = async () => {
        const r = await handleDelete(productId);
        if (r.status == 200) {
            showToast(r.data.message);
        } else {
            showToast('Some error occurred while deleting product');
        }
    }

    //console.log(watch("example"))

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <IonList>
                <IonItem>
                    <IonInput label="Name" defaultValue="" {...register("name", { required: true })} >

                    </IonInput>
                    {errors.name && <span>Name is required</span>}
                </IonItem>
                <IonItem>
                    <IonInput type="number" label="Price" {...register("price", { required: true })}>

                    </IonInput>
                    {errors.price && <span>Price is required</span>}
                </IonItem>


                <IonItem>
                    <IonInput type="number" label="Stock" {...register("stockFree", { required: true })}>

                    </IonInput>
                    {errors.stockFree && <span>Stock free is required</span>}
                </IonItem>

                <IonItem>
                    <IonTextarea label="Description"  {...register("description", { required: true })} />
                    {errors.description && <span>Description is required</span>}
                </IonItem>

                {photos && photos.length > 0 && photos.map((photo, index) => (
                    <IonItem>
                        <IonCol size="6" key={photo.filepath}>
                            <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath as string} />
                        </IonCol>
                    </IonItem>
                ))}

                {prod && prod.imageDataBase64.map((ph, index) => (
                    <IonItem>
                        <IonCol size="6" key={index}>
                            <IonImg onClick={() => setPhotoToDelete(ph)} src={ph} />
                        </IonCol>
                    </IonItem>
                ))}

                <IonItem>
                    {productId ? <IonButton type="submit">Update</IonButton> :
                        <IonButton type="submit">Accept</IonButton>}
                </IonItem>
                <IonItem>
                    {productId ? <IonButton onClick={() => deleteProduct()}>Delete</IonButton> : ''}
                </IonItem>
            </IonList>

            <IonFab vertical="bottom" horizontal="center" slot="fixed">
                <IonFabButton onClick={() => takePhoto()}>
                    <IonIcon icon={camera}></IonIcon>
                </IonFabButton>
            </IonFab>

        </form>

    );
}

export default ProductComponent;