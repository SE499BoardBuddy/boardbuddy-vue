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
}   