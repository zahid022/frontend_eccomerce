import { defineStore } from "pinia";

export const sidebarMenu = defineStore("sidebarMenu", {
    state: () => ({ flag: false }),
    actions: {
        SET_FLAG(arg: boolean) {
            this.flag = arg
        }
    }
})