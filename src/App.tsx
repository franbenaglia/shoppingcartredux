import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import StripePage from './pages/StripePage';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import ShoppingCart from './pages/ShoppingCart';
import CheckoutPage from './pages/CheckoutPage';
import ProductPage from './pages/ProductPage';
import ProductListPage from './pages/ProductListPage';
import { useCookies } from 'react-cookie';
import { isLoggedIn, setGoogleJwtToken, getGoogleJwtToken } from './helpers/AuthHelper';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import { ProductProvider } from './contexts/ProductContext';
import SuccessPaymentPage from './pages/SuccessPaymentPage';
import { SaleProvider } from './contexts/SaleContext';
import PurchasedPage from './pages/PurchasedPage';
import RegisterPage from './pages/RegisterPage';
import AppUrlListener from './components/AppUrlListener';

setupIonicReact();

const App: React.FC = () => {

  let [renderMenu, setRenderMenu] = useState<Boolean>(false);

  const [cookies] = useCookies(['googleJwtToken']);

  if (cookies.googleJwtToken) {
    setGoogleJwtToken(cookies.googleJwtToken)
  }

  const logged = async () => {
    console.log('ANTES LOGGGGGGGGGGGGGEDDDDDDDDDDD');
    const islog = await isLoggedIn();
    console.log('DESPUES LOGGGGGGGGGGGGGGGEEEEEEEEEEEED ' + islog);
    setRenderMenu(islog);
  }

  useEffect(() => {
    logged();
  }, []);

  return (
    <IonApp>
      <SaleProvider>
        <ProductProvider>
          <ShoppingCartProvider>
            <IonReactRouter>
              <AppUrlListener></AppUrlListener>
              <IonSplitPane contentId="main">
                {renderMenu ? <Menu /> : <Login />}
                <IonRouterOutlet id="main">
                  <Route path="/" exact={true}>
                    <Redirect to="/" />
                  </Route>
                  <Route path="/ShoppingCart" exact={true}>
                    <ShoppingCart />
                  </Route>
                  <Route path="/Checkout" exact={true}>
                    <CheckoutPage />
                  </Route>
                  <Route path="/Stripe" exact={true}>
                    <StripePage />
                  </Route>
                  <Route path="/SuccessPayment" exact={true}>
                    <SuccessPaymentPage />
                  </Route>
                  <Route path="/Product/:productId" exact={true}>
                    <ProductPage />
                  </Route>
                  <Route path="/Product" exact={true}>
                    <ProductPage />
                  </Route>
                  <Route path="/Purchased" exact={true}>
                    <PurchasedPage />
                  </Route>
                  <Route path="/Register" exact={true}>
                    <RegisterPage />
                  </Route>
                  <Route path="/ProductList" exact={true}>
                    <ProductListPage />
                  </Route>
                  <Route path="/Login" exact={true}>
                    <LoginPage />
                  </Route>
                  <Route path="/Logout" exact={true}>
                    <LogoutPage />
                  </Route>
                  <Route path="/folder/:name" exact={true}>
                    <Page />
                  </Route>
                </IonRouterOutlet>
              </IonSplitPane>
            </IonReactRouter>
          </ShoppingCartProvider>
        </ProductProvider>
      </SaleProvider>
    </IonApp>
  );

};

export default App;
