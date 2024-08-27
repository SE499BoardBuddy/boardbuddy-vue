import type { ChatHistory, ChatHistoryInfo, Rulebook } from '@/type'
import { defineStore } from 'pinia'
export const useChatStore = defineStore('chat', {
    state: () => ({
        current_all_history: [] as ChatHistory[] | null,
        current_history: {
            info: {
                game: 0,
                name: '',
                public_id: ''
            },
            chats: []
        } as ChatHistoryInfo,
        rulebooks: [] as Rulebook[] | null
    }),
    actions: {
        setCurrentAllHistory(current_all_history: ChatHistory[]) {
            this.current_all_history = current_all_history
        },
        setCurrentHistory(current_history: ChatHistoryInfo) {
            this.current_history = current_history
        },
        setRulebook(rulebooks: Rulebook[]) {
            this.rulebooks = rulebooks
        },
    }
})