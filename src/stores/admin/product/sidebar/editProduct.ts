import { defineStore } from "pinia";

export const editProduct = defineStore("editProduct", {
    state: () => ({editProductFlag : false}),
    actions: {
        SET_EDIT_PRODUCT_FLAG(arg : boolean) {
            this.editProductFlag = arg
        }
    }
})