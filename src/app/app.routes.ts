import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'playlists',
        loadComponent: () =>
            import('./features/playlists/playlist-list/playlist-list.component').then(m => m.PlaylistListComponent),
        canActivate: [authGuard]
    },
    {
        path: 'playlists/:id',
        loadComponent: () =>
            import('./features/playlists/playlist-detail/playlist-detail.component').then(m => m.PlaylistDetailComponent),
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: 'playlists',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'playlists'
    }
];