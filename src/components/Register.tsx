import { useForm, SubmitHandler } from "react-hook-form";
import { IonButton, IonInput, IonItem, IonList, IonInputPasswordToggle, IonIcon } from '@ionic/react';
import { User } from '../model/User';
import { registerUser } from "../api/UserApi";
import { Toast } from '@capacitor/toast';

const showToast = async (message: string) => {
    await Toast.show({
        text: message,
        position: 'top'
    });
};

const Register: React.FC = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<User>();

    const onSubmit: SubmitHandler<User> = async (data) => {

        console.log(data);
        const res = await registerUser(data);

        if (res.status === 200) {
            showToast('User registered');
            window.location.reload();

        } else {
            console.log(res.data.message);
            showToast(res.data.message);
        }
    }

    //console.log(watch("example"))

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <IonList>
                <IonItem>
                    <IonInput label="email" defaultValue="" {...register("email", { required: true })} ></IonInput>
                    {errors.email && <span>Login is required</span>}
                </IonItem>
                <IonItem>
                    <IonInput label="password" {...register("password", { required: true })}></IonInput>
                    {errors.password && <span>Password is required</span>}
                </IonItem>
                <IonItem>
                    <IonInput label="firstName" defaultValue="" {...register("firstName", { required: true })} ></IonInput>
                    {errors.firstName && <span>First Name is required</span>}
                </IonItem>
                <IonItem>
                    <IonInput label="lastName" {...register("lastName", { required: true })}></IonInput>
                    {errors.lastName && <span>last Name is required</span>}
                </IonItem>
                <IonItem>
                    <IonButton type="submit">Accept</IonButton>
                </IonItem>
            </IonList >
        </form >
    );
}

export default Register;