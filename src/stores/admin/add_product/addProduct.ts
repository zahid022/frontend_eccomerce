import { defineStore } from "pinia";

export const addProduct = defineStore("addProduct", {
    state: () => ({ name: "", price: "", discount: "", description: '', stock: "" }),
    actions: {
        setName(txt: string) {
            this.name = txt
        },
        setPrice(txt:string){
            this.price = txt
        },
        setDiscount(txt: string) {
            this.discount = txt
        },
        setStock(txt: string) {
            this.stock = txt
        }
    }
})