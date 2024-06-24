import type { ResponseObjectIr } from "@/type";
import type { AxiosResponse } from "axios";
import apiClient from "@/services/AxiosClient";

export default {
    search(query: string,
        page: number,
        min_age: number,
        min_players: number,
        max_players: number,
        min_playtime: number,
        max_playtime: number,
        min_year: number,
        max_year: number,
        designer: string,
        publisher: string,
        category: string
    ): Promise<AxiosResponse<ResponseObjectIr>> {
        return apiClient.get<ResponseObjectIr>('/search?query=' + query +
            '&page=' + page +
            '&mnage=' + min_age +
            '&mnpl=' + min_players +
            '&mxpl=' + max_players +
            '&mnpt=' + min_playtime +
            '&mxpt=' + max_playtime +
            '&mnyr=' + min_year +
            '&mxyr=' + max_year +
            '&bgds=' + designer +
            '&bgpb=' + publisher +
            '&bgsd=' + category)
    },
}   