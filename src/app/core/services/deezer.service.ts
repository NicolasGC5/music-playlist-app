import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Song } from '../../shared/models/song.model';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {

  private readonly PROXY = 'https://api.allorigins.win/get?url=';
  private readonly API = 'https://api.deezer.com';

  constructor(private http: HttpClient) { }

  searchSongs(query: string): Observable<Song[]> {
    const url = `${this.PROXY}${encodeURIComponent(`${this.API}/search?q=${query}`)}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        const data = JSON.parse(response.contents);
        return data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          artist: item.artist.name,
          album: item.album.title,
          duration: item.duration,
          preview: item.preview,
          cover: item.album.cover_medium
        }));
      })
    );
  }
}