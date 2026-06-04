import { Injectable } from '@angular/core';
import { Playlist } from '../../shared/models/playlist.model';
import { Song } from '../../shared/models/song.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private readonly STORAGE_KEY = 'playlists';

  getPlaylists(): Playlist[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : this.getDefaultPlaylists();
  }

  getPlaylistById(id: string): Playlist | undefined {
    return this.getPlaylists().find(p => p.id === id);
  }

  createPlaylist(name: string, description: string): Playlist {
    const playlists = this.getPlaylists();
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      description,
      cover: 'https://picsum.photos/seed/' + Date.now() + '/300/300',
      songs: [],
      createdAt: new Date()
    };
    playlists.push(newPlaylist);
    this.save(playlists);
    return newPlaylist;
  }

  addSongToPlaylist(playlistId: string, song: Song): void {
    const playlists = this.getPlaylists();
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist && !playlist.songs.find(s => s.id === song.id)) {
      playlist.songs.push(song);
      this.save(playlists);
    }
  }

  removeSongFromPlaylist(playlistId: string, songId: number): void {
    const playlists = this.getPlaylists();
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist) {
      playlist.songs = playlist.songs.filter(s => s.id !== songId);
      this.save(playlists);
    }
  }

  deletePlaylist(id: string): void {
    const playlists = this.getPlaylists().filter(p => p.id !== id);
    this.save(playlists);
  }

  private save(playlists: Playlist[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(playlists));
  }

  private getDefaultPlaylists(): Playlist[] {
    const defaults: Playlist[] = [
      {
        id: '1',
        name: 'Mis favoritas',
        description: 'Las canciones que más me gustan',
        cover: 'https://picsum.photos/seed/playlist1/300/300',
        songs: [],
        createdAt: new Date()
      }
    ];
    this.save(defaults);
    return defaults;
  }
}
