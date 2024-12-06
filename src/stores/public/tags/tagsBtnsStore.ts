import { defineStore } from "pinia";

export const tagsBtnsStore = defineStore("tagsBtnsStore", {
    state: () => ({ tag: 'new' }),
    actions: {
        SET_TAG(arg: string) {
            this.tag = arg
        }
    }
})