import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Album } from '../../models/Album';
import { AudioprocessorService } from '../../services/audioprocessor/audioprocessor.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrl: './album-item.component.css'
})
export class AlbumItemComponent {
  @Input() album: Album; //property will be initialized by Angular's input mechanism
  sourceId: number = 0

  constructor(
    private audioService: AudioprocessorService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.album = {
      id: 1,
      title: '',
      artist: '',
      genre: '',
      release_year: 2024,
      cover: ''
    }
  }



  audio: HTMLMediaElement | undefined;
  sourceNode: MediaElementAudioSourceNode | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && typeof AudioContext !== 'undefined') {
      this.audio = new Audio("../assets/audio/Drake - Texts Go Green.mp3");
      this.audio.oncanplaythrough = () => this.initializeAudio();
    }
  }

  async initializeAudio() {
    this.sourceId = this.audioService.getId();
    this.sourceNode = this.audioService.createSourceNode(this.audio as HTMLMediaElement, this.sourceId);
    this.audioService.connectToAudioContext(this.sourceNode, this.sourceId);
    await this.audioService.loadImpulseResponse("../assets/audio/TransitCenter.wav");

    this.audioService.connectToAudioContext(this.sourceNode, this.sourceId);
  }


  pauseAudio(): void {
    this.audioService.pauseAudio(this.audio!)
  }

  showAlbumDetails(album: Album): void {
    console.log('Show Album Details');
    this.router.navigate(['/album', album.id]);
  }
}
