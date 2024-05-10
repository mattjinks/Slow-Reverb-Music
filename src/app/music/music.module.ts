import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './song-list/song-list.component';
import { SongComponent } from './song/song.component';
import { SongLibraryComponent } from './song-library/song-library.component';
import { AlbumComponent } from './album/album.component';
import { AlbumTrackComponent } from './album-track/album-track.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumItemComponent } from './album-item/album-item.component';

@NgModule({
  declarations: [
    SongListComponent,
    SongComponent,
    SongLibraryComponent,
    AlbumComponent,
    AlbumTrackComponent,
    AlbumListComponent,
    AlbumItemComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    FormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  exports: [
    SongListComponent,
    SongLibraryComponent
  ]
})
export class MusicModule { }
