import { Component } from '@angular/core';
import { Song } from '../../models/Song';
import { MusicService } from '../../services/music/music.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent {

  songs: Song[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.musicService.getSongs().subscribe({
      next: (result: Song[]) => {
        this.songs = result;
        console.log('Fetched songs:', this.songs);
      },
      error: (error: Error) => console.error('Error fetching data:', error)
    });
    // this.songs = this.musicService.getSongsTemp();
    // this.songs = this.musicService.getSongsTemp();
  }

}
