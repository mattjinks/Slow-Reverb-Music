import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Song } from '../../models/Song';

@Injectable({
  providedIn: 'root'
})
export class AudioprocessorService {
  private audioContext: AudioContext | null = null;
  private convolver: ConvolverNode | null = null;
  private sources: any[] = [];
  private currentAudio: HTMLMediaElement | null = null;
  private currentAudioId: number = this.getId();
  private currentSourceInfo = new BehaviorSubject<Song>(new Song());
  private currentAudioInfo = this.currentSourceInfo.asObservable();
  private songPlaying = new BehaviorSubject<Boolean>(false);


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only create the AudioContext if it's supported and we're in a browser environment
    if (isPlatformBrowser(this.platformId) && typeof AudioContext !== 'undefined') {
      console.log('New Audio Context ======================');
      this.audioContext = new AudioContext();
      this.sources = [];
      console.log(this.audioContext);
    } else {
      console.warn('AudioContext is not supported in this environment.');
    }
  }

  async loadImpulseResponse(url: string): Promise<void> {
    try {
        console.log(`load IR`, url);
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
        this.convolver = this.audioContext!.createConvolver();
        this.convolver.buffer = audioBuffer;
    } catch (error) {
        console.error('Failed to load and decode impulse response:', error);
        throw error;
    }
}


  applyReverb(id: number): void {
    console.log(`Apply Reverb Service`);
    // if (this.audioContext && this.audioContext.state !== 'running') {
    //   this.audioContext.resume();
    // }
    const source = this.sources.find(s => s.id === id);
    source.sourceNode.connect(this.convolver!).connect(this.audioContext!.destination);
  }

  removeReverb(id: number): void {
    // console.log(`Remove Reverb`);
    const source = this.sources.find(s => s.id === id);
    source.sourceNode.disconnect();
    source.sourceNode.connect(this.audioContext!.destination);
  }

  connectToAudioContext(sourceNode: MediaElementAudioSourceNode, id: number): void {
    // console.log(`connect sourceNode: `, sourceNode);
    const source = this.sources.find(s => s.id === id);
    console.log(sourceNode === source.sourceNode);
    sourceNode.connect(this.audioContext!.destination);
  }

  createSourceNode(audioElement: HTMLMediaElement, id: number): MediaElementAudioSourceNode {
    // console.log('Create Source Node: ', this.audioContext);

    const existingSource = this.sources.find(s => s.audioElement === audioElement);
    if (existingSource) {
      console.log('Using existing source node');
      return existingSource.sourceNode;
    }
    console.log('Creating new source node');
    const sourceNode = this.audioContext!.createMediaElementSource(audioElement);
    this.sources.push({ id, sourceNode, audioElement });
    return sourceNode;
  }

  getCurrentAudio(): HTMLMediaElement {
    return this.currentAudio!;
  }

  setCurrentAudioInfo(audio: Song) {
    this.currentSourceInfo.next(audio);
  }

  getCurrentAudioInfo(): Observable<Song> {
    return this.currentAudioInfo;
  }

  getSongPlaying(): Observable<Boolean> {
    return this.songPlaying.asObservable();
  }

  setSongPlaying (isPlaying: Boolean) {
    //console.log(`setSongPlaying: Param: ${isPlaying} songPlaying: ${this.songPlaying.value}`);
    this.songPlaying.next(isPlaying);
    console.log(`setSongPlaying: Param: ${isPlaying} songPlaying: ${this.songPlaying.value}`);
  }

  playAudio(filePath: string, audio?: HTMLMediaElement): void {

    console.log('Play Audio Service');
    console.log(this.audioContext);
    if (this.audioContext && this.audioContext.state !== 'running') {
      this.audioContext.resume();
    }

    let isPlaying = false;

    if(this.currentAudio) {
      isPlaying = (this.currentAudio.currentTime > 0) && (!this.currentAudio.paused) && (!this.currentAudio.ended); //&& (this.currentAudio!.readyState > this.currentAudio!.HAVE_CURRENT_DATA);
      console.log('Current Audio currentTime: ', this.currentAudio.currentTime);
      if (isPlaying) { // Check if there's a currently playing audio
        console.log('Play Audio Service: Pause Current Audio');
        this.currentAudio.pause();
        this.songPlaying.next(false); // Update songPlaying observable
      }
    }


    console.log('Play Audio Service: Play');
    // this.currentAudio = audio || this.currentAudio;// Instantiate if needed

    if (audio) {
      this.currentAudio = audio;
      if (this.currentAudio) {

        console.log('Is Playing: ', isPlaying);

        this.currentAudio.load(); // Prepare the audio for playback
        this.currentAudio.play();
        console.log('Play Audio Service: Playing Audio');
        console.log(this.currentAudio);
        this.songPlaying.next(true); // Update songPlaying observable

        console.log('Is Playing: ', isPlaying);
      }
    } else {
      if (this.currentAudio) {

        console.log('Is Playing: ', isPlaying);

        this.currentAudio.play();
        console.log('Play Audio Service: Playing Audio');
        console.log(this.currentAudio);
        this.songPlaying.next(true); // Update songPlaying observable

        console.log('Is Playing: ', isPlaying);
      }
    }
  }

  pauseAudio(audio?: HTMLMediaElement): void {
    console.log('Pause Audio Service');
    console.log(this.audioContext);
    // if (this.audioContext && this.audioContext.state !== 'running') {
    //   this.audioContext.resume();
    // }
    if (audio) {
      this.currentAudio = audio;
    }
    this.currentAudio?.pause();
    console.log('Pause Audio Service: Paused Audio');
  }

  rewindAudio() {
    if (this.currentAudio) {
      this.currentAudio.currentTime = 0;
    }
  }

  getId(): number {
    return this.sources.length;
  }

  updateCurrentAudioInfo() {
    const audioInfo = new BehaviorSubject<any>(this.currentAudioInfo);
  }

  getCurrentAudioId() {
    return this.currentAudioId;
  }

  setCurrentAudioId(id: number) {
    this.currentAudioId = id;
  }

  removeSource(id: number) {
    this.sources = this.sources.filter(source => source.id !== id);
  }

  setPlaybackRate(speed: number, id: number) {
    console.log('Set PlayBack Rate Service');
    console.log(this.audioContext);
    if (this.audioContext && this.audioContext.state !== 'running') {
      this.audioContext.resume();
    }
    const source = this.sources.find(s => s.id === id);
    source.sourceNode.mediaElement.playbackRate = speed;
    console.log(`playback source: `, source.sourceNode.mediaElement.playbackRate);
  }
}

