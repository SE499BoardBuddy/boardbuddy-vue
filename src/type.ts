export interface User {
    id: number,
    public_id: string,
    email: string,
    username: string,
    password: string,
    roles: string,
}

export interface UserCollection {
    public_id: string,
    name: string,
    game_count: number,
    thumbnail: string[],
    have: boolean
}

export interface Collection {
    name: string,
    public_id: string,
    items: CollectionItems[]
    recommendation: {
        _id: string,
        bg_id: number,
        image: string,
        name: string
    }[]
}

export interface CollectionItems {
    bg_id: number,
    image: string,
    name: string,
    public_id: string
}

export interface Boardgame {
    id: number,
    age: number,
    boardgame_artist: string,
    boardgame_category: string,
    boardgame_designer: string,
    boardgame_mechanic: string,
    boardgame_publisher: string,
    boardgame_subdomain: string,
    description: string
    image: string
    max_players: number,
    max_playtime: number,
    min_players: number,
    min_playtime: number,
    name: string,
    playing_time: number,
    thumbnail: string
    videogame_bg: string,
    year_published: number,
    recommendation: BoardgameES[]
}

export interface BoardgameES {
    _source: {
        id: number,
        image: string,
        name: string,
    }
}

export interface ResponseObjectIr {
    categories: string[],
    results: Boardgame[],
    total_hit: number,
    suggest: {
        Name: {
            length: number,
            offset: number,
            options: {
                freq: number,
                score: number,
                text: string
            }[],
            text: string
        }[]
    }
}

export interface ChatHistoryInfo {
    info: ChatHistory,
    chats: ChatMessage[]
}

export interface ChatHistory {
    game: number,
    name: string,
    public_id: string
}

export interface Rulebook {
    id: number,
    name: string,
    image: string,
    link: string
}

export interface ChatMessage {
    date: string,
    is_human: boolean,
    message: string,
    is_new: boolean,
    history_id: string
}