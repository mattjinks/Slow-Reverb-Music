import { Component } from '@angular/core';
import { MusicService } from '../../services/music/music.service';
import { Album } from '../../models/Album';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css'
})
export class AlbumListComponent {
  albumList: Album[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.musicService.getAlbums().subscribe({
      next: (result: Album[]) => {
        this.albumList = result;
        console.log('Fetched albums:', this.albumList);
      },
      error: (error: Error) => console.error('Error fetching albums:', error)
    });
  }
}
