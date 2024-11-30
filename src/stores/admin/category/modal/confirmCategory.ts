import { defineStore } from "pinia";

export const confirmCategory = defineStore("confirmCategory", {
    state: () => ({confirmFlag : false, categoryName : '', categoryId : 0}),
    actions: {
        SET_CONFIRM_FLAG(arg : boolean) {
            this.confirmFlag = arg
        },
        SET_CATEGORY_NAME(arg : string){
            this.categoryName = arg
        },
        SET_CATEGORY_ID(arg : number){
            this.categoryId = arg
        }
    }
})