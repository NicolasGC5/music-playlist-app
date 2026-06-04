export interface Playlist {
    id: string;
    name: string;
    description: string;
    cover: string;
    songs: Song[];
    createdAt: Date;
}

import { Song } from './song.model';