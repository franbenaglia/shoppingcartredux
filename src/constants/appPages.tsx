interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
    role: string;
}

import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp } from 'ionicons/icons';

export const AppPages: AppPage[] = [
    /*{
        title: 'Inbox',
        url: '/folder/Inbox',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    */
    {
        title: 'Purchased',
        url: '/Purchased',
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneOutline,
        role: 'user'
    },
    {
        title: 'ShoppingCart',
        url: '/ShoppingCart',
        iosIcon: paperPlaneSharp,
        mdIcon: paperPlaneSharp,
        role: 'user'
    },
    {
        title: 'Checkout',
        url: '/Checkout',
        iosIcon: mailOutline,
        mdIcon: mailSharp,
        role: 'user'
    },
    {
        title: 'Product',
        url: '/Product',
        iosIcon: mailOutline,
        mdIcon: mailSharp,
        role: 'admin'
    },
    {
        title: 'ProductList',
        url: '/ProductList',
        iosIcon: mailOutline,
        mdIcon: mailSharp,
        role: 'admin'
    },
    {
        title: 'Logout',
        url: '/Logout',
        iosIcon: mailOutline,
        mdIcon: mailSharp,
        role: 'both'
    },
];