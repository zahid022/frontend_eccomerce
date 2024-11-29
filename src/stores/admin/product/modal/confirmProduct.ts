import { defineStore } from "pinia";

export const confirmProduct = defineStore("confirmProduct", {
    state: () => ({confirmFlag : false, confirmProductName : '', confirmProductId : 0}),
    actions: {
        SET_CONFIRM_FLAG(arg : boolean) {
            this.confirmFlag = arg
        },
        SET_CONFIRM_PRODUCT_NAME(arg : string){
            this.confirmProductName = arg
        },
        SET_CONFIRM_PRODUCT_ID(id : number){
            this.confirmProductId = id
        }
    }
})