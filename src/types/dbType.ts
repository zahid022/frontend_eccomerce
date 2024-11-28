export interface product {
    id? : number;
    description : string;
    price : number;
    category_id : number;
    name : string;
    discount : number;
    sub_category_id : number;
    img : string[];
    brand_id : number;
    stock : number;
    size : string[];
    color : string[];
}

export interface brand {
    id? : number;
    name : string;
    slug : string;
}

export interface category {
    id? : number;
    name : string;
    slug : string;
}
