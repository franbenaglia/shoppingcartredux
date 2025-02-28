import { ItemsProduct } from "./ItemsProduct";
import { User } from "./User";

export class Sale {
    itemsProduct: ItemsProduct[];
    user: User;
    transactionId: String;
    _id: string;
}