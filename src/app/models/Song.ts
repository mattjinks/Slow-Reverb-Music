export class Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  release_year: number;
  file_path: string;
  cover: string;

  constructor() {
    this.id = 1;
    this.title = '';
    this.artist = '';
    this.album = '';
    this.genre = '';
    this.release_year = 2024;
    this.file_path = '';
    this.cover = '';
  }

}
