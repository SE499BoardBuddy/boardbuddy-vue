import type { ChatHistory, ChatMessage, ChatHistoryInfo, Rulebook } from "@/type";
import type { AxiosResponse } from "axios";
import apiClient from "@/services/AxiosClient";

export default {
    getChatHistory(id: string): Promise<AxiosResponse<ChatHistoryInfo>> {
        return apiClient.get<ChatHistoryInfo>('/get_history/' + id)
    },
    getAllChatHistory(id: string): Promise<AxiosResponse<ChatHistory[]>> {
        return apiClient.get<ChatHistory[]>('/get_all_history/' + id)
    },
    sendMessage(game: number, chat_id: string, user_id: string, message: string): Promise<AxiosResponse<ChatMessage>> {
        return apiClient.post<ChatMessage>('/send_message', {
            game: game,
            chat_id: chat_id,
            user_id: user_id,
            message: message
        })
    },
    deleteHistory(public_id: string): Promise<AxiosResponse> {
        return apiClient.post('/delete_history', {
            public_id: public_id
        })
    },
    getRulebooks(): Promise<AxiosResponse<Rulebook[]>> {
        return apiClient.get<Rulebook[]>('/get_rulebooks')
    }
}   