import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { setGoogleJwtToken } from '../helpers/AuthHelper';

const AppUrlListener: React.FC<any> = () => {

    let history = useHistory();
    
    useEffect(() => {

        App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
            // Example url: https://beerswift.app/tabs/tab2
            // slug = /tabs/tab2
            console.log('APPPPPPPPPPPURLLLLLLLLOPEN');
            const ext = event.url.split('.app').pop();
            if (ext) {
                console.log('EEEEEEEEEEEEXXXXXXXXXXXXXXXXXXTTTTTTTT' + ext);
                setGoogleJwtToken(ext)
                history.push('/');
            }
            // If no match, do nothing - let regular routing
            // logic take over
        });
    },
        []);

    return null;
};

export default AppUrlListener;