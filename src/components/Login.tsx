import { useForm, SubmitHandler } from "react-hook-form";
import { IonButton, IonInput, IonItem, IonList, IonInputPasswordToggle, IonIcon, IonLabel } from '@ionic/react';
import { User } from '../model/User';
import { googleOauth2Login, githubOauth2Login, setJwtToken } from '../helpers/AuthHelper';
import { login } from "../api/UserApi";
import { Toast } from '@capacitor/toast';
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import Register from "./Register";

const showToast = async (message: string) => {
    await Toast.show({
        text: message,
        position: 'top'
    });
};

const Login: React.FC = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<User>();

    const [render, setRender] = useState(true);

    const history = useHistory();

    const googleOauth2 = () => {
        googleOauth2Login();
    }

    const githubOauth2 = () => {
        githubOauth2Login();
    }

    const registerUser = () => {
        //history.push('/Register');
        setRender(false);
    }

    const onSubmit: SubmitHandler<User> = async (data) => {

        console.log(data);
        const res = await login(data);

        if (res.status === 200) {

            await setJwtToken(res.data.accessToken);
            location.href = "/";

        } else {
            console.log(res.data.message);
            showToast(res.data.message);
        }
    }

    //console.log(watch("example"))

    if (render) {

        return (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <IonList class="ion-justify-content-center">
                        <IonItem>
                            <IonInput label-placement="floating" label="email" defaultValue="tyson@tyson.com" {...register("email", { required: true })} ></IonInput>
                            {errors.email && <span>Login is required</span>}
                        </IonItem>
                        <IonItem>
                            <IonInput label-placement="floating" label="password" defaultValue="1234"  {...register("password", { required: true })}></IonInput>
                            {errors.password && <span>Password is required</span>}
                        </IonItem>
                        <IonItem>
                            <IonButton shape="round" size="default" type="submit">Accept</IonButton>
                        </IonItem>
                        <IonItem>
                            <IonButton type="button" onClick={() => googleOauth2()} shape="round" color="medium"
                                size="default">Google&nbsp;<IonIcon name="logo-google"></IonIcon></IonButton>
                            <IonButton type="button" onClick={() => githubOauth2()} shape="round" color="light"
                                size="default">Github&nbsp;<IonIcon name="logo-github"></IonIcon></IonButton>
                        </IonItem>
                        <IonItem>
                            <IonButton type="button" onClick={() => registerUser()} shape="round" color="warning"
                                size="default">Register</IonButton>
                        </IonItem >
                    </IonList >
                </form >
        );

    } else {
        return (
            <Register />
        );
    }

}



export default Login;