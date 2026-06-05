import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlaylistService } from '../../../core/services/playlist.service';
import { DeezerService } from '../../../core/services/deezer.service';
import { Playlist } from '../../../shared/models/playlist.model';
import { Song } from '../../../shared/models/song.model';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss'
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {

  playlist: Playlist | undefined;
  searchQuery = '';
  searchResults: Song[] = [];
  isSearching = false;
  currentSong: Song | null = null;
  isPlaying = false;
  audio = new Audio();
  showSearch = false;
  currentTime = 0;
  duration = 30;
  progressInterval: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playlistService: PlaylistService,
    private deezerService: DeezerService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.playlist = this.playlistService.getPlaylistById(id);
    }

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
    });
  }

  ngOnDestroy(): void {
    this.audio.pause();
    this.audio.src = '';
    this.stopProgress();
  }

  searchSongs(): void {
    if (!this.searchQuery.trim()) return;
    this.isSearching = true;
    this.searchResults = [];
    this.deezerService.searchSongs(this.searchQuery).subscribe({
      next: (songs) => {
        this.searchResults = songs;
        this.isSearching = false;
      },
      error: () => {
        this.isSearching = false;
      }
    });
  }

  addSong(song: Song): void {
    if (this.playlist) {
      this.playlistService.addSongToPlaylist(this.playlist.id, song);
      this.playlist = this.playlistService.getPlaylistById(this.playlist.id);
    }
  }

  removeSong(songId: number): void {
    if (this.playlist) {
      this.playlistService.removeSongFromPlaylist(this.playlist.id, songId);
      this.playlist = this.playlistService.getPlaylistById(this.playlist.id);
      if (this.currentSong?.id === songId) {
        this.audio.pause();
        this.currentSong = null;
        this.isPlaying = false;
      }
    }
  }

  playSong(song: Song): void {
    if (this.currentSong?.id === song.id) {
      if (this.isPlaying) {
        this.audio.pause();
        this.isPlaying = false;
        this.stopProgress();
      } else {
        this.audio.play();
        this.isPlaying = true;
        this.startProgress();
      }
    } else {
      this.audio.pause();
      this.stopProgress();
      this.currentSong = song;
      this.currentTime = 0;
      this.audio.src = song.preview;
      this.audio.play();
      this.isPlaying = true;
      this.startProgress();
    }
  }

  formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  isSongInPlaylist(songId: number): boolean {
    return !!this.playlist?.songs.find(s => s.id === songId);
  }

  previewSong(song: Song, event: Event): void {
    event.stopPropagation();
    if (this.currentSong?.id === song.id) {
      if (this.isPlaying) {
        this.audio.pause();
        this.isPlaying = false;
        this.stopProgress();
      } else {
        this.audio.play();
        this.isPlaying = true;
        this.startProgress();
      }
    } else {
      this.audio.pause();
      this.stopProgress();
      this.currentSong = song;
      this.currentTime = 0;
      this.audio.src = song.preview;
      this.audio.play();
      this.isPlaying = true;
      this.startProgress();
    }
  }

  isPreviewPlaying(songId: number): boolean {
    return this.currentSong?.id === songId && this.isPlaying;
  }

  goBack(): void {
    this.router.navigate(['/playlists']);
  }

  startProgress(): void {
    this.progressInterval = setInterval(() => {
      if (this.currentTime < this.duration) {
        this.currentTime++;
      } else {
        this.stopProgress();
        this.isPlaying = false;
        this.currentTime = 0;
      }
    }, 1000);
  }

  stopProgress(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
