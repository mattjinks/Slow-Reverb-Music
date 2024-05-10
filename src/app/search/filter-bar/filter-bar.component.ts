import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent {
  filterSongs: Boolean = true;
  filterAlbums: Boolean = false;
  filterArtists: Boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
  }

  showSongList() {
    if (!this.filterSongs) {
      this.filterSongs = !this.filterSongs;
      this.filterAlbums = false;
      this.filterArtists = false;
    }
    this.router.navigate(['/song-list']);

  }

  showAlbumList() {
    if (!this.filterAlbums) {
      this.filterAlbums = !this.filterAlbums;
      this.filterSongs = false;
      this.filterArtists = false;
    }
    this.router.navigate(['/album-list']);
  }

  showArtistList() {
    if (!this.filterArtists) {
      this.filterArtists = !this.filterArtists;
      this.filterSongs = false;
      this.filterAlbums = false;
    }
  }
}

