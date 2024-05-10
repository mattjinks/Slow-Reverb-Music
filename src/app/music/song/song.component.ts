import { AfterViewInit, Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Song } from '../../models/Song';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AudioprocessorService } from '../../services/audioprocessor/audioprocessor.service';
import { Album } from '../../models/Album';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent implements AfterViewInit{
  @Input() song: Song;
  isPlaying: Boolean = false;
  audio: HTMLMediaElement | undefined;
  sourceNode: MediaElementAudioSourceNode | null = null;
  sourceId: number = 0;
  subscriptionPlaying: any;
  album: Album | null= null;

  constructor(
    private router: Router,
    private audioService: AudioprocessorService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.song = {
      id: 1,
      title: '',
      artist: '',
      album: '',
      genre:'',
      release_year: 2024,
      file_path: '',
      cover: ''
    }
  }

  ngOnInit() {
    // console.log('After Init');

    if (isPlatformBrowser(this.platformId) && typeof AudioContext !== 'undefined') {
      this.audio = new Audio(this.song.file_path);
      this.audio.crossOrigin = "anonymous";
      this.audio.oncanplaythrough = () => this.initializeAudio();
      console.log("Audio: " + this.audio);
    }
    this.subscriptionPlaying = this.audioService.getSongPlaying().subscribe(isPlaying => {
      if (this.audioService.getCurrentAudioId() === this.sourceId) {
        // console.log(`Song Component ${this.song.title} Found in Service OnInit`);
        this.isPlaying = isPlaying;
      } else {
        // console.log(`Song Component ${this.song.title} Not Found in Service OnInit`);
        this.isPlaying = false;
      }
    });


  }

  ngAfterViewInit() {
  }

  async initializeAudio() {
    // console.log("initialize Audio");
    if (!this.sourceNode) {
      this.sourceId = this.audioService.getId();
      this.sourceNode = this.audioService.createSourceNode(this.audio as HTMLMediaElement, this.sourceId);
      this.audioService.connectToAudioContext(this.sourceNode, this.sourceId);
      await this.audioService.loadImpulseResponse("../assets/audio/TransitCenter.wav");
      this.audioService.connectToAudioContext(this.sourceNode, this.sourceId);
    } else {
      console.log('Source node already initialized', this.sourceNode);
    }
  }

  playAudio(): void {
    // this.audio.oncanplaythrough = () => this.initializeAudio();
    if (this.isPlaying) {
      console.log("Pause Audio");
      this.audioService.pauseAudio(this.audio!)
      this.audioService.setSongPlaying(false);
    } else {
      console.log("Play Audio Song Component");
      this.audioService.setCurrentAudioId(this.sourceId);
      this.audioService.playAudio(this.song.file_path, this.audio!);
      this.audioService.setSongPlaying(true);
      this.audioService.setCurrentAudioInfo(this.song);
    }
    //this.togglePlay();
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
  }
}
