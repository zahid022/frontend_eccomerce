import { defineStore } from "pinia";

export const confirmBrand = defineStore("confirmBrand", {
    state: () => ({confirmFlag : false, brandName : '', brandId : 0}),
    actions: {
        SET_CONFIRM_FLAG(arg : boolean) {
            this.confirmFlag = arg
        },
        SET_BRAND_NAME(arg : string){
            this.brandName = arg
        },
        SET_BRAND_ID(arg : number){
            this.brandId = arg
        }
    }
})