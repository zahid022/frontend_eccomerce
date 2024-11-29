export interface product {
    id? : number;
    description : string;
    price : number;
    category_id : number;
    category_name : string;
    name : string;
    discount : number;
    sub_category_id : number;
    sub_category_name : string;
    img : string[];
    brand_id : number;
    brand_name : string;
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
