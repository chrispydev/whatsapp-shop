export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    fallbackImage?: string;
    category?: string;
    in_stock?: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}
