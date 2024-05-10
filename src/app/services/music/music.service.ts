import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Song } from '../../models/Song';
import { response } from 'express';
import songData from '../songs.json'
import albumData from '../albums.json'
import artistData from '../artists.json'
import { Album } from '../../models/Album';

@Injectable({
  providedIn: 'root'
})
export class MusicService {


  private url = 'https://funcapp-slowed-reverb-apim.azure-api.net/funcapp-slowed-reverb';
  // private songsUrl = '../songs.json';
  // private albumUrl = '../albums.json';

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.url}/getAlbums`);
  }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.url}/getSongs`);
  }

  getAlbum(id: number): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.url}/getAlbum?id=${id}`);
  }

  getAlbumSongs(id: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.url}/getAlbumSongs?id=${id}`);
  }

  getSong(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.url}/getSong/${id}`);
  }
}
