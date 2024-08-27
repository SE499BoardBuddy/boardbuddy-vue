import type { Boardgame, UserCollection, Collection, ResponseObjectIr } from '@/type'
import { defineStore } from 'pinia'
export const useBGStore = defineStore('boardgame', {
    state: () => ({
        current_boardgame: null as Boardgame | null,
        res: null as ResponseObjectIr | null,
        current_search_results: null as Boardgame[] | null,
        current_collections: null as UserCollection[] | null,
        current_collections_to_add: null as UserCollection[] | null,
        current_collection_name: '' as string,
        current_items: null as Collection | null
    }),
    actions: {
        setCurrentResponse(res: ResponseObjectIr) {
            this.res = res
        },
        setCurrentBoardgame(boardgame: Boardgame) {
            this.current_boardgame = boardgame
        },
        setCurrentSearchResults(current_search_results: Boardgame[]) {
            this.current_search_results = current_search_results
        },
        setCurrentCollections(collections: UserCollection[]) {
            this.current_collections = collections
        },
        setCurrentCollectionsToAdd(collections: UserCollection[]) {
            this.current_collections_to_add = collections
        },
        setCurrentItems(current_items: Collection) {
            this.current_items = current_items
        },
        setCurrentCollectionName(current_collection_name: string) {
            this.current_collection_name = current_collection_name
        },
    }
})