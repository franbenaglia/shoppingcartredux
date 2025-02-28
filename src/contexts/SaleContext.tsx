import { createContext, useState } from "react";

export const SaleContext = createContext(null);

export const SaleProvider = ({ children }) => {

    const [sale, setSale] = useState('');

    return (
        <SaleContext.Provider value={[sale, setSale]}>
            {children}
        </SaleContext.Provider>
    );

}