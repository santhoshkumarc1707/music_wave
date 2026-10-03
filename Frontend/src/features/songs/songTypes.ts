export interface Song{_id:string;title:string;artistId?:string;albumId?:string;genreId?:string;coverImage?:string;audioUrl?:string;duration?:number;releaseDate?:string;}
export interface CreateSongRequest{title:string;artistId?:string;albumId?:string;genreId?:string;coverImage?:string;audioUrl?:string;}
