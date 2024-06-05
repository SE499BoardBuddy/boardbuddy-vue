import type { Boardgame, ResponseObjectIr } from "@/type";
import type { AxiosResponse } from "axios";
import apiClient from "@/services/AxiosClient";

export default {
    search(query: string): Promise<AxiosResponse<ResponseObjectIr>> {
        return apiClient.get<ResponseObjectIr>('/search?query=' + query)
    },
    // get_recipes(query: number[]): Promise<AxiosResponse<Boardgame[]>> {
    //     return apiClient.post('/get_recipes', query)
    // }
}   