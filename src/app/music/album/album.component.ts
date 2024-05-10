import { ChangeDetectorRef, Component } from '@angular/core';
import { Song } from '../../models/Song';
import { MusicService } from '../../services/music/music.service';
import { Album } from '../../models/Album';
import { ActivatedRoute } from '@angular/router';
import { AudioprocessorService } from '../../services/audioprocessor/audioprocessor.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent {
  trackList: Song[] = [];
  albums: Album[] =[];
  currAlbum: Album | null= null;
  album: Album | null = null;
  constructor(
    private musicService: MusicService,
    private route: ActivatedRoute,
    private audioService: AudioprocessorService,
    private cd: ChangeDetectorRef
  ) {}


  ngOnInit() {
    this.getAlbumDetails();
  }

  getAlbumDetails(): void {
    const albumId = this.route.snapshot.paramMap.get('id');
    console.log(albumId);

    this.musicService.getAlbumSongs(Number(albumId)).subscribe({
      next: (result: Song[]) => {
        this.trackList = result;
        console.log('Fetched album:', this.album);
        this.cd.detectChanges();  // Trigger change detection manually
      },
      error: (error: Error) => console.error('Error fetching album:', error)
    });

    this.musicService.getAlbum(Number(albumId)).subscribe({
      next: (result: Album[]) => {
        this.album = result[0];
        console.log('Fetched album:', this.album);
        this.cd.detectChanges();  // Trigger change detection manually
      },
      error: (error: Error) => console.error('Error fetching album:', error)
    });
  }
}
