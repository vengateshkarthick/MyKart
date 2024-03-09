export interface IProductData  {
    id: string;
    name: string;
    category: string;
    description: string;
    expiry: string | number;
    cp: number, 
    sp: number, 
    discount_price?: number;
    discount_percenetage: number;
    final_price: number;  
};