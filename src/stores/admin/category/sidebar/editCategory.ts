import { defineStore } from "pinia";

export const editCategory = defineStore("editCategory", {
    state : () => ({editFlag : false, categoryId : 0, categoryName : ''}),
    actions: {
        SET_EDIT_FLAG(arg : boolean) {
            this.editFlag = arg
        },
        SET_EDIT_CATEGORY_ID(arg : number){
            this.categoryId = arg
        },
        SET_EDIT_CATEGORY_NAME(arg : string){
            this.categoryName = arg
        }
    }
})