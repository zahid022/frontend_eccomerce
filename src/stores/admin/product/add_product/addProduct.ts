import { defineStore } from "pinia";

export const addProduct = defineStore("addProduct", {
    state: () => ({ name: "", price: "", discount: "0", description: '', stock: "" }),
    actions: {
        SET_NAME(txt: string) {
            this.name = txt
        },
        SET_PRICE(txt:string){
            this.price = txt
        },
        SET_DISCOUNT(txt: string) {
            this.discount = txt
        },
        SET_STOCK(txt: string) {
            this.stock = txt
        }
    }
})