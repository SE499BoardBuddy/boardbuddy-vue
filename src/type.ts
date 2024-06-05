export interface User {
    id: number,
    email: string,
    username: string,
    password: string,
    roles: string,
}

export interface Boardgame {
    age: number,
    boardgameartist: string,
    boardgamecategory: string,
    boardgamedesigner: string,
    boardgamemechanic: string,
    boardgamepublisher: string,
    boardgamesubdomain: string,
    description: string
    image: string
    maxplayers: number,
    maxplaytime: number,
    minplayers: number,
    minplaytime: number,
    name: string,
    playingtime: number,
    thumbnail: string
    videogamebg: string,
    yearpublished: number
}

export interface ResponseObjectIr {
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