import { defineStore } from "pinia";

export const subCategory = defineStore("subCategory", {
    state: () => ({
        flag: false,
        categoryName: '', 
        fetchingFlag: false, 
        categoryId: 0, 
        subCategoryEditFlag: false, 
        subCategoryName: '', 
        subCategoryId: 0,
        subCategoryDeleteFlag : false
    }),
    actions: {
        SET_FLAG(arg: boolean) {
            this.flag = arg
        },
        SET_S_CATEGORY_NAME(arg: string) {
            this.categoryName = arg
        },
        SET_S_CATEGORY_ID(arg: number) {
            this.categoryId = arg
        },
        SET_SUB_CATEGORY_EDIT_FLAG(arg: boolean) {
            this.subCategoryEditFlag = arg
        },
        SET_SUB_CATEGORY_EDIT_NAME(arg: string) {
            this.subCategoryName = arg
        },
        SET_SUB_CATEGORY_EDIT_ID(arg: number) {
            this.subCategoryId = arg
        },
        SET_FETCHING_FLAG(arg: boolean) {
            this.fetchingFlag = arg
        },
        SET_SUB_CATEGORY_DELETE_FLAG(arg : boolean){
            this.subCategoryDeleteFlag = arg
        }
    }
})