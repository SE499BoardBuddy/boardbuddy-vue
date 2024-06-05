import type { Boardgame, ResponseObjectIr } from '@/type'
import { defineStore } from 'pinia'
export const userBGStore = defineStore('boardgame', {
    state: () => ({
        currentBoardgame: null as Boardgame | null,
        res: null as ResponseObjectIr | null,
        // currentFolder: null as Folder | null,
        // currentItemInFolder: null as Recipe[] | null
    }),
    actions: {
        setCurrentResponse(res: ResponseObjectIr) {
            this.res = res
        },
        setCurrentBoardgame(boardgame: Boardgame) {
            this.currentBoardgame = boardgame
        },
        // setCurrentFolder(folder: Folder) {
        //     this.currentFolder = folder
        // },
        // setCurrentItemInFolder(recipe: Recipe[]) {
        //     this.currentItemInFolder = recipe
        // },
    }
})