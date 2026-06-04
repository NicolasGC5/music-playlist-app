import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../../../core/services/playlist.service';
import { AuthService } from '../../../core/services/auth.service';
import { Playlist } from '../../../shared/models/playlist.model';

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.scss'
})
export class PlaylistListComponent implements OnInit {

  playlists: Playlist[] = [];
  showCreateForm = false;
  newPlaylistName = '';
  newPlaylistDescription = '';
  username = '';

  constructor(
    private playlistService: PlaylistService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.playlists = this.playlistService.getPlaylists();
    this.username = this.authService.getUsername();
  }

  createPlaylist(): void {
    if (this.newPlaylistName.trim()) {
      this.playlistService.createPlaylist(
        this.newPlaylistName,
        this.newPlaylistDescription
      );
      this.playlists = this.playlistService.getPlaylists();
      this.newPlaylistName = '';
      this.newPlaylistDescription = '';
      this.showCreateForm = false;
    }
  }

  deletePlaylist(id: string, event: Event): void {
    event.stopPropagation();
    this.playlistService.deletePlaylist(id);
    this.playlists = this.playlistService.getPlaylists();
  }

  goToPlaylist(id: string): void {
    this.router.navigate(['/playlists', id]);
  }

  logout(): void {
    this.authService.logout();
  }
}
