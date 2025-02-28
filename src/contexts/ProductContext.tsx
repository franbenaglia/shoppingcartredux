import { createContext, useEffect, useState } from "react";
import { ProductStock } from "../model/ProductStock";
import {
    handleCreate as create, handleDelete as del,
    handleUpdate as update, fetchDataById as fetchById, fetchAllData as fetchAll
} from '../api/ProductApi';
import { Product } from "../model/Product";

export interface ProductContextI {

    handleCreate: (newData: Product) => Promise<any>,
    handleDelete: (id: number) => Promise<any>,
    handleUpdate: (newData: Product) => Promise<any>,
    fetchProductById: (id: number) => Promise<any>,
    getProducts: () => ProductStock[],

}

export const ProductContext = createContext<ProductContextI>(null);

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([] as ProductStock[]);

    const getProducts = () => {
        return products;
    }

    const fetchProducts = async () => {
        const data = await fetchAll();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCreate = async (newData: Product) => {
        const p = await create(newData);
        await fetchProducts();
        return p;
    };
    const handleDelete = async (id: number) => {
        const p = await del(id)
        await fetchProducts();
        return p;
    };
    const handleUpdate = async (newData: Product) => {
        const p = await update(newData);
        await fetchProducts();
        return p;
    };
    const fetchProductById = (id: number) => fetchById(id);

    return (
        <ProductContext.Provider value={{ getProducts, handleCreate, handleDelete, handleUpdate, fetchProductById }}>
            {children}
        </ProductContext.Provider>
    );

}