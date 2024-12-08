import { defineStore } from "pinia";

export const tagsBtnsStore = defineStore("tagsBtnsStore", {
    state: () => ({ tag: 'new', pending : true }),
    actions: {
        SET_TAG(arg: string) {
            this.tag = arg
        },
        SET_PENDING(arg : boolean){
            this.pending = arg
        }
    }
})