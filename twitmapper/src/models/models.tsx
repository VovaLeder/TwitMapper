export type Author = {
    id: number; 
    login: string
    text: string;
}

export type Comment = {
    id: number;
    author: Author;
    text: string;
}

export type Twit = {
    id: number;
    lat: number;
    lon: number;
    author: Author;
    text: string;
}

export type TwitData = {
    id: number;
    lat: number;
    lon: number;
    text: string;
    author: Author;
    comments: Array<Comment>;
}