import type { Boardgame, UserCollection, Collection } from "@/type";
import type { AxiosResponse } from "axios";
import apiClient from "@/services/AxiosClient";

export default {
    getBoardgame(id: string): Promise<AxiosResponse<Boardgame>> {
        return apiClient.get<Boardgame>('/boardgame/' + id)
    },
    getCollectionsByUserID(public_id: string): Promise<AxiosResponse<UserCollection[]>> {
        return apiClient.post<UserCollection[]>('/get_collections_by_user_id', {
            user_id: public_id
        })
    },
    getCollectionItemsByPublicID(collection_id: string, user_id: string): Promise<AxiosResponse<Collection>> {
        return apiClient.post<Collection>('/get_collection_by_public_id', {
            collection_id: collection_id,
            user_id: user_id
        })
    },
    getCollectionToAdd(user_id: string, bg_id: string): Promise<AxiosResponse> {
        return apiClient.get('/get_collections_to_add?user_id=' + user_id + '&bg_id=' + bg_id)
    },
    createCollections(name: string, user_id: string): Promise<AxiosResponse> {
        return apiClient.post('/create_collection', {
            name: name,
            user_id: user_id
        })
    },
    deleteCollection(public_id: string): Promise<AxiosResponse> {
        return apiClient.post('/delete_collection', {
            public_id: public_id
        })
    },
    addItem(bg_id: number, collection_id: string): Promise<AxiosResponse> {
        return apiClient.post('/add_item', {
            bg_id: bg_id,
            collection_id: collection_id
        })
    },
    deleteItem(public_id: string): Promise<AxiosResponse> {
        return apiClient.post('/delete_item', {
            public_id: public_id
        })
    },
    randomPick(
        collection_id: string,
        min_age: number,
        min_playtime: number,
        max_playtime: number,
        min_players: number,
        max_players: number
    ): Promise<AxiosResponse> {
        return apiClient.post('/random_pick', {
            collection_id: collection_id,
            min_age: min_age,
            min_playtime: min_playtime,
            max_playtime: max_playtime,
            min_players: min_players,
            max_players: max_players
        })
    },
}   