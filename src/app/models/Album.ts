export class Album {
  id: number;
  title: string;
  artist: string;
  genre: string;
  release_year: number;
  cover: string;

  constructor() {
    this.id = 1;
    this.title = '';
    this.artist = '';
    this.genre = '';
    this.release_year = 2024;
    this.cover = '';
  }
}
