import { defineStore } from "pinia";

export const editBrand = defineStore("editBrand", {
    state : () => ({editFlag : false, brandId : 0, brandName : ''}),
    actions: {
        SET_EDIT_FLAG(arg : boolean) {
            this.editFlag = arg
        },
        SET_EDIT_BRAND_ID(arg : number){
            this.brandId = arg
        },
        SET_EDIT_BRAND_NAME(arg : string){
            this.brandName = arg
        }
    }
})