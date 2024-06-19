import type { Boardgame, ResponseObjectIr } from "@/type";
import type { AxiosResponse } from "axios";
import apiClient from "@/services/AxiosClient";

export default {
    search(query: string, page: number): Promise<AxiosResponse<ResponseObjectIr>> {
        return apiClient.get<ResponseObjectIr>('/search?query=' + query + '&page=' + page)
    },
}   