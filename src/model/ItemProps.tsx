import { Product } from "./Product";

export interface ItemProps {
    _id: string;
    visible: boolean;
    product: Product;
    editable: boolean;
    quantity: number;
}