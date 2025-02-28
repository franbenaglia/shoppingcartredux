import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import './Menu.css';
import { getUser } from '../api/UserApi';
import { useEffect, useState } from 'react';
import { AppPages } from '../constants/appPages';
import { User } from '../model/User';


const Menu: React.FC = () => {

  const location = useLocation();

  let [userlogged, setUserlogged] = useState({ email: 'anonimo', role: 'user' });

  const fetchUser = async () => {
    const data = await getUser();
    setUserlogged({
      email: data.email,
      role: data.role
    });
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const MenuList = () => {

    const filteredPages = userlogged && AppPages.filter(p => p.role === userlogged.role || p.role==='both');

    return (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>Options</IonListHeader>
            <IonNote>{userlogged ? userlogged.email : ''}</IonNote>
            <IonNote>{userlogged ? 'role ' + userlogged.role : ''}</IonNote>
            {filteredPages && filteredPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
          </IonList>
        </IonContent>
      </IonMenu>
    );

  }

  return (
    <MenuList />
  );

};

export default Menu;
