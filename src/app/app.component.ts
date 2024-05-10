import { AfterViewInit, Component, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AudioprocessorService } from './services/audioprocessor/audioprocessor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Correct property name from 'styleUrl' to 'styleUrls'
})
export class AppComponent {
  @ViewChild('audioElement') audioElementRef: ElementRef<HTMLMediaElement> | undefined;
  audio: HTMLMediaElement | undefined;
  sourceNode: MediaElementAudioSourceNode | null = null;
  sourceId: number = 0

  constructor(
    private audioService: AudioprocessorService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

  }

  ngOnInit() {
    // if (isPlatformBrowser(this.platformId) && typeof AudioContext !== 'undefined') {
    //   this.audio = new Audio("https://musicstorage2024.blob.core.windows.net/songs/Drake%20-%20Texts%20Go%20Green.mp3");
    //   this.audio.crossOrigin = "anonymous";
    //   console.log(this.audio);
    //   this.audio.oncanplaythrough = () => this.initializeAudio();
    // }
  }

  async initializeAudio() {
    //this.audio = new Audio("../assets/audio/Drake - Texts Go Green.mp3");
    //this.audioService.loadImpulseResponse('path/to/your/impulse-response.wav');
    this.sourceId = this.audioService.getId();
    this.sourceNode = this.audioService.createSourceNode(this.audio as HTMLMediaElement, this.sourceId);
    this.audioService.connectToAudioContext(this.sourceNode, this.sourceId);
    await this.audioService.loadImpulseResponse("../assets/audio/TransitCenter.wav");

    this.audioService.connectToAudioContext(this.sourceNode, this.sourceId);
  }

  playAudio(): void {
    this.audioService.playAudio('', this.audio!)
  }

  pauseAudio(): void {
    this.audioService.pauseAudio(this.audio!)
  }

  reverbOn(): void {
    // this.audioService.applyReverb(this.sourceNode!);
  }

  reverbOff(): void {
    // this.audioService.removeReverb(this.sourceNode!);
  }


}
