import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongListComponent } from './music/song-list/song-list.component';
import { AlbumComponent } from './music/album/album.component';
import { SongLibraryComponent } from './music/song-library/song-library.component';
import { AlbumListComponent } from './music/album-list/album-list.component';

const routes: Routes = [
  { path: 'song-list', component: SongListComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: 'album-list', component: AlbumListComponent },
  { path: '', component: SongListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
